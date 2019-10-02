import React, { Component } from "react";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }

  componentDidMount() {
    const url = "http://localhost:8080/api/orders";
    fetch(url)
      .then(ans => ans.json())
      .then(data => {
        this.setState({ orders: data._embedded.orders });
      })
      .catch(err => console.log(err));
  }

  render() {
    const tableRows = this.state.orders.map((order, index) => (
      <tr key={index}>
        <td>{order.processed}</td>
        <td>{order.total_price}</td>
        <td>{order._links.cart.href}</td>
      </tr>
    ));
    return (
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Processing</th>
                <th>Price</th>
                <th>Cart link</th>
              </tr>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default OrderList;
