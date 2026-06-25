declare module "fvtt-types/configuration" {
    interface SettingConfig {
        "scorpious187s-smooth-camera.enableSmoothCamera": boolean;
        "scorpious187s-smooth-camera.cameraPanSpeed": number;
        "scorpious187s-smooth-camera.cameraZoomSpeed": number;
    }

    interface Storage {
        "scorpious187s-smooth-camera.enableSmoothCamera": boolean;
        "scorpious187s-smooth-camera.cameraPanSpeed": number;
        "scorpious187s-smooth-camera.cameraZoomSpeed": number;
    }
    interface WorldSettings {
        "scorpious187s-smooth-camera.enableSmoothCamera": boolean;
        "scorpious187s-smooth-camera.cameraPanSpeed": number;
        "scorpious187s-smooth-camera.cameraZoomSpeed": number;
    }

    // V13/V14: _constrainView returns Omit<CanvasViewPosition, "level">
    interface Canvas {
        _constrainView: (config: {
            x?: number;
            y?: number;
            scale?: number;
        }) => { x: number; y: number; scale: number };
    }

    // Augment ViewPosition so our internal __aerisInternal flag is type-safe
    namespace Canvas {
        interface ViewPosition {
            __aerisInternal?: boolean;
        }
    }
}

// V13/V14: also augment the top-level CanvasViewPosition if fvtt-types exposes it
declare global {
    interface CanvasViewPosition {
        __aerisInternal?: boolean;
    }
}

export {};
