import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SkyLight from "react-skylight";

class AddAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      admin: true
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    var bcrypt = require("bcryptjs");
    var hash = bcrypt.hashSync(this.state.password, 10);
    var newAdmin = {
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      email: this.state.email,
      password: hash,
      admin: true
    };
    this.props.addAdmin(newAdmin);
    this.refs.addDialog.hide();
  };

  render() {
    return (
      <div>
        <SkyLight hideOnOverlayClicked ref="addDialog">
          <h3>New Admin</h3>
          <form>
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              onChange={this.handleChange}
            />
            <br />
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              onChange={this.handleChange}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <select>
              <option value="true" onChange={this.handleChange}>
                Admin
              </option>
            </select>
            <br />
            <button onClick={this.handleSubmit}>Save</button>
          </form>
        </SkyLight>
        <div>
          <button
            style={{ margin: "10px" }}
            onClick={() => this.refs.addDialog.show()}
          >
            Add Admin
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(AddAdmin);
