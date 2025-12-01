import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="relative overflow-hidden bg-white ">
        {/* Image */}
        <div className="aspect-square w-full bg-gray-100">
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 "
          />
        </div>

        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

        <div className="pt-6 pb-2 px-1 text-center">
          <h3 className="text-lg font-medium text-black tracking-wide group-hover:underline">
            {product.name}
          </h3>

          {product.category && (
            <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider">
              {product.category}
            </p>
          )}

          <p className="mt-4 text-2xl font-bold text-black">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </Link>
  );
}
