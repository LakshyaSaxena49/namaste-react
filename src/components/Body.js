import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import resList from "../utils/mockData"; // Assuming this is your fallback mock data

const Body = () => {
  const { darkMode } = useOutletContext(); // 🌙 Use darkMode from parent
  const [ListOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  console.log("Body Rendered", ListOfRestaurants);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.63270&lng=77.21980&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      const json = await data.json();

      // Navigate through the JSON to find the actual restaurant cards
      // This path can vary, so inspect your console.log(json) carefully.
      const restaurants =
        json?.data?.cards?.find(
          (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      // Process restaurants to determine veg/non-veg status
      const processedRestaurants = restaurants.map((res) => {
        let isPureVeg = false;
        let servesNonVeg = false; // Default to false

        // Check for 'PUREVEG' badge
        // This is the most reliable indicator for pure vegetarian restaurants in Swiggy's data
        if (res.info.badgesV2?.badges?.some((badge) => badge.text === 'PUREVEG')) {
          isPureVeg = true;
          servesNonVeg = false; // If pure veg, it does not serve non-veg
        } else {
          // If it's NOT pure veg, it means it serves non-veg items (and typically also veg options)
          servesNonVeg = true;
          isPureVeg = false; // It's not purely vegetarian
        }

        return {
          ...res,
          info: {
            ...res.info,
            isPureVeg: isPureVeg,
            servesNonVeg: servesNonVeg,
          },
        };
      });

      setListOfRestaurants(processedRestaurants);
      setFilteredRestaurants(processedRestaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Fallback to mock data on error
      setListOfRestaurants(resList);
      setFilteredRestaurants(resList);
    }
  };

  if (ListOfRestaurants.length === 0) return <Shimmer />;

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen px-6 py-4 transition-all duration-300`}
    >
      {/* Top Section: Rating & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Filter by Rating */}
        <button
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded shadow"
          onClick={() => {
            const filtered = ListOfRestaurants.filter(
              (res) => res?.info?.avgRating > 4.2
            );
            setFilteredRestaurants(filtered);
          }}
        >
          Ratings 4.2+
        </button>

        {/* Search Box */}
        <form
          className="flex w-full md:w-1/2 gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const filtered = ListOfRestaurants.filter((res) =>
              res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRestaurants(filtered);
          }}
        >
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            placeholder="Search for restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded"
          >
            Search
          </button>
        </form>
      </div>

      {/* Restaurant Cards Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
              className="no-underline text-inherit"
            >
              <RestaurantCard resData={restaurant} darkMode={darkMode} />
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg dark:text-gray-400">
            No restaurants found for your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Body;