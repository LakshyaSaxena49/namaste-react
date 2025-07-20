import { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";   
//import About from "./components/About.js"; 
import Contact from "./components/Contact.js"; 
import Error from "./components/Error.js";  
import RestaurantMenu from "./components/RestaurantMenu.js"; 
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Shimmer from "./components/Shimmer.js";
import UserContext from "./utils/UserContext.js";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";

// Chunking
// Code Splitting
// Dynamic Bundling
// Lazy LOADING
// on demand loading
// dynamic import

const Grocery = lazy(() => import("./components/Grocery.js")); //import ka tareeka .
const About = lazy(() => import("./components/About.js"));

/**
 * AppLayout Component:
 * This component defines the main layout of the application.
 * It includes a Header that will be present on all pages,
 * and an Outlet which is a placeholder for child routes to be rendered.
 */
const AppLayout = () => {

  const [userName, setUserName] = useState("");
  useEffect(() => { //authentication
    //make an API call and send username and password
    const data = {
      name: "lakhya saxena",
    };
    setUserName(data.name);
  }, []);


  const [darkMode, setDarkMode] = useState(false); //  Centralized Dark Mode

  //  Toggle dark mode by applying Tailwind's 'dark' class to <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  console.log("Applayout rendered"); // Log to see when AppLayout re-renders

  return (
    <Provider store = {appStore}>
    <UserContext.Provider value = {{ loggedInUser: userName}} >
    <div className="app">
      {/* The Header component will always be visible */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      {/* Outlet renders the component for the current matched child route */}
      <Outlet context={{ darkMode }} />
    </div>
    </UserContext.Provider>
    </Provider>
  );
};

/**
 * Router Configuration:
 * createBrowserRouter is used to define the routing structure of the application.
 * It takes an array of route objects.
 */
const appRouter = createBrowserRouter([
  {
    // The root path "/"
    path: "/",
    // The element to render when the root path is matched (AppLayout provides the common layout)
    element: <AppLayout />,
    // Child routes that will be rendered within the AppLayout's Outlet
    children: [
      {
        // Default child route for the root path
        path: "/",
        element: <Body />, // Renders the Body component
      },
      {
        // Route for the "/about" path
        path: "/about",
        element: <About />, // Renders the About component
      },
      {
        // Route for the "/contact" path
        path: "/contact",
        element: <Contact />, // Renders the Contact component
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer></Shimmer>}>
            <Grocery />
          </Suspense>
        )
      },
      {
        // Route for dynamic restaurant menus, e.g., "/restaurants/123"
        // ":resId" is a URL parameter that can be accessed in the RestaurantMenu component
        path: "/restaurants/:resId",
        // CRITICAL FIX: Ensure this is a JSX element, NOT a string
        element: <RestaurantMenu />, // Renders the RestaurantMenu component
      },
    ],
    // Element to render if no route matches (e.g., a 404 page)
    errorElement: <Error />,
  },
]);

// Get the root DOM element where the React application will be mounted
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application by providing the router to the RouterProvider
root.render(<RouterProvider router={appRouter} />);
