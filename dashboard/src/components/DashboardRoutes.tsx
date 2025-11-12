import { Routes, Route, Link } from "react-router-dom";
import ProductsList from "./ProductsList";

const Overview = () => (
  <div>
    <h2>Dashboard Overview</h2>
    <p>Welcome to your dashboard! Here's a quick overview of your data.</p>

    {/* Cross-Navigation Test Buttons */}
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
      }}
    >
      <h4>🧪 Cross-Navigation Test</h4>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Link
          to="/cart"
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          🛒 Go to Cart
        </Link>
        <Link
          to="/cart/items"
          style={{
            padding: "8px 16px",
            backgroundColor: "#17a2b8",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          📋 Cart Items
        </Link>
        <Link
          to="/dashboard/products"
          style={{
            padding: "8px 16px",
            backgroundColor: "#6f42c1",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          📦 View Products
        </Link>
      </div>
    </div>

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

    {/* Cross-Navigation Test Buttons */}
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        backgroundColor: "#fff3cd",
        borderRadius: "8px",
      }}
    >
      <h4>🧪 Navigation Test from Analytics</h4>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Link
          to="/dashboard"
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          🏠 Dashboard Home
        </Link>
        <Link
          to="/cart"
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          🛒 Go to Cart
        </Link>
        <Link
          to="/dashboard/settings"
          style={{
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          ⚙️ Settings
        </Link>
      </div>
    </div>

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

// Pure Routes component - no Router wrapper
const DashboardRoutes = () => {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Navigation */}
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
              to=""
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
              to="products"
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
              to="analytics"
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
              to="settings"
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

      {/* Routes */}
      <Routes>
        <Route index element={<Overview />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default DashboardRoutes;
