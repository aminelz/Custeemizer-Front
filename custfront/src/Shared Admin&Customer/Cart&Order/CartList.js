import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import CheckoutModal from "./CheckoutModal";
import swal from "sweetalert";

class Cartlist extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], change: false, total_price: 0 };
    this.removeItem = this.removeItem.bind(this);
  }

  //   computetotal() {
  //     this.state.total = this.state.items;
  //   }

  async componentDidMount() {
    await this.fetchcart();
  }

  async componentDidUpdate() {
    if (this.state.change === true) {
      await this.fetchcart().then(this.setState({ change: false }));
    }
  }

  async fetchcart() {
    const url = `http://localhost:8080/Cart/${this.props.cart_ID}/items`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ items: data });
        this.setState({
          total_price: this.state.items.reduce(
            (prev, next) => prev + next.quantity * next.tshirt.price,
            0
          )
        });
      })
      .catch(err => console.log(err));
  }

  async removeItem(x) {
    const url = `http://localhost:8080/CartItem/${x}/Delete`;
    await fetch(url).then(res => {
      // this.fetchcart();
      this.setState({ change: true });
    });
  }

  async incrementItem(id, oldquantity) {
    const url = `http://localhost:8080/api/cartItems/${id}`;
    await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ quantity: oldquantity + 1 })
    })
      .then(res => this.setState({ change: true }))
      .catch(err => console.log(err));
  }
  async decrementItem(id, oldquantity) {
    if (oldquantity === 1) {
      this.removeItem(id);
    } else {
      const url = `http://localhost:8080/api/cartItems/${id}`;
      await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ quantity: oldquantity - 1 })
      })
        .then(res => this.setState({ change: true }))
        .catch(err => console.log(err));
    }
  }

  render() {
    const count = this.state.items.length;
    const tableRows = this.state.items.map((item, index) => (
      <tr key={index}>
        <td>{item.tshirt.name}</td>
        <td>
          <img src={item.tshirt.image_URL} alt="tshirt" width="45px" />
        </td>
        <td>{item.tshirt.price}</td>
        <td>
          <input
            type="number"
            className="input"
            value={item.quantity}
            min="1"
            readOnly
            style={{ width: "50%" }}
          />
          <br />
          <button
            className="button"
            onClick={() => {
              this.incrementItem(item.item_ID, item.quantity);
            }}
          >
            +
          </button>
          <button
            className="button"
            onClick={() => {
              this.decrementItem(item.item_ID, item.quantity);
            }}
          >
            -
          </button>
        </td>
        <td>{item.tshirt.price * item.quantity}</td>
        <td>
          <button
            className="button"
            onClick={() => {
              this.removeItem(item.item_ID);
            }}
          >
            Remove Item
            <RemoveShoppingCartIcon />
          </button>
        </td>
      </tr>
    ));

    const empty = (
      <p>
        <b>Your Cart is empty ! </b>
      </p>
    );
    return (
      <div style={{ margin: 0, padding: 0 }}>
        <div style={{ margin: 0, padding: 0 }}>
          <table style={{ margin: 0, padding: 0 }}>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
              {count > 0 && tableRows}
              {count === 0 && empty}
            </tbody>
          </table>
          {count !== 0 && (
            <p style={{ marginLeft: "20%" }}>
              Total Price : {this.state.total_price}
            </p>
          )}
          {this.props.login_status === null && (
            <p> Please Login or Register to Proceed to Checkout</p>
          )}
          {this.props.login_status === "Customer" && count !== 0 ? (
            <CheckoutModal
              user_ID={this.props.logged_id}
              cart_ID={this.props.cart_ID}
              items={this.state.items}
              total={this.state.total_price}
              handleCart={this.props.handleCart}
            />
          ) : (
            <br></br>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Cartlist);
