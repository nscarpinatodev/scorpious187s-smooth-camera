import { MODULE_ID } from "../constants";

export const CAMERA_PAN_SPEED = "cameraPanSpeed";

export function registerCameraPanSpeedSetting() {
    game.settings?.register(MODULE_ID, CAMERA_PAN_SPEED, {
        name: "Camera Pan Speed",
        hint: "Controls how fast the camera catches up during smooth panning. Higher = snappier. Default: 5.",
        scope: "client",
        config: true,
        type: Number,
        default: 5,
        range: { min: 0.1, max: 20, step: 0.1 },
    });
}

export function getCameraPanSpeed(): number {
    return Number(
        game.settings?.storage.get("client")?.[
            `${MODULE_ID}.${CAMERA_PAN_SPEED}`
        ] ?? "5"
    );
}
