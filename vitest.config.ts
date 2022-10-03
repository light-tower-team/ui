/// <reference types="vitest" />

import { defineConfig, loadEnv } from "vite";
import path from "path";
import Vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [Vue()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./vitest-setup.ts"],
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      __DEV__: env.NODE_ENV === "development",
      __VUE__: env.LIB === "vue",
      __REACT__: env.REACT === "react",
    },
  };
});
