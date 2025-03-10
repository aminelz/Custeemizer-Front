import React, { Component } from "react";
import AddAdmin from "./AddAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from "@material-ui/core";

class Adminlist extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], added: false };
    this.handleStateChange = this.handleStateChange.bind(this);
    this.fetchadmins = this.fetchadmins.bind(this);
  }

  async componentDidMount() {
    await this.fetchadmins();
  }

  handleStateChange() {
    this.setState({ added: true });
  }

  async componentDidUpdate(prevState) {
    if (this.state.added === true) {
      await this.fetchadmins()
        .then(this.setState({ added: false }))
        .then(console.log("Update Trigerred !"));
    }
  }

  async fetchadmins() {
    const url = `http://localhost:8080/Admins`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ users: data, added: false });
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
      .then(res => this.fetchadmins())
      .catch(err => console.error(err));
  }

  render() {
    const tableRows = this.state.users.map((user, index) => (
      <TableRow key={index}>
        <TableCell align="left">{user.user_ID}</TableCell>
        <TableCell align="right">{user.first_name}</TableCell>
        <TableCell align="right">{user.last_name}</TableCell>
        <TableCell align="right">{user.email}</TableCell>
        <TableCell align="center">{user.password}</TableCell>
      </TableRow>
    ));
    return (
      <div>
        <div>
          <AddAdmin
            addAdmin={this.addAdmin}
            fetchadmins={this.fetchadmins}
            track={this.handleStateChange}
          />
          <Table>
            <TableHead style={{ fontStyle: "italic" }}>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center"> Last Name</TableCell>
                <TableCell align="center"> Email</TableCell>
                <TableCell align="center">Password </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Adminlist;
