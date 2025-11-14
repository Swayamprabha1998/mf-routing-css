import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./AppRoutesAsChild": "./src/AppRoutesAsChild.tsx",
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
      remotes: {
        ui: "http://localhost:5003/assets/remoteEntry.js",
        container: "http://localhost:5000/assets/remoteEntry.js",
        cart: "http://localhost:5002/assets/remoteEntry.js",
      },
    }),
  ],
  server: {
    port: 5001,
  },
  preview: {
    port: 5001,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // SCSS processing handled by dynamic import of remote styles
      }
    }
  }
});
