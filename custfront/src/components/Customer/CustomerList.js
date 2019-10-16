import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from "@material-ui/core";

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
      <TableRow key={index}>
        <TableCell align="left">{user.user_ID}</TableCell>
        <TableCell align="right">{user.first_name}</TableCell>
        <TableCell align="right">{user.last_name}</TableCell>
        <TableCell align="right">{user.email}</TableCell>
        <TableCell align="center">{user.password}</TableCell>
        <TableCell>
          <Link
            style={{ color: "green" }}
            to={{ pathname: "/Customer/" + (total + 1), myuser: { user } }}
          >
            <VisibilityIcon />
          </Link>
        </TableCell>
      </TableRow>
    ));

    return (
      <div>
        <div>
          <Table>
            <TableHead style={{ fontStyle: "italic" }}>
              <TableCell align="left"> ID </TableCell>
              <TableCell align="center"> First Name </TableCell>
              <TableCell align="center"> Last Name</TableCell>
              <TableCell align="center"> Email </TableCell>
              <TableCell align="center"> Password</TableCell>
            </TableHead>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withRouter(Customerlist);
