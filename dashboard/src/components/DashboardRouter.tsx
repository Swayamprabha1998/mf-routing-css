import { Routes, Route, Link, Router } from "react-router-dom";
import ProductsList from "./ProductsList";
import { useEffect, useState } from "react";
import type { MemoryHistory, Update } from "history";

interface DashboardRouterProps {
  history?: MemoryHistory;
  onHistoryChange?: (path: string) => void;
}

const Overview = () => (
  <div>
    <h2>Dashboard Overview</h2>
    <p>Welcome to your dashboard! Here's a quick overview of your data.</p>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h3>Total Products</h3>
        <p style={{ fontSize: "24px", color: "#007bff" }}>42</p>
      </div>
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h3>Active Orders</h3>
        <p style={{ fontSize: "24px", color: "#28a745" }}>18</p>
      </div>
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h3>Revenue</h3>
        <p style={{ fontSize: "24px", color: "#ffc107" }}>$15,240</p>
      </div>
    </div>
  </div>
);

const Analytics = () => (
  <div>
    <h2>Analytics</h2>
    <p>View detailed analytics and reports here.</p>
    <div style={{ marginTop: "20px" }}>
      <h3>Sales Performance</h3>
      <div
        style={{
          height: "200px",
          background: "#f8f9fa",
          border: "1px solid #dee2e6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Chart placeholder - Analytics data would be displayed here</p>
      </div>
    </div>
  </div>
);

const Settings = () => (
  <div>
    <h2>Settings</h2>
    <p>Configure your dashboard settings and preferences.</p>
    <div style={{ marginTop: "20px" }}>
      <form>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Dashboard Theme:
          </label>
          <select
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <option>Light</option>
            <option>Dark</option>
            <option>Auto</option>
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "flex", alignItems: "center" }}>
            <input type="checkbox" style={{ marginRight: "8px" }} />
            Enable notifications
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Settings
        </button>
      </form>
    </div>
  </div>
);

const DashboardNav = () => (
  <nav
    style={{
      marginBottom: "20px",
      borderBottom: "1px solid #ddd",
      paddingBottom: "15px",
    }}
  >
    <ul
      style={{
        display: "flex",
        listStyle: "none",
        margin: 0,
        padding: 0,
        gap: "20px",
      }}
    >
      <li>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#007bff",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #007bff",
          }}
        >
          Overview
        </Link>
      </li>
      <li>
        <Link
          to="/products"
          style={{
            textDecoration: "none",
            color: "#007bff",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #007bff",
          }}
        >
          Products
        </Link>
      </li>
      <li>
        <Link
          to="/analytics"
          style={{
            textDecoration: "none",
            color: "#007bff",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #007bff",
          }}
        >
          Analytics
        </Link>
      </li>
      <li>
        <Link
          to="/settings"
          style={{
            textDecoration: "none",
            color: "#007bff",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #007bff",
          }}
        >
          Settings
        </Link>
      </li>
    </ul>
  </nav>
);

const DashboardRouter = ({
  history,
  onHistoryChange,
}: DashboardRouterProps) => {
  // Always declare hooks at the top
  const [location, setLocation] = useState(
    history?.location || { pathname: "/" }
  );

  useEffect(() => {
    if (!history) return; // No history listener for standalone mode

    // Listen to history changes and update location state
    const unlisten = history.listen((update: Update) => {
      setLocation(update.location);
      // Call the callback to sync with container history
      if (onHistoryChange) {
        onHistoryChange(update.location.pathname);
      }
    });

    return unlisten; // Clean up the listener on unmount
  }, [history, onHistoryChange]);

  // Render content
  const dashboardContent = (
    <div>
      <h1>Dashboard</h1>
      <DashboardNav />

      <Routes>
        {/* <Route index element={<Overview />} /> */}
        <Route path="/" element={<Overview />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );

  // If no history prop, we're in standalone mode (BrowserRouter handles routing)
  if (!history) {
    return dashboardContent;
  }

  // Embedded mode with memory history and Router wrapper
  return (
    <Router location={location} navigator={history!}>
      {dashboardContent}
    </Router>
  );
};

export default DashboardRouter;
