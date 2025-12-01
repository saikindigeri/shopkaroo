import { useParams, Link } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <span className="text-2xl">✅</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
          Order Placed Successfully
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Thank you for shopping with us. Your order is being processed.
        </p>

        {/* Order ID */}
        {id && (
          <div className="inline-flex flex-col items-center justify-center rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 mb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-1">
              Order ID
            </span>
            <span className="text-sm sm:text-base font-mono font-semibold text-gray-900 break-all">
              {id}
            </span>
          </div>
        )}

        <p className="text-xs sm:text-sm text-gray-500 mb-8 px-2">
          A confirmation email has been sent to your registered email address
          with the order details and tracking information once it ships.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full
                       border border-black text-black text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase
                       hover:bg-yellow-500 hover:text-white transition-colors"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full
                       border border-transparent text-xs sm:text-sm font-medium tracking-[0.18em] uppercase
                       text-gray-700 hover:underline underline-offset-4"
          >
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
