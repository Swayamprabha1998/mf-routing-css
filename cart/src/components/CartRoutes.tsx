import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../store";

const CartItems = () => {
  const cartCount = useSelector(selectCartCount);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>You have {cartCount} items in your cart.</p>

      {/* Cross-Navigation Test Buttons */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#d4edda",
          borderRadius: "8px",
        }}
      >
        <h4>🧪 Cross-Navigation Test from Cart</h4>
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
            📊 Dashboard
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
            📦 Add Products
          </Link>
          <Link
            to="/dashboard/analytics"
            style={{
              padding: "8px 16px",
              backgroundColor: "#ffc107",
              color: "black",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            📈 View Analytics
          </Link>
          <Link
            to="/cart/checkout"
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            💳 Checkout
          </Link>
        </div>
      </div>

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
                to="checkout"
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
            <Link
              to="/dashboard/products"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
                marginTop: "15px",
              }}
            >
              🛍️ Browse Products
            </Link>
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

    {/* Cross-Navigation Test Buttons */}
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        backgroundColor: "#f8d7da",
        borderRadius: "8px",
      }}
    >
      <h4>🧪 Navigation Test from Checkout</h4>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Link
          to="/cart"
          style={{
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          🛒 Back to Cart
        </Link>
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
          📊 Dashboard
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
          📦 More Products
        </Link>
      </div>
    </div>

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
            to=""
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

// Pure Routes component - no Router wrapper
const CartRoutes = () => {
  return (
    <div>
      <h1>Shopping</h1>

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
              Cart Items
            </Link>
          </li>
          <li>
            <Link
              to="checkout"
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
              to="wishlist"
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

      {/* Routes */}
      <Routes>
        <Route index element={<CartItems />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
};

export default CartRoutes;
