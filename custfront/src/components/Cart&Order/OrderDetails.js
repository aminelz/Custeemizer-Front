import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  //   computetotal() {
  //     this.state.total = this.state.items;
  //   }

  async componentDidMount() {
    await this.fetchitems();
  }

  async fetchitems() {
    const url = `http://localhost:8080/Cart/${this.props.match.params.id}/items`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ items: data });
      })
      .catch(err => console.log(err));
    console.log(this.state.items);
  }
  render() {
    const tableRows = this.state.items.map((item, index) => (
      <tr key={index}>
        <td>{item.tshirt.name}</td>
        <td>
          <img src={item.tshirt.image_URL} alt="tshirt" width="45px" />
        </td>
        <td>{item.tshirt.price}</td>
        <td>{item.quantity}</td>
        <td>{item.tshirt.price * item.quantity}</td>
      </tr>
    ));
    return (
      <div>
        <div>
          <h1> Order Details</h1>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
              {tableRows}
            </tbody>
          </table>
          <h3>Total Price : {this.props.location.total}</h3>
        </div>
      </div>
    );
  }
}

export default withRouter(OrderDetails);
