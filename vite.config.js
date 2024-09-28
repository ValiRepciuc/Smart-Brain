import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy for local Express backend (running on localhost:3000)
      "/api": {
        target: "http://localhost:3000", // Your Express server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // Proxy for Clarifai API
      "/clarifai-api": {
        target: "https://api.clarifai.com", // Clarifai API
        changeOrigin: true,
        secure: false, // You may need this for SSL
        rewrite: (path) => path.replace(/^\/clarifai-api/, ""),
      },
    },
  },
});
