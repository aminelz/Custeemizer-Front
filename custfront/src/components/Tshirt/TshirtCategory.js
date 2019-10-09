import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class TshirtCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { tshirts: [] };
  }
  async componentDidMount() {
    const url = `http://localhost:8080/Product/Tshirt/Sex/${this.props.match.params.sex}`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ tshirts: data });
      })
      .catch(err => console.error(err));
  }

  async componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.match.params.sex !== this.props.match.params.sex) {
      this.componentDidMount();
    }
  }

  render() {
    const { tshirts } = this.state;
    const tableRows = tshirts.map((tshirt, index) => (
      <tr key={index}>
        <td>{tshirt.name}</td>
        <td>{tshirt.sex}</td>
        <td>{tshirt.color}</td>
        <td>{tshirt.size}</td>
        <td>{tshirt.price} DHS</td>
        <td>{tshirt.description}</td>
        <td>
          <Link to={"/Tshirt/" + tshirt.tshirt_ID}>{tshirt.tshirt_ID}</Link>
        </td>
        <td>
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

export default withRouter(TshirtCategory);
