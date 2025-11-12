import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import DashboardRoutes from "./components/DashboardRoutes";

interface AppProps {
  standalone?: boolean;
}

function App({ standalone = true }: AppProps) {
  console.log("Dashboard App - Standalone mode:", standalone);

  if (standalone) {
    // Standalone mode - wrap in BrowserRouter
    return (
      <Provider store={store}>
        <BrowserRouter>
          <DashboardRoutes />
        </BrowserRouter>
      </Provider>
    );
  }

  // Embedded mode - just return routes (host provides BrowserRouter)
  return (
    <Provider store={store}>
      <DashboardRoutes />
    </Provider>
  );
}

export default App;
