/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
// At the very top of your file (after imports)
const API_BASE = "https://shopkaroo-pdso.onrender.com/api";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("orderss", orders);


  useEffect(() => {
  const fetchOrders = async () => {
    try {
      setLoading(true);

      // Manual backend URL — works everywhere
      

      const res = await fetch(`${API_BASE}/orders/myorders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // THIS IS CRITICAL — sends your login cookie
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load orders");
      }

      setOrders(data.orders || []);
      toast.success("Orders loaded successfully");
    } catch (err) {
      console.error("Orders error:", err);
      toast.error(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-8">
                <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-32"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black mb-4">No Orders Yet</h2>
          <p className="text-gray-600 text-lg mb-8">
            Start shopping and your orders will appear here
          </p>
          <Link
            to="/products"
            className="inline-block px-12 py-5 border-2 border-black text-black font-medium uppercase tracking-wider text-sm hover:bg-black hover:text-white transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-bold text-black text-center mb-16 tracking-tight">
          Your Orders
        </h1>

        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-400 transition-all duration-300"
            >
              <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600 uppercase tracking-wider">
                      Order ID
                    </p>
                    <p className="font-mono text-black font-medium">
                      {order._id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 uppercase tracking-wider">
                      Placed On
                    </p>
                    <p className="font-medium text-black">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 uppercase tracking-wider">
                      Total
                    </p>
                    <p className="text-2xl font-bold text-black">
                      ₹{order.totalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="text-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-48 object-cover rounded-xl border border-gray-200 mb-4"
                      />
                      <p className="font-medium text-black text-sm line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Size: {item.size} × {item.qty}
                      </p>
                      <p className="font-bold text-black mt-2">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/products"
            className="inline-block px-14 py-5 border-2 border-black text-white font-medium uppercase tracking-wider text-sm hover:bg-yellow-400 hover:text-white transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
