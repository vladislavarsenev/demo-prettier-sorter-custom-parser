import { defineConfig } from "vite";
import { resolve } from "path";
import vitePluginExternal from "vite-plugin-external";
import pkg from "./package.json";

export default defineConfig({
  plugins: [
    vitePluginExternal({
      nodeBuiltins: true,
      externalizeDeps: Object.keys(pkg.peerDependencies),
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "prettier-plugin",
    },
    rollupOptions: {
      output: {
        globals: {
          "prettier/plugins/typescript": "prettier/plugins/typescript",
        },
      },
    },
  },
});
