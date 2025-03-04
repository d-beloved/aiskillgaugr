/// <reference types="vitest" />
import vercel from "vite-plugin-vercel";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";

export default defineConfig({
  plugins: [vike({}), react({}), tailwindcss(), vercel()],
  build: {
    target: "es2022",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  css: {
    // Enable CSS modules
    modules: {
      localsConvention: "camelCase",
    },
    // Enable source maps
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ["tailwindcss", "daisyui"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
