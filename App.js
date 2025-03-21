/*
  <div id = "parent">
  <div id = "child">
  <h1> Im h1 tag</h1>
  <h2> Im h2 tag</h2>
  </div>
  </div>

  ReactElement(Object => HTML (Browser Understands))
*/
const parent = React.createElement(
  "div",
  {id : "parent"},
  React.createElement("div", {id : "child"}, 
  React.createElement("h1", {}, "I am an h1 tag"),
  React.createElement("h2", {}, "I am an h2 tag"),
));
//using JSX  

//const heading = React.createElement("h1", {id : "heading"}, "Hello world from React!");
console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);
