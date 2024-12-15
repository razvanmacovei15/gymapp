import { defineConfig } from "vite";
import path from "path"; // Make sure this is imported
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 8020,
    strictPort: true,
  },
  server: {
    port: 8020,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8020",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Add .jsx support
  },
});
