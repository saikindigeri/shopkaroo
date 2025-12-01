import { useState, useEffect } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    size: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
  });

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);

      // Your real backend URL — works everywhere
      const API_BASE = "https://shopkaroo-pdso.onrender.com/api";

      const query = new URLSearchParams({
        search: filters.search,
        category: filters.category === "All" ? "" : filters.category,
        size: filters.size,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        page: filters.page,
        limit: 12,
      }).toString();

      const res = await fetch(`${API_BASE}/products?${query}`, {
        method: "GET",
        credentials: "include", // sends login cookie if needed
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load products");
      }

      setProducts(data.products || []);
      setTotal(data.total || data.products.length || 0);

    } catch (err) {
      console.error("Products fetch error:", err);
      toast.error("Failed to load products");
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [filters]);
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "All",
      size: "",
      minPrice: "",
      maxPrice: "",
      page: 1,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-black">
            All Products
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            {total} {total === 1 ? "item" : "items"} available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar – Clean & Minimal */}
          <aside className="lg:w-80 space-y-10">
            <div>
              <input
                type="text"
                name="search"
                placeholder="Search products"
                value={filters.search}
                onChange={handleFilterChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-black transition-colors placeholder-gray-400"
              />
            </div>

            <div className="space-y-6">
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-black transition-colors"
              >
                <option value="All">All Categories</option>
                <option>Men</option>
                <option>Women</option>
                <option>Kids</option>
              </select>

              <select
                name="size"
                value={filters.size}
                onChange={handleFilterChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-black transition-colors"
              >
                <option value="">All Sizes</option>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min ₹"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="px-5 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-black transition-colors placeholder-gray-400"
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max ₹"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="px-5 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-black transition-colors placeholder-gray-400"
                />
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full py-4 border border-black text-black font-medium rounded-xl hover:bg-black hover:text-white transition-all duration-200 uppercase tracking-wider text-sm"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-2xl aspect-square mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {products.length === 0 ? (
                  <div className="text-center py-24">
                    <p className="text-2xl text-gray-600">No products found</p>
                    <button
                      onClick={clearFilters}
                      className="mt-6 text-black underline font-medium"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="flex justify-center items-center gap-6 mt-16">
                  <button
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        page: Math.max(1, prev.page - 1),
                      }))
                    }
                    disabled={filters.page === 1}
                    className="px-8 py-4 border border-black rounded-full font-medium uppercase tracking-wider text-sm hover:bg-black hover:text-white disabled:border-gray-300 disabled:text-gray-400 transition-all"
                  >
                    Previous
                  </button>

                  <span className="text-lg font-medium text-gray-700">
                    Page {filters.page}
                  </span>

                  <button
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
                    }
                    disabled={products.length < 12}
                    className="px-8 py-4 border border-black rounded-full font-medium uppercase tracking-wider text-sm hover:bg-black hover:text-white disabled:border-gray-300 disabled:text-gray-400 transition-all"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
