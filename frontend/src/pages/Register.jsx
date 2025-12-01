import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    // Your real backend URL — works everywhere
    const API_BASE = "https://shopkaroo-pdso.onrender.com/api";

    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // sends cookies if needed
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    // Success
    toast.success("Account created! Please log in.");
    navigate("/login");

  } catch (err) {
    console.error("Register error:", err);
    setError(err.message || "Something went wrong. Try again.");
    toast.error(err.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-2">
            Create Account
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Join the community
          </h2>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none
                         focus:border-black focus:ring-1 focus:ring-black transition"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none
                         focus:border-black focus:ring-1 focus:ring-black transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none
                         focus:border-black focus:ring-1 focus:ring-black transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-black text-white py-3 rounded-full text-sm font-semibold
                       tracking-[0.2em] uppercase hover:bg-gray-900 transition-colors
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating…" : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium underline underline-offset-4 hover:text-black"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
