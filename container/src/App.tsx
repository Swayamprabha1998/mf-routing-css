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

// Use Routes-as-Child versions for testing
const Dashboard = React.lazy(() => import("dashboard/AppRoutesAsChild"));
const Cart = React.lazy(() => import("cart/AppRoutesAsChild"));
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

  const linkStyle = {
    textDecoration: "none" as const,
    color: "#333",
    display: "block",
    padding: "5px 10px",
    borderRadius: "4px",
  };

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        padding: "15px",
        borderRight: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div>
        <h3 style={{ marginBottom: "20px", color: "#333" }}>
          🧪 Navigation Test
        </h3>

        {/* Dashboard Section */}
        <div style={{ marginBottom: "25px" }}>
          <h4 style={{ marginBottom: "10px", color: "#007bff" }}>
            📊 Dashboard
          </h4>
          <ul style={{ listStyle: "none", padding: 0, marginLeft: "10px" }}>
            <li style={{ marginBottom: "8px" }}>
              <Link to="/dashboard" style={linkStyle}>
                🏠 Overview
              </Link>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <Link to="/dashboard/products" style={linkStyle}>
                📦 Products
              </Link>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <Link to="/dashboard/analytics" style={linkStyle}>
                📈 Analytics
              </Link>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <Link to="/dashboard/settings" style={linkStyle}>
                ⚙️ Settings
              </Link>
            </li>
          </ul>
        </div>

        {/* Cart Section */}
        <div style={{ marginBottom: "25px" }}>
          <h4 style={{ marginBottom: "10px", color: "#28a745" }}>
            🛒 Shopping ({cartCount})
          </h4>
          <ul style={{ listStyle: "none", padding: 0, marginLeft: "10px" }}>
            <li style={{ marginBottom: "8px" }}>
              <Link to="/cart" style={linkStyle}>
                📋 Cart Items
              </Link>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <Link to="/cart/checkout" style={linkStyle}>
                💳 Checkout
              </Link>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <Link to="/cart/wishlist" style={linkStyle}>
                ❤️ Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Test Section */}
        <div
          style={{
            padding: "15px",
            backgroundColor: "#fff3cd",
            borderRadius: "8px",
            border: "1px solid #ffeaa7",
          }}
        >
          <h5 style={{ marginBottom: "10px", color: "#856404" }}>
            ⚡ Quick Tests
          </h5>
          <p
            style={{ fontSize: "12px", color: "#6c757d", marginBottom: "10px" }}
          >
            Test browser history:
          </p>
          <ol
            style={{ fontSize: "12px", color: "#6c757d", paddingLeft: "15px" }}
          >
            <li>Navigate through pages</li>
            <li>Use browser back/forward</li>
            <li>Check URL persistence</li>
          </ol>
        </div>
      </div>

      <div>
        <Suspense fallback={<div>Loading Button...</div>}>
          <UIButton
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            🚪 Logout
          </UIButton>
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
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route
              path="dashboard/*"
              element={<Dashboard standalone={false} />}
            />
            <Route path="cart/*" element={<Cart standalone={false} />} />
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
