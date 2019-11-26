import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Paper } from "@material-ui/core";

const style = {
  backgroundColor: "#54A391",
  //   marginTop: "-16px",
  alignItems: "center",
  marginBottom: "-10px",
  height: "60px"
};

const textstyle = {
  color: "white",
  position: "center",
  display: "flex",
  justifyContent: "center"
};

class Footer extends Component {
  render() {
    return (
      <div style={style}>
        <p style={textstyle}>Custee © 2019 All Rights Reserved</p>
      </div>
    );
  }
}

export default withRouter(Footer);
