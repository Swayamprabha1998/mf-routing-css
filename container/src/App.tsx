import React, { Suspense, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { selectIsAuthenticated } from "./store/selectors/authSelectors";
import { logoutUser } from "./store/thunks/authThunks";
import "./App.css";
const Dashboard = React.lazy(() => import("dashboard/App"));
const Cart = React.lazy(() => import("cart/App"));
const UIButton = React.lazy(() => import("ui/Button"));
import AuthComponent from "./components/AuthComponent";
import { useSelector } from "react-redux";
import { selectCartCount } from "cart/store";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const cartCount = useSelector(selectCartCount) as number;
  console.log("Cart count in container:", cartCount);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        padding: "10px",
        borderRight: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h3>Menu</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/cart">Cart ({cartCount})</Link>
          </li>
        </ul>
      </div>
      <div>
        <Suspense fallback={<div>Loading Button...</div>}>
          <UIButton onClick={handleLogout}>Logout</UIButton>
        </Suspense>
      </div>
    </div>
  );
};

const Layout = () => {
  const navigate = useNavigate();

  // Callback to sync remote history changes with container browser history
  const handleHistoryChange = useCallback(
    (path: string, microfrontend: string) => {
      // Update the browser history to reflect the microfrontend's route
      const fullPath = `/${microfrontend}${path}`;
      navigate(fullPath, { replace: false });
    },
    [navigate]
  );

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", overflow: "auto" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route
              path="dashboard/*"
              element={
                <Dashboard
                  onHistoryChange={(path: string) =>
                    handleHistoryChange(path, "dashboard")
                  }
                />
              }
            />
            <Route
              path="cart/*"
              element={
                <Cart
                  onHistoryChange={(path: string) =>
                    handleHistoryChange(path, "cart")
                  }
                />
              }
            />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthComponent />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
