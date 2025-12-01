export default function CartItem({ item, updateQty, removeItem }) {
  return (
    <div className="flex items-center gap-6 bg-black py-6 border-b">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-gray-600">Size: {item.size}</p>
        <p className="text-xl font-bold">₹{item.price}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => updateQty(item.product, item.size, item.qty - 1)}
          className="w-10 h-10 border rounded-lg hover:bg-gray-100"
        >
          -
        </button>
        <span className="w-12 text-center font-semibold">{item.qty}</span>
        <button
          onClick={() => updateQty(item.product, item.size, item.qty + 1)}
          className="w-10 h-10 border rounded-lg hover:bg-gray-100"
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeItem(item.product, item.size)}
        className="text-red-600 font-medium"
      >
        Remove
      </button>
    </div>
  );
}
