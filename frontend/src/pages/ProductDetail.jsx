import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
const navigate=useNavigate()
useEffect(() => {
  const fetchProduct = async () => {
    if (!id) return; // safety

    try {
      setLoading(true);

      // Your real backend URL — works everywhere
      const API_BASE = "https://shopkaroo-pdso.onrender.com/api";

      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "GET",
        credentials: "include", // sends login cookie if needed
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Product not found");
      }

      setProduct(data); // or data.product depending on your backend response
      // setProduct(data.product); // ← if backend returns { product: {...} }

    } catch (err) {
      console.error("Error loading product:", err);
      toast.error(err.message || "Failed to load product");
     
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id, navigate]); // include navigate if using it

  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <img
          src={product.image}
          alt=""
          className="w-full h-96 object-cover rounded-lg"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-yellow-800 mb-6">
            ₹{product.price}
          </p>
          <p className="text-gray-600 mb-8">
            {product.description || "Premium quality clothing"}
          </p>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Select Size
            </label>
            <div className="flex gap-3">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-6 py-3 border rounded-lg ${
                    size === s ? "bg-black text-white" : "hover:border-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() =>
              addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                size,
                qty: 1,
              })
            }
            disabled={!size}
            className="w-full bg-black text-white py-4 rounded-md text-lg font-semibold hover:bg-gray-800 "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
