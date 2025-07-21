import { CDN_URL } from "../utils/constant";
import { addItems } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addItems(item));
  };

  return (
    <div>
      {items.map((item) => {
        const { id, name, description, price, defaultPrice, imageId } = item.card.info;

        return (
          <div
            key={id}
            className="p-4 m-4 border-b border-gray-300 dark:border-gray-600 text-left flex justify-between gap-4"
          >
            <div className="w-9/12">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold dark:text-white">{name}</h3>
                <span className="text-gray-800 dark:text-gray-300 text-sm">
                  ₹{(price || defaultPrice) / 100}
                </span>
              </div>
              {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {description}
                </p>
              )}
            </div>

            <div className="w-3/12 relative flex justify-center items-center">
              {imageId && (
                <img
                  src={CDN_URL + imageId}
                  alt={name}
                  className="w-32 h-24 object-cover rounded-md shadow-md"
                />
              )}
              <button
                className="absolute bottom-1 bg-white text-black text-sm px-4 py-1 rounded-md shadow hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 transition"
                onClick={() => handleAddToCart(item)}
              >
                Add+
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
