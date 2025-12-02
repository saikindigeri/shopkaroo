import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { ShoppingBag, Menu, X, User, LogOut, Package } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center py-4 sm:py-5">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-red-200 flex items-center justify-center bg-red-50 group-hover:bg-red-100 transition-colors">
              <ShoppingBag className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-xl sm:text-2xl font-semibold tracking-[0.25em] uppercase text-gray-900 group-hover:text-red-600 transition-colors">
              ShopKaroo
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <Link
              to="/products"
              className="text-sm font-medium text-gray-800 hover:text-black tracking-[0.25em] uppercase relative
                         after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0
                         after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
            >
              Products
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 rounded-full pl-3 pr-4 py-1.5 border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold uppercase">
                    {user.name?.[0] || "U"}
                  </div>
                  <span className="text-xs font-medium text-gray-900 tracking-[0.2em] uppercase">
                    {user.name.split(" ")[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-3 w-68 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden animate-fadeIn"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                      <p className="text-[11px] text-gray-500 uppercase tracking-[0.25em] mb-1">
                        Signed in as
                      </p>
                      <p className="font-semibold text-gray-900 text-sm break-all">
                        {user.email}
                      </p>
                    </div>
                    <div className="py-2 text-sm">
                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Package className="w-4 h-4 text-gray-700" />
                        <span className="font-medium text-gray-900">
                          My Orders
                        </span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors w-full text-left text-gray-900"
                      >
                        <LogOut className="w-4 h-4 text-gray-700" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/login"
                  className="text-xs font-medium text-gray-700 hover:text-black tracking-[0.25em] uppercase"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-medium text-gray-700 hover:text-black tracking-[0.25em] uppercase"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative group"
            >
              <ShoppingBag className="w-7 h-7 text-gray-900 group-hover:text-gray-700 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2.5 -right-3 bg-gray-900 text-white text-[11px] font-semibold rounded-full w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-5 lg:hidden">
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-7 h-7 text-gray-900" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-semibold rounded-full w-4.5 h-4.5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7 text-gray-900" />
              ) : (
                <Menu className="w-7 h-7 text-gray-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-7 space-y-6">
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-medium text-gray-900 uppercase tracking-[0.25em]"
            >
              Products
            </Link>

            {user ? (
              <div className="border-t border-gray-100 pt-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold uppercase">
                    {user.name?.[0] || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                </div>

                <Link
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 text-sm font-medium text-gray-900"
                >
                  <Package className="w-4 h-4" /> My Orders
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 text-sm font-medium text-gray-900 w-full"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3 border-t border-gray-100 pt-5">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-gray-900 uppercase tracking-[0.25em]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-gray-900 uppercase tracking-[0.25em]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
