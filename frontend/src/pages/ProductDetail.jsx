import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

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
