import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import DashboardRouter from "./components/DashboardRouter";
import { useRef, useEffect } from "react";

interface AppProps {
  onHistoryChange?: (path: string) => void;
}

function App({ onHistoryChange }: AppProps) {
  // Create our own memory history for embedded mode
  const dashboardHistory = useRef(createMemoryHistory()).current;

  // Debug logging
  console.log("Dashboard App received props:", {
    hasCallback: !!onHistoryChange,
    callbackType: typeof onHistoryChange,
    propsKeys: Object.keys({ onHistoryChange }),
  });

  // Sync memory history with container's browser history ONLY on mount and external events
  useEffect(() => {
    if (!onHistoryChange) return; // Standalone mode

    const syncMemoryHistory = () => {
      const currentPath = window.location.pathname;
      console.log("🔄 Dashboard sync - Current browser path:", currentPath);

      if (currentPath.startsWith("/dashboard")) {
        const subPath = currentPath.replace("/dashboard", "") || "/";
        const currentMemoryPath = dashboardHistory.location.pathname;

        console.log(
          "🔄 Dashboard sync - Memory path:",
          currentMemoryPath,
          "Target:",
          subPath
        );

        if (currentMemoryPath !== subPath) {
          console.log(
            "🔄 Dashboard sync - Updating memory history to:",
            subPath
          );
          dashboardHistory.replace(subPath);
        }
      }
    };

    // ONLY sync on mount (for direct URL access)
    syncMemoryHistory();

    // ONLY sync on cross-microfrontend navigation events (not popstate)
    const handleRouteChange = () => {
      console.log("🔄 Dashboard sync - Custom route change event triggered");
      syncMemoryHistory();
    };

    window.addEventListener("dashboard-route-change", handleRouteChange);

    return () => {
      window.removeEventListener("dashboard-route-change", handleRouteChange);
    };
  }, [dashboardHistory, onHistoryChange]);

  // Detect if running standalone (no callback prop provided)
  const isStandalone = !onHistoryChange;

  if (isStandalone) {
    // Use BrowserRouter for standalone mode
    return (
      <Provider store={store}>
        <BrowserRouter>
          <DashboardRouter />
        </BrowserRouter>
      </Provider>
    );
  }

  // Use our own memory history for embedded mode
  return (
    <Provider store={store}>
      <DashboardRouter
        history={dashboardHistory}
        onHistoryChange={onHistoryChange}
      />
    </Provider>
  );
}

export default App;
