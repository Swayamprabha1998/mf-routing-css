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
      ],
    }),
  ],
  preview: { port: 5002 },
});
