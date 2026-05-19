import { registerCameraPanSpeedSetting } from "./cameraPanSpeed";
import { registerCameraZoomSpeedSetting } from "./cameraZoomSpeed";
import { registerEnableSmoothCameraSetting } from "./enableSmoothCamera";

export function registerSettings() {
    registerEnableSmoothCameraSetting();
    registerCameraPanSpeedSetting();
    registerCameraZoomSpeedSetting();
}
