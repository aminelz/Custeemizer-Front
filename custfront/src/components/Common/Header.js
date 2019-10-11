import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import CartIcon from "../../ressources/Carticon.png";
import { withRouter } from "react-router-dom";

const style = {
  backgroundColor: "rgb(0,0,0)",
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
    this.state = { cart: [] };
    // const total = null;
  }

  async componentDidMount() {
    await this.fetchcart();
  }

  async fetchcart() {
    const url = "http://localhost:8080/Cart/16";
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ cart: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Fragment>
        <div style={style}>
          <p style={textstyle}>
            <img
              src={CartIcon}
              width="25px"
              alt="cart logo"
              style={{
                marginRight: "5px",
                color: "white"
              }}
            />
            <Link to="/Cart" style={{ color: "white" }}>
              Total Price : {this.state.cart.total} MAD{" "}
            </Link>
          </p>
        </div>
        <Nav />
      </Fragment>
    );
  }
}

export default withRouter(Header);
