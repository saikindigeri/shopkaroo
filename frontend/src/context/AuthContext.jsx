/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const API_BASE = "https://shopkaroo-pdso.onrender.com/api";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  // Load user on app start


  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/auth/me`, {
        method: "GET",
        credentials: "include", // Critical: sends cookie
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Not authenticated");

      setUser(data.user || data); // adjust based on your backend
      console.log("Logged in user:", data);
    } catch (err) {
      console.log("No user logged in");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      toast.success("Login successful!");
      await loadUser();

      // Merge guest cart if exists
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      if (guestCart.length > 0) {
        await fetch(`${API_BASE}/cart/merge`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ guestCart }),
        });
        localStorage.removeItem("guestCart");
        toast.success("Your cart has been restored!");
      }

      navigate("/");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  // Register
  const register = async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  // Logout
  const logout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
