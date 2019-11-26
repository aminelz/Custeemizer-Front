import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SkyLight from "react-skylight";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel, MenuItem } from "@material-ui/core";
import swal from "sweetalert";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import Modal from "@material-ui/core/Modal";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import "./TshirtQuickView.css";

class TshirtQuickView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      quantity: 1,
      size: null
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClose() {
    this.setState({ open: false, quantity: 1, size: null });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleIncrement() {
    this.setState({ quantity: this.state.quantity + 1 });
  }

  handleDecrement() {
    if (this.state.quantity - 1 === 0) {
      swal("Oops", "You should at least add one product !", "error");
    } else {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  }

  handleChange = async e => {
    this.setState({ size: e.target.value });
  };

  //   async createNewCart() {
  //     const url = "http://localhost:8080/NewCart";
  //     await fetch(url)
  //       .then(async ans => await ans.json())
  //       .then(data => {
  //         console.log("returned cart id: ", data.cart_ID);
  //         this.props.updateCart(data.cart_ID);
  //         this.setState({ cart_id: data.cart_ID });
  //       })
  //       .catch(err => console.log(err));
  //   }

  async addToCart() {
    // if (this.state.cart_ID === 0) {
    //   console.log("before creation cart id: ", this.state.cart_ID);
    //   await this.createNewCart().then(
    //     console.log("new cart_id: ", this.state.cart_ID)
    //   );
    // }
    if (this.state.size === null) {
      swal("Oops", "You forgot to select a size for your Tshirt !", "error");
    } else {
      const url = "http://localhost:8080/NewCartItem";
      const newitem = {
        tshirt_ID: this.props.tshirt.tshirt_ID,
        quantity: this.state.quantity,
        size: this.state.size,
        cart_ID: this.props.cart_ID
      };
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newitem)
      })
        .then(res => this.handleClose())
        .catch(err => console.error(err));

      swal(
        "Item Added to cart !",
        "The item has been succesfully added to your cart ! Click on your cart to proceed to checkout.",
        "success"
      );
    }
  }

  render(props) {
    return (
      <div>
        <p onClick={this.handleOpen}> Quick View </p>
        {/* <SkyLight hideOnOverlayClicked ref="addDialog"> */}
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          style={
            {
              // width: "600px"
            }
          }
        >
          <div className="modal" data-status="true">
            <div
              className="modal-left"
              style={{
                backgroundImage: 'url("' + this.props.tshirt.image_URL + '")'
                // backgroundPosition: "center no-repeat"
              }}
            >
              <span className="price-tag">{this.props.tshirt.price} MAD</span>
              {/* <img
                className="product_image"
                src={this.props.tshirt.image_url}
                alt="Tshirt"
              /> */}
            </div>
            <div className="modal-right">
              <h2 style={{ color: "black" }}>{this.props.tshirt.name}</h2>
              <p>{this.props.tshirt.description}</p>
              <p> Sex : {this.props.tshirt.sex}</p>
              <div style={{ marginLeft: "80px", marginBottom: "5px" }}>
                <br />
                <button
                  className="button"
                  onClick={() => {
                    this.handleDecrement();
                  }}
                  style={{ color: "white", backgroundColor: "red" }}
                >
                  -
                </button>
                <input
                  type="number"
                  className="input"
                  value={this.state.quantity}
                  min="1"
                  readOnly
                  style={{ width: "30%" }}
                />
                <button
                  className="button"
                  onClick={() => {
                    this.handleIncrement();
                  }}
                  style={{ color: "white", backgroundColor: "green" }}
                >
                  +
                </button>
              </div>
              <div>
                <select
                  value={this.state.size}
                  onChange={e => this.handleChange(e)}
                >
                  <option value={null}></option>
                  <option value={"XS"}>XS</option>
                  <option value={"S"}>S</option>
                  <option value={"M"}>M</option>
                  <option value={"L"}>L</option>
                  <option value={"XL"}>XL</option>
                  <option value={"XXL"}>XXL</option>
                </select>
              </div>
              <div
                className="shelf-item__buy-btn"
                style={{ marginTop: "25px", color: "white" }}
              >
                <Button
                  onClick={() => {
                    this.addToCart();
                  }}
                >
                  <span style={{ color: "white" }}>
                    Add To Cart <AddShoppingCartIcon />
                  </span>
                </Button>
              </div>

              {/* <button className="close">
                <span className="fa fa-close"></span>
              </button> */}
            </div>
          </div>
        </Modal>
        {/* </SkyLight>
        <div>
          <p onClick={() => this.refs.addDialog.show()}> Quick View</p>
        </div> */}
      </div>
    );
  }
}

export default TshirtQuickView;
