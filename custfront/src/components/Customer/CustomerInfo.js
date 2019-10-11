import React, { Component } from "react";
import { withRouter } from "react-router-dom";

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
    console.log(this.state.shipping);
  }
  render() {
    const UserRows = (
      <tr>
        <td>{this.props.location.myuser.user.user_ID}</td>
        <td>{this.state.customer.customer_ID}</td>
        <td>{this.props.location.myuser.user.first_name}</td>
        <td>{this.props.location.myuser.user.last_name}</td>
        <td>{this.props.location.myuser.user.email}</td>
        <td>{this.props.location.myuser.user.password}</td>
        <td>{this.state.customer.birth_date}</td>
        <td>{this.state.customer.phone_number}</td>
      </tr>
    );
    const ShippingRows = (
      <tr>
        <td>{this.state.shipping.street}</td>
        <td>{this.state.shipping.city}</td>
        <td>{this.state.shipping.zipcode}</td>
        <td>{this.state.shipping.country}</td>
      </tr>
    );
    const PaymentRows = (
      <tr>
        <td>{this.state.payment.cc_number}</td>
        <td>{this.state.payment.cc_type}</td>
        <td>{this.state.payment.cc_firstname}</td>
        <td>{this.state.payment.cc_lastname}</td>
        <td>{this.state.payment.cc_address}</td>
      </tr>
    );

    return (
      <div>
        <div>
          <h2> Personal Information</h2>
          <table>
            <tbody>
              <tr>
                <th>Customer_ID</th>
                <th>User_ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Birth Date</th>
                <th>Phone</th>
              </tr>
              {UserRows}
            </tbody>
          </table>
          <br />
          <h2> Shipping Information</h2>
          <table>
            <tbody>
              <tr>
                <th>Street</th>
                <th>City</th>
                <th>Zipcode</th>
                <th>Country</th>
              </tr>
              {ShippingRows}
            </tbody>
          </table>
          <br />
          <h2> Payment Information</h2>
          <table>
            <tbody>
              <tr>
                <th>CreditCard Number</th>
                <th>Type</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
              </tr>
              {PaymentRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(CustomerInfo);
