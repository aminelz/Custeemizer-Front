import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SkyLight from "react-skylight";
import EditIcon from "@material-ui/icons/Edit";
import ModifyOrderModal from "./ModifyOrderModal";
class ModifyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { processed: "" };
  }

  async modifyorder(newvalue) {
    await fetch("http://localhost:8080/api/orders", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newvalue)
    })
      .then(res => this.props.fetchorders())
      .catch(err => console.error(err));
    window.location.reload();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    var modifiedOrder = {
      processed: this.state.processed
    };
    this.props.addAdmin(modifiedOrder);
    this.refs.addDialog.hide();
  };

  render() {
    return (
      <div style={{ alignItems: "left" }}>
        <SkyLight hideOnOverlayClicked ref="addDialog">
          <ModifyOrderModal
            old_processed={this.props.processed}
            modifyOrder={this.modifyorder()}
          />
        </SkyLight>
        <div>
          <EditIcon
            style={{ color: "darkblue" }}
            onClick={() => this.refs.addDialog.show()}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ModifyOrder);

{
  /* <h3>Modify Order Processing</h3>
          <form>
            <select>
              <option value="Order Received" onChange={this.handleChange}>
                Order Received
              </option>
              <option value="Pending Confirmation" onChange={this.handleChange}>
                Pending Confirmation
              </option>
              <option value="Order Confirmed" onChange={this.handleChange}>
                Order Confirmed
              </option>
              <option value="Pending Payment" onChange={this.handleChange}>
                Pending Payment
              </option>
              <option value="Preparing Order" onChange={this.handleChange}>
                Preparing Order
              </option>
              <option value="Pending Shipment" onChange={this.handleChange}>
                Pending Shipment
              </option>
              <option value="Shipped" onChange={this.handleChange}>
                Shipped
              </option>
              <option value="Delivered" onChange={this.handleChange}>
                Delivered
              </option>
            </select>
            <br />
            <DoneIcon onClick={this.handleSubmit} />
          </form> */
}
