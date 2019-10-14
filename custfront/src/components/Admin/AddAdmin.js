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
      admin: true,
      response: null,
      errors: []
    };
  }

  async fetchemail() {
    const url = `http://localhost:8080/User/${this.state.email}/email`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ response: data.response });
      })
      .catch(err => console.log(err));
    // console.log(this.state.response);
  }

  async validateform() {
    const error = [];
    console.log(this.state.response);
    await this.fetchemail();
    console.log(this.state.response);
    if (this.state.response === true) {
      error.push(
        "Email already in use. Please use another email or log in to your existing account!"
      );
    }
    return error;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const error = this.validateform();
    if (error.length > 0) {
      this.setState({ errors: error });
      return;
    }

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
    // this.refs.addDialog.hide();
  };

  render() {
    return (
      <div>
        <SkyLight hideOnOverlayClicked ref="addDialog">
          <h3>New Admin</h3>
          <form>
            {this.state.errors.map(error => (
              <p key={error}>Error: {error}</p>
            ))}
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
