import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

const navstyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  minHeight: "5vh",
  background: "rgb(81, 87, 90)",
  color: "white",
  marginTop: "-16px"
};
const linksstyle = {
  width: "50%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  listStyle: "none"
};
const textstyle = {
  color: "white"
};

class Nav extends Component {
  render() {
    return (
      <nav style={navstyle}>
        <h3> CusTee </h3>
        <ul style={linksstyle}>
          <Link to="/Home">
            <li style={textstyle}> Home </li>
          </Link>
          <Link to="/Tshirts/Homme">
            <li style={textstyle}> Men </li>
          </Link>
          <Link to="/Tshirts/Femme">
            <li style={textstyle}> Women </li>
          </Link>
          <Link to="/Orders">
            <li style={textstyle}> Orders </li>
          </Link>
          <Link to={"/Customers"}>
            <li style={textstyle}> Customers </li>
          </Link>
          <Link to={"/Admins"}>
            <li style={textstyle}> Admins </li>
          </Link>
        </ul>
      </nav>
    );
  }
}
export default withRouter(Nav);
