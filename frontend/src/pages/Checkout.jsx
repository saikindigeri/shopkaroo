/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cart, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (!user) {
      toast.error("Please login first");

      navigate("/login");
      return;
    }

    if (!cart.length) return;

    try {
      setLoading(true);
      const res = await api.post("/orders", {
        items: cart,
        totalPrice,
      });
      navigate(`/order/${res.data._id}`);
    } catch (err) {
      alert("Order failed!");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-gray-100 px-4">
        <div className="max-w-md text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-6">
            Add items to your cart before proceeding to checkout.
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 border border-black text-black text-xs sm:text-sm font-medium tracking-[0.25em] uppercase
                       hover:bg-black hover:text-white transition-all duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-2">
            Secure Checkout
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Review & Confirm
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            You&apos;re almost there. Confirm your order details below.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr,1.2fr]">
          {/* Items List */}
          <div className="space-y-4 sm:space-y-5">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 sm:p-6">
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>

              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div
                    key={`${item.product._id}-${item.size}`}
                    className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm sm:text-base font-medium text-gray-900">
                        {item.name}{" "}
                        <span className="text-gray-500 text-xs sm:text-sm">
                          ({item.size})
                        </span>
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Qty: {item.qty}
                      </p>
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary / Actions */}
          <aside className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 sm:p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Items ({cart.length})</span>
                <span className="font-medium">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Tax</span>
                <span className="text-gray-500">Calculated at order</span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-xl font-semibold">₹{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={loading || !cart.length}
              className="mt-6 w-full bg-black text-white py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold
                         tracking-[0.2em] uppercase hover:bg-gray-900 transition-colors
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Placing Order…" : "Place Order & Send Email"}
            </button>

            <p className="mt-3 text-[11px] sm:text-xs text-gray-500 leading-relaxed">
              By placing this order, you agree to our Terms &amp; Conditions and
              Privacy Policy. A confirmation email will be sent to your
              registered email address.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}