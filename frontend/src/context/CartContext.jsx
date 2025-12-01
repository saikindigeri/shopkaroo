/* eslint-disable no-unused-vars */

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";
const CartContext = createContext();

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
      const res = await api.get("/cart");
      setCart(res.data.items || []);
    } catch (err) {
      toast.error(err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  const addToCart = async (item) => {
    if (user) {
      const added = await api.post("/cart/add", { ...item, qty: 1 });
      console.log("cart item added");

      console.log("added", added);
      loadCart();
    } else {
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
    }
    toast.success("Added item to Cart");
  };

  // UPDATE QTY
  const updateQty = async (productId, size, qty) => {
    if (user) {
      await api.put("/cart/update", { productId, size, qty });
      await loadCart();
    } else {
      const updated = cart
        .map((i) =>
          i.product._id === productId && i.size === size ? { ...i, qty } : i
        )
        .filter((i) => i.qty > 0);

      localStorage.setItem("guestCart", JSON.stringify(updated));
      setCart(updated);
    }
    toast.success("Quantity updated");
  };

  // REMOVE ITEM
  const removeItem = async (productId, size) => {
    if (user) {
      await api.delete("/cart/remove", { data: { productId, size } });
      await loadCart();
    } else {
      const updated = cart.filter(
        (i) => !(i.product._id === productId && i.size === size)
      );
      localStorage.setItem("guestCart", JSON.stringify(updated));
      setCart(updated);
    }
    toast.success("Item removed from Cart");
  };

  const fetchMyOrders = async () => {
    try {
      const res = await api.get("/orders/myorders");
      console.log(res.data.orders);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };
  const mergeGuestCartOnLogin = async () => {
    const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

    if (guestCart.length > 0 && user) {
      try {
        await api.post("/cart/merge", { guestCart });
        localStorage.removeItem("guestCart");
        await loadCart();
      } catch (err) {
        console.error("Failed to merge cart:", err);
      }
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
