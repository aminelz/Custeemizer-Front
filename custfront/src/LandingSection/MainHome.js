import React, { Fragment } from "react";
import Tshirtlist from "../CustomerSide/Tshirt Management/TshirtList";
import Header from "../CustomerSide/Common/Header";
import Footer from "../CustomerSide/Common/Footer";
import { Paper } from "@material-ui/core";

function MainHome() {
  return (
    <Fragment>
      <Header />
      <Paper style={{ background: "#B1D5CD" }}>
        <h1 style={{ textAlign: "center" }}> Home</h1>
        <Tshirtlist />
      </Paper>
      <Footer />
    </Fragment>
  );
}

export default MainHome;
