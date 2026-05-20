import "http://localhost:30001/modules/smooth-camera/@vite/client";

window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;
window.global = window;

import("http://localhost:30001/modules/smooth-camera/src/main.ts");
