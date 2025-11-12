import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { selectIsAuthenticated } from "./store/selectors/authSelectors";
import { logoutUser } from "./store/thunks/authThunks";
import "./App.css";

// Import the Routes-as-Child versions
const DashboardRoutes = React.lazy(() => import("dashboard/AppRoutesAsChild"));
const CartRoutes = React.lazy(() => import("cart/AppRoutesAsChild"));
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
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", overflow: "auto" }}>
        {/* Demo Navigation Section */}
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            background: "#f8f9fa",
            border: "1px solid #dee2e6",
            borderRadius: "8px",
          }}
        >
          <h3>🚀 Routes-as-Child Navigation Demo</h3>
          <p>Test the new routing system:</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link
              to="/dashboard"
              style={{
                padding: "8px 16px",
                background: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              Dashboard Home
            </Link>
            <Link
              to="/dashboard/analytics"
              style={{
                padding: "8px 16px",
                background: "#6f42c1",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              Dashboard Analytics
            </Link>
            <Link
              to="/cart"
              style={{
                padding: "8px 16px",
                background: "#28a745",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              Cart Home
            </Link>
            <Link
              to="/cart/checkout"
              style={{
                padding: "8px 16px",
                background: "#dc3545",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              Cart Checkout
            </Link>
          </div>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<Navigate to="/dashboard" replace />} />

            {/* Routes-as-Children Pattern */}
            <Route
              path="dashboard/*"
              element={<DashboardRoutes standalone={false} />}
            />
            <Route path="cart/*" element={<CartRoutes standalone={false} />} />
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
