import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeItemById } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constant";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item?.price || item?.defaultPrice || 0) / 100,
    0
  );

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemById(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-start justify-between border-b pb-4 gap-4"
            >
              <div className="flex gap-4">
                <img
                  src={CDN_URL + item.imageId}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg shadow"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600 text-sm mb-1">
                      {item.description || "No description available."}
                    </p>
                  </div>
                  <p className="font-medium">₹{(item.price || item.defaultPrice) / 100}</p>
                </div>
              </div>

              <button
                onClick={() => handleRemoveItem(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 h-fit rounded transition"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6 space-y-2">
            <p className="text-xl font-semibold">
              Total: ₹{totalPrice.toFixed(2)}
            </p>
            <button
              onClick={handleClearCart}
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
