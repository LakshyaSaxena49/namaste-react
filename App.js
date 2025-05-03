import React from "react";
import ReactDOM from "react-dom/client";
/**
  <div id = "parent">
  <div id = "child">
  <h1> Im h1 tag</h1>
  <h2> Im h2 tag</h2>
  </div>
  </div>

  ReactElement(Object => HTML (Browser Understands))
*/
// const heading = React.createElement(
//   "div",
//   {id : "parent"},
//   React.createElement("div", {id : "child"},
//   React.createElement("h1", {}, "I am an h1 tag"),

// ));
// const heading = React.createElement(
//   "h1",
//   { id: "heading" },
//   "Hello world from React!"
// );

//JSX - Html like syntax
const jsxHeading = (
  <h1 className="head" tabIndex={5}>
    Namaste React using JSX</h1>
);

console.log(jsxHeading);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(jsxHeading);
