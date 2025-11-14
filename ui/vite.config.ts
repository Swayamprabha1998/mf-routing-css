import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "ui",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button.tsx",
        "./LookInput": "./src/components/LookInput.tsx",
        "./LookSelect": "./src/components/LookSelect.tsx",
        // Expose styles through JavaScript wrapper (Vite compatible)
        "./styles": "./src/styles.js",
      },
      shared: [
        "react",
        "react-dom",
        "antd",
        "@ant-design/icons",
        "ag-grid-react",
        "ag-grid-community",
        "react-hook-form",
        "react-phone-input-2",
      ],
    }),
  ],
  server: {
    port: 5003,
  },
  preview: { port: 5003 },
  css: {
    preprocessorOptions: {
      scss: {
        // Let main.scss handle its own imports
      },
    },
  },
});
