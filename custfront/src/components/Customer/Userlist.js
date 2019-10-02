import React, { Component } from "react";

class Userlist extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    const url = "http://localhost:8080/Customers";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data });
      })
      .catch(err => console.log(err));
    console.log(this.state.users);
    var object = this.state.users.map(function(x) {
      return {
        customer_ID: x[0],
        first_name: x[1],
        last_name: x[2],
        email: x[3],
        birth_date: x[4],
        phone_number: [5],
        street: x[6],
        city: x[7],
        zipcode: x[8],
        country: x[9]
      };
    });
    console.log(object);
    //this.setState({ users: object });
    console.log(this.state.users);
  }
  render() {
    const tableRows = this.state.users.map((user, index) => (
      <tr key={index}>
        <td>{user}</td>
        <td>{user}</td>
        <td>{user}</td>
        <td>{user}</td>
        <td>{user.birth_date}</td>
        <td>{user.phone_number}</td>
        <td>{user.street}</td>
        <td>{user.city}</td>
        <td>{user.zipcode}</td>
        <td>{user.country}</td>
      </tr>
    ));
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Customer_ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Birthdate}</th>
              <th>Phonenumber</th>
              <th>Street</th>
              <th>City</th>
              <th>Zipcode</th>
              <th>Country</th>
            </tr>
            {tableRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Userlist;
