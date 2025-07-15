import { useEffect, useState } from "react";
import Shimmer from "./Shimmer.js"; // Ensure .js extension for local imports
import { useParams } from "react-router-dom"; // Import useParams to get URL parameters

/**
 * RestaurantMenu Component:
 * Fetches and displays the menu for a specific restaurant using its ID from the URL.
 */
const RestaurantMenu = () => {
  // State to store the fetched restaurant information
  const [resInfo, setResInfo] = useState(null);
  // State to store any error messages during data fetching
  const [error, setError] = useState(null);

  // useParams hook to extract the 'resId' from the URL (e.g., /restaurants/123 -> resId = "123")
  const { resId } = useParams();

  // useEffect hook to fetch menu data when the component mounts or resId changes
  useEffect(() => {
    fetchMenu();
  }, [resId]); // Dependency array: re-run fetchMenu if resId changes

  /**
   * fetchMenu:
   * Asynchronously fetches the restaurant menu data from the Swiggy API.
   */
  const fetchMenu = async () => {
    setError(null); // Clear previous errors before a new fetch
    try {
      // Construct the API URL using the dynamic resId
      // Ensure the lat/lng are appropriate for a restaurant that exists in Swiggy's database
      const API_URL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.63270&lng=77.21980&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;

      const response = await fetch(API_URL);

      // Check if the response was successful (status code 200-299)
      if (!response.ok) {
        // If not successful, throw an error with the status text
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const json = await response.json();

      // Basic check for data existence in the response
      if (!json.data) {
        throw new Error("No data found in the API response.");
      }

      setResInfo(json.data); // Update state with the fetched data
    } catch (err) {
      console.error("Error fetching menu:", err);
      setError("Error fetching restaurant data. Please try again later."); // Set user-friendly error message
      setResInfo(null); // Clear any partial data
    }
  };

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
    // and ensure they have itemCards
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
    <div className="menu"> 
      <h1>{name}</h1> 
      <p>
        {cuisines?.join(", ")} - {costForTwoMessage}
      </p>

      <h2>Menu</h2> 
      {categories.length > 0 ? (
        // Iterate over each menu category
        categories.map((category, index) => (
          <div key={category.title || index}> 
            <h3>{category.title}</h3>
            {category.itemCards && category.itemCards.length > 0 ? (
              <ul>
                {/* Iterate over each item within the category */}
                {category.itemCards.map((itemCard) => (
                  <li key={itemCard.card.info.id}> 
                    <div>
                      <div>
                        <p>{itemCard.card.info.name}</p>
                        <p>
                          ₹{((itemCard.card.info.price || itemCard.card.info.defaultPrice) / 100).toFixed(2)}
                        </p>
                        <p>{itemCard.card.info.description}</p>
                      </div>
                      {/* Display item image if available */}
                      {itemCard.card.info.imageId && (
                        <img
                          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${itemCard.card.info.imageId}`}
                          alt={itemCard.card.info.name}
                          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/96x96/E0E0E0/808080?text=No+Image"; }} // Fallback for broken images
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in this category.</p>
            )}
          </div>
        ))
      ) : (
        <p>No menu categories found for this restaurant. It might be closed or the API structure has changed.</p>
      )}
    </div>
  );
};

export default RestaurantMenu;