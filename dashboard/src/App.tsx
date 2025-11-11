import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import DashboardRouter from "./components/DashboardRouter";
import { useRef } from "react";

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
