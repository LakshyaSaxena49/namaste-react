import { CDN_URL } from "../utils/constant";

const RestaurantCard = ({ resData, darkMode }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    resData.info;

  // Determine if the restaurant is pure vegetarian or serves non-veg
  // These flags are now expected to be set by the Body component's data processing
  const isPureVeg = resData.info.isPureVeg;
  const servesNonVeg = resData.info.servesNonVeg; // True if not pure veg

  // Image URLs for veg and non-veg symbols
  const vegSymbolUrl = "https://placehold.co/20x20/4CAF50/4CAF50"; // Green circle
  const nonVegSymbolUrl = "https://placehold.co/20x20/F44336/F44336"; // Red square

  return (
    <div
      className={`p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 relative
      ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
    >
      <img
        className="w-full h-40 object-cover rounded-md mb-3"
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {cuisines.join(", ")}
      </p>
      <div className="flex justify-between text-sm mt-2">
        <span>⭐ {avgRating}</span>
        <span>{costForTwo}</span>
        <span>{sla.deliveryTime} mins</span>
      </div>

      {/* Veg/Non-Veg Symbols */}
      <div className="absolute top-4 right-4 flex items-center space-x-1"> {/* Adjusted top/right for better placement */}
        {isPureVeg && (
          <img
            src={vegSymbolUrl}
            alt="Pure Vegetarian"
            className="w-5 h-5 rounded-full shadow-md"
            title="Pure Vegetarian"
          />
        )}
        {servesNonVeg && !isPureVeg && ( // If it serves non-veg AND is NOT pure veg (i.e., mixed or only non-veg)
          <>
            <img
              src={nonVegSymbolUrl}
              alt="Serves Non-Vegetarian"
              className="w-5 h-5 rounded-md shadow-md"
              title="Serves Non-Vegetarian"
            />
            {/* Add a green symbol if it's not pure veg, assuming it also has veg options */}
            <img
              src={vegSymbolUrl}
              alt="Also serves Vegetarian options"
              className="w-5 h-5 rounded-full shadow-md"
              title="Also serves Vegetarian options"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;