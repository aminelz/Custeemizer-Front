import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//Pages
import CartPage from "../pages/Cart";

const style = {
  backgroundColor: "lightblue",
  margin: "0px",
  padding: "0"
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };
    // const total = null;
  }

  componentDidMount() {
    const url = "http://localhost:8080/Cart/16";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ cart: data });
      })
      .catch(err => console.log(err));
    //this.setState({ total: this.state.cart.total });
  }

  render() {
    return (
      <div style={style}>
        <p>
          Custee
          <span style={{ paddingLeft: 850 }}>
            <Router>
              <Link to="/Cart">
                <img
                  src="data:image/png;base64,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"
                  alt="cart logo"
                  width="30px"
                  style={{ paddingRight: 20 }}
                />
              </Link>
              <Route path="/Cart" component={CartPage}></Route>
            </Router>
            Total Price : {this.state.cart.total} MAD{" "}
          </span>
        </p>
      </div>
    );
  }
}

export default Header;
