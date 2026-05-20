declare global {
    interface Window {
        __targetScale?: number;
    }

    var smoothCamera: {
        killCustomPan: () => void;
        killCustomWheel: () => void;
    };

    interface GlobalThis {
        smoothCamera: typeof smoothCamera;
    }
}

export {};
