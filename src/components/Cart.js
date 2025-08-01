import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeItemById } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constant";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  // Calculate total price from all cart items
  const totalPrice = cartItems.reduce((acc, item) => {
    const priceInPaise =
      typeof item?.price === "number"
        ? item.price
        : typeof item?.defaultPrice === "number"
        ? item.defaultPrice
        : 0;
    return acc + priceInPaise / 100; // Convert paise to rupees
  }, 0);

  // Remove a specific item from the cart using its ID
  const handleRemoveItem = (itemId) => {
    dispatch(removeItemById(itemId));
  };

  // Clear all items from the cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

        {/* Show empty message if no items */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-6">
            {/* Map through each cart item and render its details */}
            {cartItems.map((item, index) => {
              const itemPrice =
                typeof item?.price === "number"
                  ? item.price
                  : item?.defaultPrice || 0;

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-start justify-between border-b pb-4 gap-4"
                >
                  <div className="flex gap-4">
                    {/* Render food image */}
                    <img
                      src={CDN_URL + item.imageId}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg shadow"
                    />

                    {/* Render name, description and price */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                          {item.description || "No description available."}
                        </p>
                      </div>
                      <p className="font-medium text-green-700 dark:text-green-300">
                        ₹{(itemPrice / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Button to remove item from cart */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 h-fit rounded transition"
                  >
                    Remove
                  </button>
                </div>
              );
            })}

            {/* Total price and Clear Cart button */}
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
    </div>
  );
};

export default Cart;
