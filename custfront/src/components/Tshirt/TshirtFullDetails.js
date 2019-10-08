import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class TshirtFullDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { tshirt: [] };
  }
  async componentDidMount() {
    const url = `http://localhost:8080/Product/Tshirt/${this.props.match.params.id}`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ tshirt: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    const tableRows = (
      <tr>
        <td>{this.state.tshirt.name}</td>
        <td>{this.state.tshirt.sex}</td>
        <td>{this.state.tshirt.color}</td>
        <td>{this.state.tshirt.size}</td>
        <td>{this.state.tshirt.price} DHS</td>
        <td>{this.state.tshirt.description}</td>
        <td>{this.state.tshirt.tshirt_ID}</td>
        <td>
          <img src={this.state.tshirt.image_URL} width="100px" alt="Tshirt" />
        </td>
      </tr>
    );

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Sex</th>
              <th>Color</th>
              <th>Size</th>
              <th>Price</th>
              <th>Description</th>
              <th>Tshirt_ID</th>
            </tr>
            {tableRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(TshirtFullDetails);
