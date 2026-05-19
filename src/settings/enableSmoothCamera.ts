import { MODULE_ID } from "../constants";

export const ENABLE_SMOOTH_CAMERA = "enableSmoothCamera";

export function registerEnableSmoothCameraSetting() {
    game.settings?.register(MODULE_ID, ENABLE_SMOOTH_CAMERA, {
        name: "Enable Smooth Camera Movement",
        hint: "If enabled, the camera will smoothly follow token movement instead of snapping.",
        scope: "client",
        config: true,
        default: true,
        type: Boolean,
        requiresReload: true,
    });
}

export function isSmoothCameraEnabled(): boolean {
    return (
        game.settings?.storage.get("client")?.[
            `${MODULE_ID}.${ENABLE_SMOOTH_CAMERA}`
        ] !== "false"
    );
}
