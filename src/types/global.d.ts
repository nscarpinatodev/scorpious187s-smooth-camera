declare global {
    interface Window {
        __targetScale?: number;
    }

    var aerisSmoothCamera: {
        killCustomPan: () => void;
        killCustomWheel: () => void;
    };

    interface GlobalThis {
        aerisSmoothCamera: typeof aerisSmoothCamera;
    }
}

export {};
