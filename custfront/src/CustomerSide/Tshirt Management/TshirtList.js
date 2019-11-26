import React, { Component } from "react";
// import TshirtDisplay from "../../TRASH/TshirtDisplay";
// import Flexbox from "flexbox-react";
import "./TshirtDisplay.css";
import TshirtQuickView from "./TshirtQuickView";

class Tshirtlist extends Component {
  constructor(props) {
    super(props);
    this.state = { tshirts: [] };
  }
  async componentDidMount() {
    await this.fetchtshirt();
  }

  async fetchtshirt() {
    const menurl = "http://localhost:8080/Product/Tshirt/Sex/Men";
    const allurl = "http://localhost:8080/Product/Tshirt";
    const womenurl = "http://localhost:8080/Product/Tshirt/Sex/Women";
    if (this.props.sex === "All") {
      await fetch(allurl)
        .then(async res => await res.json())
        .then(data => {
          this.setState({ tshirts: data });
        })
        .catch(err => console.error(err));
    } else if (this.props.sex === "Men") {
      await fetch(menurl)
        .then(async res => await res.json())
        .then(data => {
          this.setState({ tshirts: data });
        })
        .catch(err => console.error(err));
    } else if (this.props.sex === "Women") {
      await fetch(womenurl)
        .then(async res => await res.json())
        .then(data => {
          this.setState({ tshirts: data });
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    // const tableRows = this.state.tshirts.map((tshirt, index) => (
    //   <tr key={index}>
    //     <td>{tshirt.name}</td>
    //     <td>{tshirt.sex}</td>
    //     <td>{tshirt.color}</td>
    //     <td>{tshirt.size}</td>
    //     <td>{tshirt.price} DHS</td>
    //     <td>{tshirt.description}</td>
    //     {/* <td>
    //       <Link to={"/Tshirt/" + tshirt.tshirt_ID}>{tshirt.tshirt_ID}</Link>
    //     </td> */}
    //     <td>
    //       <img src={tshirt.image_URL} width="100px" alt="Tshirt" />
    //     </td>
    //   </tr>
    // ));

    // const attributes = [
    //   { label: "Color", value: "Red" },
    //   { label: "Size", value: "Medium" }
    // ];

    // const productItem = this.state.tshirts.map((tshirt.index) => )
    const productgrid = this.state.tshirts.map((tshirt, index) => (
      <div className="shelf-item" data-sku="12064273040195392" key={index}>
        <div className="shelf-item__thumb">
          <img src={tshirt.image_URL} alt="Cat Tee Black T-Shirt" />
        </div>
        <p className="shelf-item__title">{tshirt.name}</p>
        <div className="shelf-item__price">
          <div className="val">
            <b> {tshirt.price}</b> <small>MAD</small>
          </div>
        </div>
        <div className="shelf-item__buy-btn">
          <TshirtQuickView
            tshirt={tshirt}
            cart_ID={this.props.cart_ID}
            // updateCart={this.props.updateCart}
          />
        </div>
      </div>
    ));

    return (
      <div>
        <div className="shelf-container">{productgrid}</div>
      </div>
    );
  }
}

export default Tshirtlist;
