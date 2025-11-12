import { Provider } from "react-redux";
import { store } from "./store";
import CartRouter from "./components/CartRouter";
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { useRef, useEffect } from "react";

interface AppProps {
  onHistoryChange?: (path: string) => void;
}

function App({ onHistoryChange }: AppProps) {
  // Create our own memory history for embedded mode
  const cartHistory = useRef(createMemoryHistory()).current;

  // Sync memory history with container's browser history ONLY on mount and external events
  useEffect(() => {
    if (!onHistoryChange) return; // Standalone mode

    const syncMemoryHistory = () => {
      const currentPath = window.location.pathname;
      console.log("🔄 Cart sync - Current browser path:", currentPath);

      if (currentPath.startsWith("/cart")) {
        const subPath = currentPath.replace("/cart", "") || "/";
        const currentMemoryPath = cartHistory.location.pathname;

        console.log(
          "🔄 Cart sync - Memory path:",
          currentMemoryPath,
          "Target:",
          subPath
        );

        if (currentMemoryPath !== subPath) {
          console.log("🔄 Cart sync - Updating memory history to:", subPath);
          cartHistory.replace(subPath);
        }
      }
    };

    // ONLY sync on mount (for direct URL access)
    syncMemoryHistory();

    // ONLY sync on cross-microfrontend navigation events
    const handleRouteChange = () => {
      console.log("🔄 Cart sync - Custom route change event triggered");
      syncMemoryHistory();
    };

    window.addEventListener("cart-route-change", handleRouteChange);

    return () => {
      window.removeEventListener("cart-route-change", handleRouteChange);
    };
  }, [cartHistory, onHistoryChange]);

  return (
    <Provider store={store}>
      {onHistoryChange ? (
        <CartRouter history={cartHistory} onHistoryChange={onHistoryChange} />
      ) : (
        <BrowserRouter>
          <CartRouter />
        </BrowserRouter>
      )}
    </Provider>
  );
}

export default App;
