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
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="px-6 py-5 lg:px-12">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl lg:text-3xl font-bold tracking-wider text-red-600 hover:text-red-700 transition-colors"
          >
            ShopKaroo
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            <Link
              to="/products"
              className="text-lg font-medium text-black hover:text-gray-600 transition-colors uppercase tracking-wider"
            >
              Products
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 hover:bg-gray-50 rounded-full px-4 py-2 transition-colors"
                >
                  <User className="w-6 h-6 text-black" />
                  <span className="text-sm font-medium text-black uppercase tracking-wider">
                    {user.name.split(" ")[0]}
                  </span>
                </button>

                {/* Dropdown */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="p-6 border-b border-gray-100">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">
                        Signed in as
                      </p>
                      <p className="font-semibold text-black mt-1">
                        {user.email}
                      </p>
                    </div>
                    <div className="py-3">
                      <Link
                        to="/orders"
                        className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Package className="w-5 h-5 text-gray-700" />
                        <span className="font-medium text-black">
                          My Orders
                        </span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-5 h-5 text-gray-700" />
                        <span className="font-medium text-black">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-10">
                <Link
                  to="/login"
                  className="text-black hover:text-gray-600 font-medium uppercase tracking-wider text-sm transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-black hover:text-gray-600 font-medium uppercase tracking-wider text-sm transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <ShoppingBag className="w-7 h-7 text-black group-hover:text-gray-600 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-3 -right-3 bg-black text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-6 lg:hidden">
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-7 h-7 text-black" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-6 py-8 space-y-8">
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-2xl font-medium text-black uppercase tracking-wider"
            >
              Products
            </Link>

            {user ? (
              <>
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-4 mb-6">
                    <User className="w-10 h-10 text-black" />
                    <div>
                      <p className="font-semibold text-black">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  <Link
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 py-4 text-lg font-medium text-black"
                  >
                    <Package className="w-5 h-5" /> My Orders
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-4 py-4 text-lg font-medium text-black w-full"
                  >
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-2xl font-medium text-black uppercase tracking-wider"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-2xl font-medium text-black uppercase tracking-wider"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
