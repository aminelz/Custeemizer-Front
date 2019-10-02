import React, { Component } from "react";

class Cartlist extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  //   computetotal() {
  //     this.state.total = this.state.items;
  //   }

  componentDidMount() {
    const url = "http://localhost:8080/Cart/16/items";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ items: data });
      })
      .catch(err => console.log(err));
  }
  render() {
    const tableRows = this.state.items.map((item, index) => (
      <tr key={index}>
        <td>{item.tshirt.name}</td>
        <td>
          <img src={item.tshirt.image_URL} alt="tshirt" width="45px" />
        </td>
        <td>{item.tshirt.price}</td>
        <td>{item.quantity}</td>
        <td>{item.tshirt.price * item.quantity}</td>
      </tr>
    ));
    return (
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Cartlist;
