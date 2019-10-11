import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AddAdmin from "./AddAdmin";

class Adminlist extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  async componentDidMount() {
    await this.fetchadmins();
  }

  async componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    // await this.fetchadmins();
  }

  async fetchadmins() {
    const url = `http://localhost:8080/Admins`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ users: data });
      })
      .catch(err => console.log(err));
  }

  async addAdmin(admin) {
    await fetch("http://localhost:8080/api/endUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(admin)
    })
      .then(res => this.fetchadmins)
      .catch(err => console.error(err));
    window.location.reload();
  }

  render() {
    const tableRows = this.state.users.map((user, index) => (
      <tr key={index}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>{user.user_ID}</td>
      </tr>
    ));
    return (
      <div>
        <div>
          <AddAdmin addAdmin={this.addAdmin} fetchadmins={this.fetchadmins} />
          <table>
            <tbody>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>ID</th>
              </tr>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(Adminlist);
