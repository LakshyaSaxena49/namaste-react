import UserClass from "./UserClass";
import { Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);
    console.log("Parent Constructor :");
  }

  componentDidMount() {
    console.log("Parent Component Did Mount");
  }

  render() {
    return (
      <div
        className="min-h-screen px-4 py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      >
        <div
          className="max-w-4xl mx-auto p-8 rounded-3xl shadow-2xl 
          bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all"
        >
          <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
            About Food Hunt
          </h1>

          <p className="text-lg mb-8 text-justify leading-relaxed">
            Welcome to <strong>Food Hunt</strong> — your one-stop platform to explore, compare, and discover the best restaurants near you.
            From fast delivery options to diverse cuisines, we’ve got your cravings covered. Built with performance and accessibility in mind,
            this app leverages modern frontend tools to ensure a smooth and immersive user experience.
          </p>



          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow-inner">
            <h2 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-300">
              🔧 Technologies Used
            </h2>
            <ul className="list-disc list-inside space-y-2 text-base">
              <li>⚛️ React with JSX & component-based architecture</li>
              <li>🎨 Tailwind CSS for responsive design & dark mode</li>
              <li>🧭 React Router DOM for smooth navigation</li>
              <li>⚡ Lazy loading & shimmer UI for fast rendering</li>
              <li>🧠 Context API + Redux Toolkit for global state</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default About;

