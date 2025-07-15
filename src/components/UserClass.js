//class-based component
import React from 'react';

    
class UserClass extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      count2: 2,
    }

    console.log(props);
  }

  render() {
    const {name, Location, Contact} = this.props;
    const {count} = this.state;
    const {count2} = this.state;

    return (
      <div className="user-card">
        <h1>Count: {count}</h1>
        {/* never update state varibale directly, always use setState */}
        <button
         onClick={() => this.setState({count: count + 1})}
        >Increment Count</button>

        <h2>Count2: {count2}</h2>
        <h2>Name: {name} </h2>
        <h3>Location: {Location} </h3> 
        <h4>Contact: {Contact} </h4>
      </div>
    );
  }
}

export default UserClass;