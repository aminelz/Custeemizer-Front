import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from "@material-ui/core";
import ModifyOrder from "./ModifyOrder";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }

  async componentDidMount() {
    await this.fetchorders();
  }

  async fetchorders() {
    const url = "http://localhost:8080/Orders";
    await fetch(url)
      .then(async ans => await ans.json())
      .then(data => {
        this.setState({ orders: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    var count = 0;
    const rows = this.state.orders.map((order, index) => (
      <TableRow key={index}>
        <TableCell>{count + 1}</TableCell>
        <TableCell align="right">
          {order.creation_time[0]}/{order.creation_time[1]}/
          {order.creation_time[2]}
        </TableCell>
        <TableCell align="right">{order.total_price} </TableCell>
        <TableCell align="right">{order.processed}</TableCell>
        <TableCell align="right" width="20px">
          <Link
            to={{
              pathname: "/Order/" + order.mycart.cart_ID,
              total: order.total_price
            }}
            style={{ color: "green" }}
          >
            <VisibilityIcon />
          </Link>
        </TableCell>
        <TableCell align="right" width="20px">
          {/* <EditIcon
            style={{ color: "darkblue" }}
            onClick={() => this.handleEdit()}
          /> */}
          <ModifyOrder
            processed={"Pending Confirmation"}
            fetchorders={this.fetchorders}
          />
        </TableCell>
      </TableRow>
    ));

    return (
      <div>
        <div>
          <Table aria-label="simple table" title="Orders List">
            <TableHead style={{ fontStyle: "italic" }}>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell align="center">Creation Date</TableCell>
                <TableCell align="center">Total Price (MAD)</TableCell>
                <TableCell align="center">Processing (?) </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withRouter(OrderList);
