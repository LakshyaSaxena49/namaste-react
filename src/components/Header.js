import { useEffect, useState, useContext } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { UserContext } from "../utils/UserContext"; 
import { useSelector } from "react-redux";

const Header = ({ darkMode, setDarkMode }) => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus(); // Shows if you're online
  const { loggedInUser } = useContext(UserContext); // Correct!

  useEffect(() => {
    console.log("Login/Logout toggled");
  }, [btnName]);

  //Subscribe to Redux store using a selector
  const cartItems = useSelector((store) => store.cart.items);
  console.log("Cart items:", cartItems);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/images/foodHunt.png"
            alt={LOGO_URL}
            className="h-12 w-auto object-contain"
          />
          <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
            Food Hunt
          </span>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex items-center space-x-6 text-gray-700 dark:text-gray-200 font-medium">
            {/* Online status */}
            <li className="flex items-center gap-1">
              Status:
              <span className={onlineStatus ? "text-green-500" : "text-red-500"}>
                {onlineStatus ? "🟢 Online" : "🔴 Offline"}
              </span>
            </li>

            {/* Page Links */}
            <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</Link></li>
            <li><Link to="/cart" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Cart</Link></li>

            {/* Login/Logout Button */}
            <li>
              <button
                onClick={() => setBtnName((prev) => (prev === "Login" ? "Logout" : "Login"))}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md shadow transition"
              >
                {btnName}
              </button>
            </li>

            {/* User Name */}
            <li
              className="px-4 font-semibold text-gray-800 dark:text-white">{loggedInUser}</li>

            {/* 🌙 Dark Mode Toggle Button */}
            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="ml-2 px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

