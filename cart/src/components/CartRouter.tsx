import { Routes, Route, Link, Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../store";
import { useEffect, useState } from "react";
import type { MemoryHistory, Update } from "history";
import { navigateToMicrofrontend } from "../utils/navigation";

interface CartRouterProps {
  history?: MemoryHistory;
  onHistoryChange?: (path: string) => void;
}

const CartItems = () => {
  const cartCount = useSelector(selectCartCount);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>You have {cartCount} items in your cart.</p>
      <div style={{ marginTop: "20px" }}>
        {cartCount > 0 ? (
          <div>
            <h3>Cart Items:</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {Array.from({ length: cartCount }, (_, i) => (
                <li
                  key={i}
                  style={{
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h4>Product {i + 1}</h4>
                    <p style={{ color: "#666", margin: "5px 0" }}>
                      Price: ${((i + 1) * 25).toFixed(2)}
                    </p>
                  </div>
                  <button
                    style={{
                      padding: "8px 16px",
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <h3>Total: ${(cartCount * 25 * 1.5).toFixed(2)}</h3>
              <Link
                to="/checkout"
                style={{
                  display: "inline-block",
                  padding: "12px 24px",
                  background: "#28a745",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  marginTop: "10px",
                }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <h3>Your cart is empty</h3>
            <p>Add some products to your cart to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Checkout = () => (
  <div>
    <h2>Checkout</h2>
    <p>Complete your purchase here.</p>
    <div style={{ marginTop: "20px" }}>
      <form>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Full Name:
          </label>
          <input
            type="text"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            placeholder="Enter your full name"
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            placeholder="Enter your email"
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Address:
          </label>
          <textarea
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              height: "80px",
            }}
            placeholder="Enter your shipping address"
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Link
            to="/"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              background: "#6c757d",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              marginRight: "10px",
            }}
          >
            Back to Cart
          </Link>
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
            Place Order
          </button>
        </div>
      </form>
    </div>
  </div>
);

const Wishlist = () => (
  <div>
    <h2>Wishlist</h2>
    <p>Items you've saved for later.</p>
    <div style={{ marginTop: "20px" }}>
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h3>Your wishlist is empty</h3>
        <p>Save items you like to view them here later.</p>
      </div>
    </div>
  </div>
);

const CartNav = () => (
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
          Cart Items
        </Link>
      </li>
      <li>
        <Link
          to="/checkout"
          style={{
            textDecoration: "none",
            color: "#007bff",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #007bff",
          }}
        >
          Checkout
        </Link>
      </li>
      <li>
        <Link
          to="/wishlist"
          style={{
            textDecoration: "none",
            color: "#007bff",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #007bff",
          }}
        >
          Wishlist
        </Link>
      </li>
    </ul>
  </nav>
);

const CartRouter = ({ history, onHistoryChange }: CartRouterProps) => {
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

  // Component for demonstrating cross-microfrontend navigation
  const CrossNavDemo = () => (
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        background: "#f8f9fa",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
      }}
    >
      <h3>Cross-Microfrontend Navigation Demo</h3>
      <p>Click the button below to navigate from Cart to Dashboard:</p>
      <button
        onClick={() =>
          navigateToMicrofrontend(
            "/dashboard/analytics",
            "cross",
            onHistoryChange,
            history
          )
        }
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Go to Dashboard Analytics (Cross-MF Navigation)
      </button>
    </div>
  );

  // Render content
  const cartContent = (
    <div>
      <h1>Shopping</h1>

      {/* Only show cross-nav demo when embedded */}
      {history && onHistoryChange && <CrossNavDemo />}

      <CartNav />
      <Routes>
        <Route path="/" element={<CartItems />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );

  // If no history prop, we're in standalone mode (BrowserRouter handles routing)
  if (!history) {
    return cartContent;
  }

  // Embedded mode with memory history and Router wrapper
  return (
    <Router location={location} navigator={history!}>
      {cartContent}
    </Router>
  );
};

export default CartRouter;
