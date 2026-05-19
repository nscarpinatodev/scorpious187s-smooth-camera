import { killCustomWheel } from "./mouseWheel";
import { getCameraPanSpeed } from "./settings/cameraPanSpeed";

let _tickerCallback: ((deltaFrame: number) => void) | null = null;
let _targetPos: { x: number; y: number } | null = null;
let _lastMousePos: { x: number; y: number } | undefined = undefined;

export function killCustomPan() {
    if (_tickerCallback) {
        canvas!.app?.ticker.remove(_tickerCallback);
        _tickerCallback = null;
        _lastMousePos = undefined;
        _targetPos = null;
    }
}

export function patchCanvasPanToDetectExternal() {
    const originalPan = canvas!.pan;

    canvas!.pan = function (options: Canvas.ViewPosition) {
        const isInternal = options?.__aerisInternal;

        if (!isInternal) {
            killCustomPan();
        }

        if (options && "__aerisInternal" in options) {
            delete options.__aerisInternal;
        }

        return originalPan.call(this, options);
    };
}

export function setupCustomDragRightMove(c: Canvas) {
    //@ts-expect-error override
    c._onDragRightMove = _onDragRightMove;
}

export function setupCanvasResetOrigin() {
    window.addEventListener("pointerup", () => {
        _lastMousePos = undefined;
    });
}

export function _onDragRightMove(
    this: Canvas,
    // V13/V14: event type broadened to FederatedEvent<UIEvent | PixiTouch>;
    // cast to FederatedPointerEvent to access pointer-specific properties at runtime
    event: PIXI.FederatedEvent<UIEvent | PIXI.PixiTouch>
) {
    if (!canvas!.app || !canvas!.stage) return;

    const pointerEvent = event as unknown as PIXI.FederatedPointerEvent;
    const globalX = pointerEvent.globalX;
    const globalY = pointerEvent.globalY;
    const movementX = pointerEvent.movementX;
    const movementY = pointerEvent.movementY;

    _lastMousePos ??= {
        x: globalX - movementX,
        y: globalY - movementY,
    };

    const mousePosWorld = { x: globalX, y: globalY };

    if (!_lastMousePos) return;

    if (
        mousePosWorld.x === _lastMousePos.x &&
        mousePosWorld.y === _lastMousePos.y
    )
        return;

    killCustomWheel();

    // PIXI v8: ObservablePoint no longer exposes ._x / ._y; use .x / .y
    if (_targetPos) {
        _targetPos.x -=
            (mousePosWorld.x - _lastMousePos.x) / canvas!.stage.scale.x;
        _targetPos.y -=
            (mousePosWorld.y - _lastMousePos.y) / canvas!.stage.scale.y;
    } else {
        _targetPos = {
            x:
                canvas!.stage.pivot.x -
                (mousePosWorld.x - _lastMousePos.x) / canvas!.stage.scale.x,
            y:
                canvas!.stage.pivot.y -
                (mousePosWorld.y - _lastMousePos.y) / canvas!.stage.scale.y,
        };
    }

    _lastMousePos = mousePosWorld;

    if (_tickerCallback) return;

    _tickerCallback = () => {
        const delta = (canvas!.app!.ticker.deltaMS || 16.666) / 1000;

        if (!_targetPos || !canvas!.stage) return;

        const curX = canvas!.stage.pivot.x;
        const curY = canvas!.stage.pivot.y;

        const distX = _targetPos.x - curX;
        const distY = _targetPos.y - curY;

        const factor = 1 - Math.exp(-getCameraPanSpeed() * delta);
        const newX = curX + distX * factor;
        const newY = curY + distY * factor;

        canvas!.pan({ x: newX, y: newY, __aerisInternal: true });

        if (Math.abs(distX) < 1 && Math.abs(distY) < 1) {
            killCustomPan();
        }
    };

    canvas!.app.ticker.add(_tickerCallback);
}
