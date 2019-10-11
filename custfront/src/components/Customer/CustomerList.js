import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Customerlist extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  async componentDidMount() {
    await this.fetchcustomers();
  }

  async fetchcustomers() {
    const url = `http://localhost:8080/Customers`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ users: data });
      })
      .catch(err => console.log(err));
  }
  render() {
    var total = 3;
    const tableRows = this.state.users.map((user, index) => (
      <tr key={index}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>{user.user_ID}</td>
        <td>
          <Link to={{ pathname: "/Customer/" + (total + 1), myuser: { user } }}>
            {(total = total + 1)}
          </Link>
        </td>
      </tr>
    ));
    return (
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>ID</th>
                <th>Customer_ID</th>
              </tr>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(Customerlist);
