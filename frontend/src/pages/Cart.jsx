import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQty, removeItem, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-white via-gray-50 to-gray-100 px-4">
        <div className="max-w-md text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-6">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 border border-black text-black hover:bg-amber-400 text-xs sm:text-sm font-medium tracking-[0.25em] uppercase
                      transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 sm:mb-12">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {cart.length} item{cart.length > 1 ? "s" : ""} in your bag
            </p>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline-block text-xs font-medium tracking-[0.25em] uppercase text-gray-600 hover:text-black"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          {/* Cart Items */}
          <div className="space-y-4 sm:space-y-6">
            {cart.map((item) => (
              <div
                key={`${item.product._id}-${item.size}`}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-full sm:w-28 h-40 sm:h-28 overflow-hidden rounded-xl bg-gray-100 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Size:{" "}
                        <span className="font-medium text-gray-800">
                          {item.size}
                        </span>
                      </p>
                    </div>
                    <p className="text-base sm:text-lg font-semibold text-gray-900">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQty(item.product._id, item.size, item.qty - 1)
                        }
                        className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-300 rounded-full text-lg leading-none
                                   flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-40"
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm sm:text-base">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          updateQty(item.product._id, item.size, item.qty + 1)
                        }
                        className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-300 rounded-full text-lg leading-none
                                   flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product._id, item.size)}
                      className="text-xs sm:text-sm font-medium tracking-[0.18em] uppercase text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 sm:p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="text-gray-500">Calculated at checkout</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-xl font-semibold">₹{totalPrice}</span>
              </div>
            </div>

            <Link to="/checkout">
              <button
                className="mt-6 w-full bg-black text-white py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold
                           tracking-[0.2em] uppercase hover:bg-gray-900 transition-colors"
              >
                Proceed to Checkout
              </button>
            </Link>

            <p className="mt-3 text-[11px] sm:text-xs text-gray-500 text-center leading-relaxed">
              By continuing, you agree to our Terms &amp; Conditions and Privacy
              Policy.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
