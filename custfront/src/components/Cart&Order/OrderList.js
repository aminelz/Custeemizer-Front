import React, { Component } from "react";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }

  async componentDidMount() {
    const url = "http://localhost:8080/Orders";
    await fetch(url)
      .then(async ans => await ans.json())
      .then(data => {
        this.setState({ orders: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const tableRows = this.state.orders.map((order, index) => (
      <tr key={index}>
        <td>{order.processed}</td>
        <td>{order.total_price}</td>
        <td>
          {order.creation_time[0]}/{order.creation_time[1]}/
          {order.creation_time[2]}
        </td>
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
                <th>Creation Date</th>
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
