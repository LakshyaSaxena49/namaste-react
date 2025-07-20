import ItemList from "./ItemList";
import { useState } from "react";
const RestaurantCategory = ({ category, isOpen, setshowIndex }) => { //isOpen is the prop to control visibility and its a controlled component

  // const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setshowIndex(); // This will set the index of the currently open category
  }

  return (
    <div>
      {/* Header */}
      <div className="w-6/12 mx-auto p-4 bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg mb-4"> 
        <div 
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
          >
        
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            {category.title} ({category.itemCards.length})
            </span>
            
            <span className="text-gray-600 dark:text-gray-300">▼</span>
          
          </div>

        {/* Body (you can add itemCards here) */}
        {isOpen && <ItemList items={category.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
