/// <reference types="vitest" />
import vercel from "vite-plugin-vercel";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";

export default defineConfig({
  plugins: [
    vike({}),
    react({
      babel: {
        plugins: [["babel-plugin-transform-remove-console", { exclude: ["error", "warn"] }]],
      },
    }),
    tailwindcss(),
    vercel({
      prerender: false,
    }),
  ],
  build: {
    target: "es2022",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react")) {
              return "react-vendor";
            }
            if (id.includes("tailwindcss") || id.includes("daisyui")) {
              return "ui-vendor";
            }
            if (id.includes("react-markdown")) {
              return "markdown";
            }
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: "esbuild",
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
    devSourcemap: process.env.NODE_ENV === "development",
  },
  optimizeDeps: {
    include: ["tailwindcss", "daisyui", "react", "react-dom"],
    exclude: ["@huggingface/inference"],
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
