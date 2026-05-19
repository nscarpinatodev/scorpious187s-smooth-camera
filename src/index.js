import "http://localhost:30001/modules/aeris-smooth-camera/@vite/client";

window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;
window.global = window;

import("http://localhost:30001/modules/aeris-smooth-camera/src/main.ts");
