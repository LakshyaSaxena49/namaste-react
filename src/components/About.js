import User from "./User";
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
      <div>
        <h1>About Class Component</h1>
        <h2>This is NAMASTE REACT</h2>
        {/* <User name={"Lakshya saxena (function)"} /> */}

        <UserClass
          name={"name1 (classes)"}
          Location={"Dehradun class"}
          Contact={"@lakshya123"}
        />
        <UserClass
          name={"name2 (classes)"}
          Location={"Bangalore class"}
          Contact={"@lakshya456"} /> 
      </div>
    );
  }
}

export default About;
