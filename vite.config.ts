import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "./src/index.ts",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      include: ["src/**/*"],
      exclude: ["**/*.stories.*", "**/__tests__/**"],
      provider: "istanbul",
    },
  },
});
