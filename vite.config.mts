import { resolve } from "path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ mode }) => {
    const isDev = mode === "development";

    return {
        plugins: [
            viteStaticCopy({
                targets: [
                    {
                        src: "module.json",
                        dest: "",
                    },
                ],
            }),
        ],
        base: isDev ? `/modules/aeris-smooth-camera/` : "./",

        server: isDev
            ? {
                  port: 30001,
                  proxy: {
                      [`^/(?!modules/aeris-smooth-camera)`]:
                          "http://localhost:30000",
                      "/socket.io": {
                          target: "ws://localhost:30000",
                          ws: true,
                      },
                  },
              }
            : undefined,

        publicDir: false,

        build: {
            outDir: "dist",
            rollupOptions: {
                input: {
                    main: resolve(__dirname, "src/main.ts"),
                },
                output: {
                    entryFileNames: "[name].bundle.js",
                    chunkFileNames: "assets/[name].js",
                    assetFileNames: "assets/[name].[ext]",
                },
            },
        },
    };
});
