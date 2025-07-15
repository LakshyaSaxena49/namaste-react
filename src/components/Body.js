import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  // useState stores a copy that can be filtered
  const [ListOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [searchText, setSearchText] = useState("");

  // useEffect - callback function called after the rendering of component
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.63270&lng=77.21980&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      
      const json = await data.json();
      console.log(json);
      
      // Extract the actual restaurants array from the API response
      // optional chaining .
      const restaurants = json?.data?.cards?.find(card => 
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      
      // Ensure we always have an array
      const restaurantArray = Array.isArray(restaurants) ? restaurants : [];
      
      setListOfRestaurants(restaurantArray);
      setFilteredRestaurants(restaurantArray);
    } catch (error) {
      // Fallback to mock data if API fails
      console.error("Error fetching data:", error);
      const fallbackData = Array.isArray(resList) ? resList : [];
      setListOfRestaurants(fallbackData);
      setFilteredRestaurants(fallbackData);
    }
  };

  //conditional rendering
  return ListOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input type="text" className="search-box" 
          value={searchText} onChange={(e) => {
            setSearchText(e.target.value);
          }}/>
          
          <button
          onClick={() => {
            //filter restaurant cards and update the UI
            //seachText
            console.log(searchText);

            const filteredRestaurants = ListOfRestaurants.filter(
              (res) => res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
            )   

            setFilteredRestaurants(filteredRestaurants);

          }}
          >Search</button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredRestaurants = ListOfRestaurants.filter(
              (res) => res?.info?.avgRating > 4.2
            );
            setFilteredRestaurants(filteredRestaurants);
          }}
        >
          Ratings(4.2+) 
        </button>
      </div>
      <div className="res-container">
        {Array.isArray(filteredRestaurants) && filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
              style={{ textDecoration: 'none', color: 'inherit' }} // Basic styling to remove link default appearance
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))
        ) : (
          <p>No restaurants found for your search.</p>
        )}
      </div>
    </div>
  );
};

export default Body;