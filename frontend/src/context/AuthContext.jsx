import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me");

      setUser(res.data);
      console.log("Logged in user:", res.data);
    } catch (err) {
      console.error("Failed to load user:", err);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    console.log("login successs",res)
    toast.success("Login Success");
    await loadUser();

    const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    if (guestCart.length > 0) {
      const mergeRes = await api.post("/cart/merge", { guestCart });
      console.log("merge", mergeRes);
      console.log("guest cart items", guestCart);
      localStorage.removeItem("guestCart");
    }

    await loadUser();
  };

  const register = async (name, email, password) => {
    await api.post("/auth/register", { name, email, password });
    toast.success("Registered Successfully");
    await loadUser();
  };

  const logout = async () => {
    await api.get("/auth/logout");
    toast.success("Logout Success");
    setUser(null);
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