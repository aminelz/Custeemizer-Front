import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SkyLight from "react-skylight";
import SignUpPage from "../../Shared Admin&Customer/pages/SignUpPage";

var myBigGreenDialog = {
  backgroundColor: "#00897B",
  color: "#ffffff",
  width: "70%",
  height: "650px",
  marginTop: "-300px",
  marginLeft: "-35%"
};

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      admin: true,
      birth_date: "",
      phone_number: "",
      cc_number: "",
      cc_firstname: "",
      cc_lastname: "",
      cc_type: "",
      cc_address: "",
      street: "",
      zipcode: "",
      city: "",
      country: "",
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
  };

  render() {
    return (
      <div>
        <SkyLight
          dialogStyles={myBigGreenDialog}
          hideOnOverlayClicked
          ref="addDialog"
        >
          <SignUpPage />
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

export default withRouter(AddCustomer);
