export default function Filters({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: 1,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={filters.search}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      />
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg"
      >
        <option value="All">All Categories</option>
        <option>Men</option>
        <option>Women</option>
        <option>Kids</option>
      </select>
      <select
        name="size"
        value={filters.size}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg"
      >
        <option value="">All Sizes</option>
        <option>XS</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
      </select>
      <div className="flex gap-3">
        <input
          type="number"
          name="minPrice"
          placeholder="Min ₹"
          value={filters.minPrice}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max ₹"
          value={filters.maxPrice}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>
      <button
        onClick={() =>
          setFilters({
            search: "",
            category: "All",
            size: "",
            minPrice: "",
            maxPrice: "",
            page: 1,
          })
        }
        className="w-full bg-gray-200 py-3 rounded-lg hover:bg-gray-300"
      >
        Clear Filters
      </button>
    </div>
  );
}
