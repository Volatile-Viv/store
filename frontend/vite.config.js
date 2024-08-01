import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://store-backend-m794.onrender.com",
      "/uploads/": "https://store-backend-m794.onrender.com",
    },
  },
});
