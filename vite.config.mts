import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    publicDir: false,

    build: {
        outDir: "scripts",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/main.ts"),
            },
            output: {
                entryFileNames: "[name].bundle.js",
            },
        },
    },
});
