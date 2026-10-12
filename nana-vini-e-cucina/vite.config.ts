import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    cssCodeSplit: false,
    // versione "file unico": caratteri incorporati nel CSS
    ...(process.env.VITE_SINGLE === "1" ? { assetsInlineLimit: 100_000_000, outDir: "dist-single" } : {}),
  },
});
