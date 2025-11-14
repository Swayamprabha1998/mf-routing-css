import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "cart",
      filename: "remoteEntry.js",
      exposes: {
        "./AppRoutesAsChild": "./src/AppRoutesAsChild.tsx",
        "./store": "./src/store/index.ts",
        "./cartSlice": "./src/store/slices/cartSlice.ts",
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
      // Configure remotes like webpack Module Federation
      remotes: {
        ui: "http://localhost:5003/assets/remoteEntry.js"
      },
    }),
  ],
  server: {
    port: 5002,
  },
  preview: { port: 5002 },
  css: {
    preprocessorOptions: {
      scss: {
        // SCSS processing handled by dynamic import of remote styles
      }
    }
  }
});
