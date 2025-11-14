import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Load UI design system styles via Module Federation
import("ui/styles");

import App from "./AppRoutesAsChild.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
