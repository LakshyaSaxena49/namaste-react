import { useState } from "react";
import Shimmer from "./Shimmer.js"; 
import { useParams } from "react-router-dom"; 
// Import useParams to get URL parameters
import useRestaurantMenu from "../utils/userRestaurantMenu.js"; 
import RestaurantCategory from "./RestaurantCategory.js";

/**
 * RestaurantMenu Component:
 * Fetches and displays the menu for a specific restaurant using its ID from the URL.
 */
const RestaurantMenu = () => {
  // useParams hook to extract the 'resId' from the URL (e.g., /restaurants/123 -> resId = "123")
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId); 
  
  const [showIndex, setshowIndex] = useState(0);


  const [error, setError] = useState(null);

  // Display error message if an error occurred
  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#fee2e2', color: '#b91c1c', fontSize: '1.125rem' }}>
        <p>{error}</p>
      </div>
    );
  }

  // Display Shimmer component while data is loading and no error
  if (resInfo === null) {
    return <Shimmer />;
  }

  // --- Extracting Restaurant Information ---
  // The Swiggy API response structure can be deeply nested and vary.
  // This attempts to find the card containing basic restaurant info.
  const restaurantInfo = resInfo?.cards?.find(
    (card) => card?.card?.card?.info
  )?.card?.card?.info;

  // Destructure common restaurant details
  const { name, cuisines, costForTwoMessage } = restaurantInfo || {};

  // --- Corrected Path for Menu Items ---
  // Find the card that contains the grouped menu categories
  const menuCardsContainer = resInfo?.cards?.find(
    (card) => card?.groupedCard?.cardGroupMap?.REGULAR?.cards
  );

  // Access the array of category cards
  const categoryCards = menuCardsContainer?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  let categories = [];
  if (categoryCards) {
    // Filter for cards that are actual menu categories (ItemCategory or NestedItemCategory) 
    categories = categoryCards
      .map((card) => card?.card?.card) // Access the inner card.card.card object
      .filter(
        (card) =>
          (card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
           card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory") &&
          card.itemCards // Ensure the category actually has items
      );
  }

  return (
    <div className=""> 
      <h1 className="text-gray-800 dark:text-white-100 text-center p-2 mb-4 text-xl">{name}</h1> 
      <p className="text-gray-600 dark:text-white-300 text-center mb-4">
        {cuisines?.join(", ")} - {costForTwoMessage}
      </p>

      <h2 className="text-xl font-semibold mb-4">Menu</h2> 
      {categories.length > 0 ? (

        // Iterate over each menu category
        categories.map((category, index) => (
          <RestaurantCategory
            key={category.title || index}
            category={category}
            isOpen={index === showIndex}
            setshowIndex={() => {
              // If clicking the already open one, close it
              if (showIndex === index) {
                setshowIndex(null);
              } else {
                setshowIndex(index);
              }
            }}
          />
        ))
      ) : (
        <p className="text-gray-600 dark:text-gray-300">No menu categories found for this restaurant. It might be closed or the API structure has changed.</p>
      )}
    </div>
  );
};

export default RestaurantMenu;
