/* eslint-disable no-unused-vars */

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";
const CartContext = createContext();
const API_BASE = "https://shopkaroo-pdso.onrender.com/api";
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const loadCart = async () => {
    if (!user) {
      const guest = JSON.parse(localStorage.getItem("guestCart") || "[]");
      setCart(guest);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/cart`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load cart");

      setCart(data.items || []);
    } catch (err) {
      toast.error("Failed to load cart");
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  // Add to cart
  const addToCart = async (item) => {
    if (!user) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const existing = guestCart.find(
        (i) => i.product === item.product && i.size === item.size
      );

      if (existing) {
        existing.qty += 1;
      } else {
        guestCart.push({ ...item, qty: 1 });
      }

      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      setCart(guestCart);
      toast.success("Added to cart");
      return;
    }

    try {
      await fetch(`${API_BASE}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...item, qty: 1 }),
      });

      await loadCart();
      toast.success("Added to cart");
    } catch (err) {
      toast.error("Failed to add item");
    }
  };
const fetchMyOrders = async () => {
  try {
    const API_BASE = "https://shopkaroo-pdso.onrender.com/api";

    const res = await fetch(`${API_BASE}/orders/myorders`, {
      method: "GET",
      credentials: "include", // Critical — sends your login cookie
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to load orders");
    }

    console.log("My Orders:", data.orders);
    return data.orders; // ← return if you want to use it

  } catch (err) {
    console.error("Error fetching orders:", err);
    toast.error(err.message || "Failed to load orders");
    return []; // ← safe fallback
  }
};
  // Update quantity
  const updateQty = async (productId, size, qty) => {
    if (!user) {
      const updated = cart
        .map((i) =>
          i.product._id === productId && i.size === size ? { ...i, qty } : i
        )
        .filter((i) => i.qty > 0);

      localStorage.setItem("guestCart", JSON.stringify(updated));
      setCart(updated);
      toast.success("Quantity updated");
      return;
    }

    try {
      await fetch(`${API_BASE}/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, size, qty }),
      });

      await loadCart();
      toast.success("Quantity updated");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // Remove item
  const removeItem = async (productId, size) => {
    if (!user) {
      const updated = cart.filter(
        (i) => !(i.product._id === productId && i.size === size)
      );
      localStorage.setItem("guestCart", JSON.stringify(updated));
      setCart(updated);
      toast.success("Item removed");
      return;
    }

    try {
      await fetch(`${API_BASE}/cart/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, size }),
      });

      await loadCart();
      toast.success("Item removed");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  // Merge guest cart after login
  const mergeGuestCartOnLogin = async () => {
    const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    if (guestCart.length === 0 || !user) return;

    try {
      await fetch(`${API_BASE}/cart/merge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ guestCart }),
      });

      localStorage.removeItem("guestCart");
      await loadCart();
      toast.success("Your cart has been restored!");
    } catch (err) {
      console.error("Cart merge failed:", err);
    }
  };

  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeItem,
        totalPrice,
        totalItems,
        loadCart,
        mergeGuestCartOnLogin,
        fetchMyOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
