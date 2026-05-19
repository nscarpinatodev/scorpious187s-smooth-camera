import { MODULE_ID } from "../constants";

export const CAMERA_ZOOM_SPEED = "cameraZoomSpeed";

export function registerCameraZoomSpeedSetting() {
    game.settings?.register(MODULE_ID, CAMERA_ZOOM_SPEED, {
        name: "Camera Zoom Speed",
        hint: "Controls how quickly the camera zooms in and out. Higher = faster zoom. Default: 4.",
        scope: "client",
        config: true,
        type: Number,
        default: 4,
        range: { min: 0.1, max: 10, step: 0.1 },
    });
}

export function getCameraZoomSpeed(): number {
    return Number(
        game.settings?.storage.get("client")?.[
            `${MODULE_ID}.${CAMERA_ZOOM_SPEED}`
        ] ?? "4"
    );
}
