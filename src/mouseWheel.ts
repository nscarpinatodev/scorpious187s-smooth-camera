import { killCustomPan } from "./rightClick";
import { getCameraZoomSpeed } from "./settings/cameraZoomSpeed";
import { getMouseWorldPosition } from "./utils/canvas";

let _tickerCallback: ((deltaFrame: number) => void) | null = null;

export function killCustomWheel() {
	if (_tickerCallback) {
		canvas!.app?.ticker.remove(_tickerCallback);
		_tickerCallback = null;
		window.__targetScale = undefined;
	}
}

export function setupCustomMouseWheel() {
	//@ts-expect-error not protected >:)
	canvas._onMouseWheel = _onMouseWheel;
}

export function _onMouseWheel(event: WheelEvent) {
	if (!canvas!.app) return;

	const mouseWorld = getMouseWorldPosition({
		x: event.clientX,
		y: event.clientY,
	});

	if (!mouseWorld) return;

	// event.deltaY is the standard WheelEvent property (negative = scroll up = zoom in)
	// Foundry may also set event.delta as a normalized alias; deltaY is the safe fallback
	const rawDelta = (event as WheelEvent & { delta?: number }).delta ?? event.deltaY;
	let dz = rawDelta < 0 ? 1.05 : 0.95;

	const targetScale = (window.__targetScale =
		(window.__targetScale ?? canvas!.stage?.scale.x ?? 1) * dz);

	killCustomWheel();
	killCustomPan();

	window.__targetScale = canvas!._constrainView({ scale: targetScale }).scale;

	_tickerCallback = () => {
		// deltaMS is the time since the last tick in milliseconds
		const delta = (canvas!.app!.ticker.deltaMS || 16.666) / 1000;

		if (!canvas!.stage) return;

		const curScale = canvas!.stage.scale.x;

		const ds = (window.__targetScale ?? canvas!.stage.scale.x) - curScale;

		const factor = 1 - Math.exp(-getCameraZoomSpeed() * delta);

		const newScale = curScale + ds * factor;

		const dx =
			(mouseWorld.x - canvas!.stage.pivot.x) * (1 - curScale / newScale);
		const dy =
			(mouseWorld.y - canvas!.stage.pivot.y) * (1 - curScale / newScale);

		canvas!.pan({
			x: canvas!.stage.pivot.x + dx,
			y: canvas!.stage.pivot.y + dy,
			scale: newScale,
		});

		if (Math.abs(ds) < canvas!.stage.scale.x * 0.01) {
			killCustomWheel();
		}
	};

	// Register and start ticking
	canvas!.app.ticker.add(_tickerCallback);
}
