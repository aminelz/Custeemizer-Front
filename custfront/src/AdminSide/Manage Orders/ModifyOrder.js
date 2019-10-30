import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SkyLight from "react-skylight";
import EditIcon from "@material-ui/icons/Edit";
import ModifyOrderModal from "./ModifyOrderModal";

class ModifyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { processed: "", orderID: props.orderID };
  }

  async modifyorder(order, newvalue) {
    await fetch(`http://localhost:8080/api/orders/${order}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newvalue)
    })
      .then(res => this.fetchorders)
      .catch(err => console.error(err));
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

  closemodal() {
    this.refs.addDialog.hide();
    window.location.reload();
  }

  render() {
    return (
      <div style={{ alignItems: "left" }}>
        <SkyLight hideOnOverlayClicked ref="addDialog">
          <ModifyOrderModal
            modifyOrder={this.modifyorder}
            old_processed={this.props.processed}
            orderID={this.props.orderID}
            closemodal={this.closemodal.bind(this)}
            refs={this.refs}
            track={this.props.track}
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
