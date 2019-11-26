import React, { Component, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
// import Nav from "./Nav";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withRouter } from "react-router-dom";
import AddCustomer from "../../CustomerSide/Profile Management/AddCustomer";
import Footer from "./Footer";
import { Container, Paper } from "@material-ui/core";
import { Grid, MenuList, MenuItem } from "@material-ui/core";
import NavigationMenu from "./NavigationMenu";
import Flexbox from "flexbox-react";

//Components to be used in the menu
import TshirtList from "../Tshirt Management/TshirtList";
import swal from "sweetalert";
import CustomerDetails from "../Profile Management/CustomerDetails";
import CartList from "../../Shared Admin&Customer/Cart&Order/CartList";
import AdminPanel from "../../AdminSide/AdminPanel";
import ReactTooltip from "react-tooltip";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import "./Header.css";

const style = {
  backgroundColor: "#54A391",
  marginTop: "-16px",
  justifyContent: "space-around",
  alignItems: "center"
};

const textstyle = {
  color: "white",
  paddingLeft: "1050px"
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart_ID: 0,
      choice: "",
      login_status: null,
      logged_out: false,
      logged_id: null,
      menu_choice: "Home"
    };
    this.changeLoginState = this.changeLoginState.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.updateFromSession = this.updateFromSession.bind(this);
    this.updateCart = this.updateCart.bind(this);
    // const total = null;
  }

  changeLoginState(x, y) {
    this.setState({
      login_status: x,
      logged_id: y,
      logged_out: false
    });
    sessionStorage.setItem("loginstatus", JSON.stringify(x));
    sessionStorage.setItem("loggedid", JSON.stringify(y));
    sessionStorage.setItem("loggedout", JSON.stringify(false));
  }

  handleLogout() {
    this.setState({
      login_status: null,
      logged_out: true,
      logged_id: null,
      menu_choice: "Home"
    });
    sessionStorage.setItem("loginstatus", JSON.stringify(null));
    sessionStorage.setItem("loggedout", JSON.stringify(true));
    sessionStorage.setItem("loggedid", JSON.stringify(null));
    sessionStorage.setItem("menuchoice", JSON.stringify("Home"));
    swal("Logged out", "Thank you for your visit !", "success");
  }

  async componentDidMount() {
    const loggedin = JSON.parse(sessionStorage.getItem("loginstatus"));
    const loggedout = JSON.parse(sessionStorage.getItem("loggedout"));
    const loggedid = JSON.parse(sessionStorage.getItem("loggedid"));
    const menuchoice = JSON.parse(sessionStorage.getItem("menuchoice"));
    const cartid = JSON.parse(sessionStorage.getItem("cartid"));
    if (
      loggedin === null &&
      loggedout === null &&
      loggedid === null &&
      menuchoice === null
    ) {
    } else {
      this.updateFromSession(loggedin, loggedout, loggedid, menuchoice, cartid);
    }
    /* if (this.state.cart_ID !== 0) {
    //   await this.fetchcart(this.state.cart_ID);
     } else */ if (
      this.state.cart_ID === 0
    ) {
      await this.createNewCart();
    }
  }

  async createNewCart() {
    const url = "http://localhost:8080/NewCart";
    await fetch(url)
      .then(async ans => await ans.json())
      .then(data => {
        this.setState({ cart_ID: data.cart_ID });
        sessionStorage.setItem("cartid", JSON.stringify(data.cart_ID));
      })
      .catch(err => console.log(err));
  }

  updateFromSession(x, y, z, r, c) {
    this.setState({
      login_status: x,
      logged_out: y,
      logged_id: z,
      menu_choice: r,
      cart_ID: c
    });
  }

  handleMenuClick(x) {
    this.setState({ menu_choice: x });
    sessionStorage.setItem("menuchoice", JSON.stringify(x));
  }

  // async fetchcart(x) {
  //   const url = `http://localhost:8080/Cart/16/${x}`;
  //   await fetch(url)
  //     .then(async res => await res.json())
  //     .then(data => {
  //       this.setState({ cart_ID: data.cart_ID });
  //     })
  //     .catch(err => console.log(err));
  // }

  updateCart() {
    this.createNewCart();
    this.handleMenuClick("Myaccount");
  }

  render() {
    var loggedin = (
      <p>
        <AddCustomer
          choice={"Login"}
          changeLoginState={this.changeLoginState}
        />
        or
        <AddCustomer
          choice={"Register"}
          changeLoginState={this.changeLoginState}
        />
      </p>
    );
    var loggedout = (
      <div style={{ margin: "0px", padding: "0px" }}>
        {/* <p
      //     onClick={() => {
      //       this.handleLogout();
      //     }}

      //     style={{ margin: 0, padding: 0 }}
      //   >
      //     Logout
      //   </p> */}
        <ExitToAppIcon
          onClick={() => {
            this.handleLogout();
          }}
          style={{ marginTop: "0px" }}
          data-tip="Logout"
        />
        <ReactTooltip place="bottom" position="float" type="error" />
      </div>
    );
    var display;

    var cart_classname;
    if (this.state.login_status === null) {
      cart_classname = "cart_icon";
    } else {
      cart_classname = "cart_icon2";
    }

    if (this.state.menu_choice === "Home") {
      display = (
        <TshirtList
          sex="All"
          cart_ID={this.state.cart_ID}
          style={{ padding: 0, margin: 0 }}
          // updateCart={this.updateCart}
        />
      );
    } else if (this.state.menu_choice === "Men") {
      display = (
        <TshirtList
          sex="Men"
          cart_ID={this.state.cart_ID}
          style={{ padding: 0, margin: 0 }}
          // updateCart={this.updateCart}
        />
      );
    } else if (this.state.menu_choice === "Women") {
      display = (
        <TshirtList
          sex="Women"
          cart_ID={this.state.cart_ID}
          style={{ padding: 0, margin: 0 }}
          // updateCart={this.updateCart}
        />
      );
    } else if (this.state.menu_choice === "Myaccount") {
      display = (
        <CustomerDetails
          user_id={this.state.logged_id}
          style={{ padding: 0, margin: 0 }}
        />
      );
    } else if (this.state.menu_choice === "Adminpanel") {
      display = (
        <AdminPanel status={"Admin"} style={{ padding: 0, margin: 0 }} />
      );
    } else if (this.state.menu_choice === "Mycart") {
      display = (
        <CartList
          cart_ID={this.state.cart_ID}
          logged_id={this.state.logged_id}
          login_status={this.state.login_status}
          handleCart={this.updateCart}
          style={{ padding: 0, margin: 0 }}
        />
      );
    }
    return (
      <div className="full-container">
        <header className="main_header">
          <div className="top_header">
            <p
              className="contact"
              style={{ marginLeft: "40px", marginTop: "10px" }}
            >
              Need Help or Assitance ? Contact us: custee@gmail.com / +212
              5XX-XXX-XXX
            </p>
            <div
              className="login_register"
              style={{ marginLeft: "400px", marginTop: "10px" }}
            >
              {this.state.login_status === null && (
                <AddCustomer
                  choice={"Login"}
                  changeLoginState={this.changeLoginState}
                />
              )}
              {this.state.login_status !== null && loggedout}
            </div>
            {this.state.login_status === null && (
              <p
                className="login_register"
                style={{
                  marginTop: "14px",
                  marginLeft: "5px",
                  marginRight: "5px",
                  fontSize: "10px"
                }}
              >
                or
              </p>
            )}
            <div className="login_register" style={{ marginTop: "10px" }}>
              {this.state.login_status === null && (
                <AddCustomer
                  choice={"Register"}
                  changeLoginState={this.changeLoginState}
                />
              )}
            </div>
            <div
              className="login_register"
              style={{ marginLeft: "400px", marginTop: "0px" }}
            ></div>
            {this.state.login_status !== "Admin" && (
              <div className={cart_classname}>
                <ShoppingCartIcon
                  data-tip="View Your Cart"
                  // style={{
                  //   color: "white",
                  //   marginLeft: "300px",
                  //   marginTop: "5px"
                  // }}
                  onClick={() => {
                    this.handleMenuClick("Mycart");
                  }}
                />
                <ReactTooltip place="left" position="float" type="info" />
              </div>
            )}
            {/* {this.state.login_status === null && (
              <div className="cart_icon">
                <ShoppingCartIcon
                  data-tip="View Your Cart"
                  // style={{
                  //   color: "white",
                  //   marginLeft: "300px",
                  //   marginTop: "5px"
                  // }}
                  onClick={() => {
                    this.handleMenuClick("Mycart");
                  }}
                />
                <ReactTooltip place="left" position="float" type="info" />
              </div>
            )} */}
          </div>
          <div className="row">
            <div className="content">
              <a className="logo" href="/Home">
                CUSTEE
              </a>

              <div className="mobile-toggle">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <nav className="navigation_bar">
                <ul>
                  <li>
                    <p
                      className="navigationitems"
                      onClick={() => {
                        this.handleMenuClick("Home");
                      }}
                    >
                      Home
                    </p>
                  </li>
                  <li>
                    <p
                      className="navigationitems"
                      onClick={() => {
                        this.handleMenuClick("Men");
                      }}
                    >
                      Men
                    </p>
                  </li>
                  <li>
                    <p
                      className="navigationitems"
                      onClick={() => {
                        this.handleMenuClick("Women");
                      }}
                    >
                      Women
                    </p>
                  </li>
                  {this.state.login_status === "Admin" && (
                    <li>
                      <p
                        className="navigationitems"
                        onClick={() => {
                          this.handleMenuClick("Adminpanel");
                        }}
                      >
                        Admin Panel
                      </p>
                    </li>
                  )}
                  {this.state.login_status === "Customer" && (
                    <li>
                      <p
                        className="navigationitems"
                        onClick={() => {
                          this.handleMenuClick("Myaccount");
                        }}
                      >
                        My Account
                      </p>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </header>
        {/* <Fragment> */}
        {/* <div style={style}>
            {this.state.login_status === null && loggedin}
            {this.state.login_status !== null && loggedout}
            {this.state.login_status !== "Admin" && (
              <ShoppingCartIcon
                onClick={() => {
                  this.handleMenuClick("Mycart");
                }}
              />
            )}
          </div>
          <NavigationMenu
            handleClick={this.handleMenuClick}
            loggedin={this.state.login_status}
          /> */}
        <div className="main_body">
          {/* <Paper style={{ background: "white" }}> */}
          {this.state.menu_choice === "Home" && display}
          {this.state.menu_choice === "Men" && display}
          {this.state.menu_choice === "Women" && display}
          {this.state.menu_choice === "Myaccount" && display}
          {this.state.menu_choice === "Mycart" && display}
          {this.state.menu_choice === "Adminpanel" && display}
          {/* </Paper> */}
        </div>
        <footer className="main_footer">
          <p className="copyright">Custee © 2019 All Rights Reserved</p>
        </footer>
        {/* <Footer />
        </Fragment> */}
      </div>
    );
  }
}

export default withRouter(Header);
