import React, { Component } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from "@material-ui/core";
import ModifyOrder from "./ModifyOrder";
import OrderDetailsModal from "./OrderDetailsModal";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], modified: false, cart_ID: "" };
    this.handleStateChange = this.handleStateChange.bind(this);
    this.fetchorders = this.fetchorders.bind(this);
  }

  async componentDidMount() {
    await this.fetchorders();
    console.log("orders fetched");
  }

  async componentDidUpdate(prevState) {
    if (this.state.modified === true && this.props.status === "Admin") {
      await this.fetchorders()
        .then(this.setState({ modified: false }))
        .then(console.log("Update Trigerred !"));
    }
  }

  handleStateChange() {
    this.setState({ modified: true });
  }

  async fetchorders() {
    if (this.props.status === "Customer") {
      // const url = `http://localhost:8080/Orders/customer=${this.props.customer_ID}`;
      const url = `http://localhost:8080/api/customers/${this.props.customer_ID}/orders`;
      await fetch(url)
        .then(async ans => await ans.json())
        .then(data => {
          this.setState({ orders: data._embedded.orders });
        })
        .catch(err => console.log(err));
    } else if (this.props.status === "Admin") {
      const url = "http://localhost:8080/api/orders";
      await fetch(url)
        .then(async ans => await ans.json())
        .then(data => {
          this.setState({ orders: data._embedded.orders });
          console.log(this.state.orders);
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const adminrows = this.state.orders.map((order, index) => (
      <TableRow key={index}>
        <TableCell>{order.order_ID}</TableCell>
        <TableCell align="right">
          {order.creation_time !== undefined &&
            order.creation_time.substring(0, 10)}
        </TableCell>
        <TableCell align="right">{order.total_price} </TableCell>
        <TableCell align="right">{order.processed}</TableCell>
        <TableCell align="right" width="20px">
          <OrderDetailsModal order_ID={order.order_ID} />
        </TableCell>
        <TableCell align="right" width="20px">
          <ModifyOrder
            processed={order.processed}
            orderID={order.order_ID}
            track={this.handleStateChange}
            fetchorder={this.fetchorders}
          />
        </TableCell>
      </TableRow>
    ));
    const customerrows = this.state.orders.map((order, index) => (
      <TableRow key={index}>
        <TableCell>{order.order_ID}</TableCell>
        <TableCell align="right">
          {order.creation_time !== undefined &&
            order.creation_time.substring(0, 10)}
        </TableCell>
        <TableCell align="right">{order.total_price} </TableCell>
        <TableCell align="right">{order.processed}</TableCell>
        <TableCell>
          <OrderDetailsModal order_ID={order.order_ID} />
        </TableCell>
      </TableRow>
    ));

    return (
      <div>
        <div>
          <Table aria-label="simple table" title="Orders List">
            <TableHead style={{ fontStyle: "italic" }}>
              <TableRow>
                <TableCell> Order Number</TableCell>
                <TableCell align="center">Creation Date</TableCell>
                <TableCell align="center">Total Price (MAD)</TableCell>
                <TableCell align="center">Processing (?) </TableCell>
                <TableCell></TableCell>
                {this.props.status === "Admin" && <TableCell></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.status === "Customer" && customerrows}
              {this.props.status === "Admin" && adminrows}
              {/* <TableCell> </TableCell> */}
            </TableBody>
            {/* <TableBody> </TableBody> */}
          </Table>
        </div>
      </div>
    );
  }
}

export default OrderList;
