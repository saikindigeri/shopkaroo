// frontend/src/pages/Home.jsx

import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products?limit=8")
      .then((res) => {
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] sm:h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1713586573817-12d4f123cbec?q=80&w=1170&auto=format&fit=crop"
            alt="New Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative text-center px-6 max-w-5xl mx-auto z-10">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-xl">
            New Collection
          </h1>

          <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-white/90 font-light leading-relaxed drop-shadow">
            Timeless pieces crafted with precision and passion.
          </p>

          <a
            href="/products"
            className="inline-block mt-12 px-12 py-5 border-2 border-white text-white font-semibold uppercase tracking-[0.25em] text-sm hover:bg-white hover:text-black transition-all duration-300"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="px-6 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-28 bg-white">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black">
            Featured Products
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600">
            Curated just for you
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-7 sm:gap-10 lg:gap-14 justify-center">
          {loading
            ? [...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl aspect-square mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded w-4/5 mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/5"></div>
                </div>
              ))
            : products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>

        {!loading && products.length > 0 && (
          <div className="text-center mt-20 sm:mt-24">
            <a
              href="/products"
              className="inline-block px-10 py-4 border-2 border-black text-black font-medium uppercase tracking-[0.25em] text-sm hover:bg-black hover:text-white transition-all duration-300"
            >
              View All Products
            </a>
          </div>
        )}
      </section>

    {/* FOOTER BANNER */}
<section className="bg-gray-100 text-black py-16 sm:py-24 text-center px-6 border-t-1 border-gray-100">
  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight">
    Elevate Your Style.
  </h3>
  <p className="text-lg sm:text-xl opacity-95 font-light max-w-2xl mx-auto leading-relaxed">
    Discover premium fashion designed for comfort, confidence, and everyday elegance.
  </p>

  <a
    href="/products"
    className="inline-block mt-10 px-10 py-4 border border-black rounded-full text-sm tracking-[0.25em] uppercase font-medium  hover:bg-black hover:text-white transition-all duration-300"
  >
    Explore Collection
  </a>

  <p className="mt-10 text-xs opacity-70 tracking-wider">
    © {new Date().getFullYear()} ShopKaroo — All Rights Reserved
  </p>
</section>

    </div>
  );
}
