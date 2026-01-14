import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import electron from 'vite-plugin-electron/simple'

const __dirname = path.dirname(fileURLToPath(import.meta.url));



// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: 'electron/preload.ts',
      },
      // Ployfill the Electron and Node.js built-in modules for Renderer process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
