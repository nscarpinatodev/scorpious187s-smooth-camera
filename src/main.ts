import { killCustomWheel, setupCustomMouseWheel } from "./mouseWheel";
import {
    killCustomPan,
    patchCanvasPanToDetectExternal,
    setupCanvasResetOrigin,
    setupCustomDragRightMove,
} from "./rightClick";
import { registerSettings } from "./settings/_registerSettings";
import { isSmoothCameraEnabled } from "./settings/enableSmoothCamera";

Hooks.on("init", () => {
    registerSettings();
});

Hooks.on("canvasInit", (c: Canvas) => {
    if (isSmoothCameraEnabled()) setupCustomDragRightMove(c);
});

Hooks.once("canvasReady", () => {
    if (isSmoothCameraEnabled()) setupCanvasResetOrigin();
});

Hooks.once("ready", () => {
    if (!isSmoothCameraEnabled()) return;

    globalThis.smoothCamera = {
        killCustomPan,
        killCustomWheel,
    };

    setupCustomMouseWheel();
    patchCanvasPanToDetectExternal();
});
