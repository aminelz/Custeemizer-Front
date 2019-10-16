import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from "@material-ui/core";

class CustomerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { customer: [], shipping: [], payment: [] };
  }

  async componentDidMount() {
    await this.fetchcustomer();
  }

  async fetchcustomer() {
    const url = `http://localhost:8080/Customer/${this.props.match.params.id}`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({
          customer: data,
          shipping: data.shipping,
          payment: data.payment
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const UserRows = (
      <TableRow>
        <TableCell align="left">
          {" "}
          {this.props.location.myuser.user.user_ID}{" "}
        </TableCell>
        <TableCell align="right"> {this.state.customer.customer_ID} </TableCell>
        <TableCell align="right">
          {" "}
          {this.props.location.myuser.user.first_name}{" "}
        </TableCell>
        <TableCell align="right">
          {" "}
          {this.props.location.myuser.user.last_name}{" "}
        </TableCell>
        <TableCell align="right">
          {" "}
          {this.props.location.myuser.user.email}{" "}
        </TableCell>
        <TableCell align="right">
          {" "}
          {this.props.location.myuser.user.password}{" "}
        </TableCell>
        <TableCell align="right"> {this.state.customer.birth_date} </TableCell>
        <TableCell align="right">
          {" "}
          {this.state.customer.phone_number}{" "}
        </TableCell>
      </TableRow>
    );
    const ShippingRows = (
      <TableRow>
        <TableCell align="center"> {this.state.shipping.street} </TableCell>
        <TableCell align="center"> {this.state.shipping.city} </TableCell>
        <TableCell align="center"> {this.state.shipping.zipcode} </TableCell>
        <TableCell align="center"> {this.state.shipping.country} </TableCell>
      </TableRow>
    );
    const PaymentRows = (
      <TableRow>
        <TableCell align="center"> {this.state.payment.cc_number} </TableCell>
        <TableCell align="center"> {this.state.payment.cc_type} </TableCell>
        <TableCell align="center">
          {" "}
          {this.state.payment.cc_firstname}{" "}
        </TableCell>
        <TableCell align="center"> {this.state.payment.cc_lastname} </TableCell>
        <TableCell align="center"> {this.state.payment.cc_address} </TableCell>
      </TableRow>
    );

    return (
      <div>
        <div>
          <h2 align="center"> Personal Information</h2>
          <Table>
            <TableHead style={{ fontStyle: "italic" }}>
              <TableCell align="left"> Customer_ID </TableCell>
              <TableCell align="center"> User_ID </TableCell>
              <TableCell align="center"> First Name </TableCell>
              <TableCell align="center"> Last Name </TableCell>
              <TableCell align="center"> Email </TableCell>
              <TableCell align="center"> Password </TableCell>
              <TableCell align="center"> Birth Date </TableCell>
              <TableCell align="center"> Phone </TableCell>
            </TableHead>
            <TableBody>{UserRows}</TableBody>
          </Table>
          <br />
          <h2 align="center"> Shipping Information</h2>
          <Table>
            <TableHead style={{ fontStyle: "italic" }}>
              <TableCell align="center">Street</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Zipcode</TableCell>
              <TableCell align="center">Country</TableCell>
            </TableHead>
            <TableBody>{ShippingRows}</TableBody>
          </Table>
          <br />
          <h2 align="center"> Payment Information</h2>
          <Table>
            <TableHead style={{ fontStyle: "italic" }}>
              <TableCell align="center">CreditCard Number</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Address</TableCell>
            </TableHead>
            <TableBody>{PaymentRows}</TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withRouter(CustomerInfo);
