import { Provider } from "react-redux";
import { store } from "./store";
import CartRoutes from "./components/CartRoutes";
import { BrowserRouter } from "react-router-dom";

interface AppProps {
  standalone?: boolean;
}

function App({ standalone = true }: AppProps) {
  console.log("Cart App - Standalone mode:", standalone);

  if (standalone) {
    // Standalone mode - wrap in BrowserRouter
    return (
      <Provider store={store}>
        <BrowserRouter>
          <CartRoutes />
        </BrowserRouter>
      </Provider>
    );
  }

  // Embedded mode - just return routes (host provides BrowserRouter)
  return (
    <Provider store={store}>
      <CartRoutes />
    </Provider>
  );
}

export default App;
