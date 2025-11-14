import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import "./index.css";

// Load UI design system styles via Module Federation
import("ui/styles");

import App from "./App.tsx";
import { TokenProvider } from "./context/TokenContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <TokenProvider>
          <App />
        </TokenProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
