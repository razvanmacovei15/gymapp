import { defineConfig } from "vite";
import path from "path"; // Make sure this is imported
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/gymapp/",
  plugins: [react()],
  preview: {
    port: 8020,
    strictPort: true,
  },
  server: {
    port: parseInt(process.env.VITE_PORT) || 8020,
    strictPort: true,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Add .jsx support
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit to 1 MB
    outDir: "dist", // Ensure build files go to dist folder
  },
});
