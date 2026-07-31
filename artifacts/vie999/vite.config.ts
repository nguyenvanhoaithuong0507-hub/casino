import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Use sensible defaults for PORT and BASE_PATH
const port = Number(process.env.PORT || 5173);
const basePath = process.env.BASE_PATH || "/";

const plugins = [
  react(),
  tailwindcss(),
  runtimeErrorOverlay(),
];

// Only add Replit plugins if explicitly in Replit environment
if (process.env.REPL_ID) {
  try {
    // Dynamic import for Replit cartographer plugin
    const cartographerPlugin = require("@replit/vite-plugin-cartographer");
    plugins.push(
      cartographerPlugin.cartographer({
        root: path.resolve(import.meta.dirname, ".."),
      })
    );
  } catch (e) {
    // Plugin not available, continue without it
  }

  try {
    // Dynamic import for Replit dev banner plugin
    const devBannerPlugin = require("@replit/vite-plugin-dev-banner");
    plugins.push(devBannerPlugin.devBanner());
  } catch (e) {
    // Plugin not available, continue without it
  }
}

export default defineConfig({
  base: basePath,
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: false,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
