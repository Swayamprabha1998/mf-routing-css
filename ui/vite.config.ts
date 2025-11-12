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
      exposes: { "./Button": "./src/Button.tsx" },
      shared: ["react", "react-dom"],
    }),
  ],
  preview: { port: 5003 },
});
