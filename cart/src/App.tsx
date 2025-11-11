import { Provider } from "react-redux";
import { store } from "./store";
import CartRouter from "./components/CartRouter";
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { useRef } from "react";

interface AppProps {
  onHistoryChange?: (path: string) => void;
}

function App({ onHistoryChange }: AppProps) {
  // Create our own memory history for embedded mode
  const cartHistory = useRef(createMemoryHistory()).current;

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
