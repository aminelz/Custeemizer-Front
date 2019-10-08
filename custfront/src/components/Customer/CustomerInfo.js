import React, { Component } from "react";

class CustomerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { customer: {} };
  }

  async componentDidMount() {
    const url = `http://localhost:8080/Customer/${this.props.match.params.id}`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ customer: data });
      })
      .catch(err => console.log(err));
  }
  render() {
    const tableRows = (
      <tr>
        <td>{this.state.customer.birth_date}</td>
        <td>{this.state.customer.customer_id}</td>
        <td>{this.state.customer.phone_number}</td>
        {/* <td>{this.state.customer.shipping.city}</td>
        <td>{this.state.customer.shipping.address}</td> */}
      </tr>
    );

    return (
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Birth Date</th>
                <th>Customer ID</th>
                <th>Phone</th>
                <th>City</th>
                <th>Address</th>
              </tr>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CustomerInfo;
