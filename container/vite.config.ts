import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "container",
      remotes: {
        dashboard: "http://localhost:5001/assets/remoteEntry.js",
        cart: "http://localhost:5002/assets/remoteEntry.js",
        ui: "http://localhost:5003/assets/remoteEntry.js",
      },
      exposes: {
        "./context/TokenContext": "./src/context/TokenContext.tsx",
      },
      shared: [
        "react",
        "react-dom",
        "react-redux",
        "@reduxjs/toolkit",
        "react-router-dom",
        "antd",
        "@ant-design/icons",
        "ag-grid-react",
        "ag-grid-community",
        "react-hook-form",
        "react-phone-input-2"
      ],
    }),
  ],
  server: {
    port: 5000,
  },
  preview: {
    port: 5000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // SCSS processing handled by dynamic import of remote styles  
      }
    }
  }
});
