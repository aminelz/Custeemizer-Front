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
  }

  async validateform() {
    const error = [];
    await this.fetchemail();
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

  handleSubmit = async event => {
    event.preventDefault();
    const error = await this.validateform();
    if (error.length > 0) {
      this.setState({ errors: error });
      return;
    } else {
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
    }
    this.props.track();
  };

  render() {
    return (
      <div>
        <SkyLight hideOnOverlayClicked ref="addDialog">
          <h3>New Admin</h3>
          <form>
            {this.state.errors.map(error => (
              <p syle={{ color: "red" }} key={error}>
                Error: {error}
              </p>
            ))}
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              required
              onChange={this.handleChange}
            />
            <br />
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              required
              onChange={this.handleChange}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              onChange={this.handleChange}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
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
