import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Tshirtlist extends Component {
  constructor(props) {
    super(props);
    this.state = { tshirts: [] };
  }
  async componentDidMount() {
    const url = "http://localhost:8080/Product/Tshirt";
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ tshirts: data });
      })
      .catch(err => console.error(err));
    console.log(toString(this.state.customized));
  }

  //   customizable(x) {
  //     if ((x = false)) {
  //       return "No";
  //     } else if ((x = true)) {
  //       return "No";
  //     }
  //   }

  render() {
    const tableRows = this.state.tshirts.map((tshirt, index) => (
      <tr key={index}>
        <td>{tshirt.name}</td>
        <td>{tshirt.sex}</td>
        <td>{tshirt.color}</td>
        <td>{tshirt.size}</td>
        <td>{tshirt.price} DHS</td>
        <td>{tshirt.description}</td>
        <td>{tshirt.tshirt_ID}</td>
        <td>
          {" "}
          <img src={tshirt.image_URL} width="100px" alt="Tshirt" />
        </td>
      </tr>
    ));

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

export default withRouter(Tshirtlist);
