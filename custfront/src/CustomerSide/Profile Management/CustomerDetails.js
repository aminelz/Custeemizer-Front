import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import "date-fns";
import { MenuItem, MenuList, Button, Avatar } from "@material-ui/core";
import SaveTwoToneIcon from "@material-ui/icons/SaveTwoTone";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import ModifyPersonalInfoModal from "./ModifyPersonalInfoModal";
import ModifyPaymentInfoModal from "./ModifyPaymentInfoModal";
import ModifyShippingInfoModal from "./ModifyShippingInfoModal";
import swal from "sweetalert";

const styles = {
  Paper: {
    padding: "10px",
    margin: "10px"
  },
  Grid: {
    padding: "10px",
    margin: "10px"
  },
  Typography: {
    alignItems: "center",
    margin: 10
  },
  TextField: {
    padding: "10px",
    marginTop: "5px",
    marginBottom: "25px",
    marginRight: "25px",
    marginLeft: "25px",
    largetext: {
      width: "75%",
      padding: "10px",
      marginTop: "5px",
      marginBottom: "25px",
      marginRight: "25px",
      marginLeft: "25px"
    }
  },
  Menu: {
    padding: "10px",
    marginTop: "70px",
    width: 120,
    backgroundColor: "#54A391"
  },
  MenuItem: {
    backgroundColor: "#54A391",
    color: "white",
    marginBottom: 2,
    outlineColor: "white",
    outlineWidth: "1px"
  }
};
const useStyles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
});

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: [],
      shipping: [],
      payment: [],
      user: [],
      disabled: false,
      choice: "Home",
      current_password: "",
      new_password: "",
      new_password2: ""
    };
  }
  handleClick(x) {
    this.setState({ choice: x });
  }

  async componentDidMount() {
    await this.fetchcustomer(4);
    await this.fetchuser(4);
  }

  async fetchcustomer(id) {
    const url = `http://localhost:8080/Customer/${id}`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({
          customer: data,
          shipping: data.shipping,
          payment: data.payment
        });
      })
      .catch(err => console.log(err));
  }
  async fetchuser(id) {
    const url = `http://localhost:8080/UserCustomer/${id}`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ user: data[0] });
      })
      .catch(err => console.log(err));
  }

  emptyfields() {
    this.setState({
      current_password: "",
      new_password: "",
      new_password2: ""
    });
  }

  async validatepassword() {
    var errors = null;
    if (
      this.state.current_password.length === 0 ||
      this.state.new_password.length === 0 ||
      this.state.new_password2.length === 0
    ) {
      errors = "You have to fill all three fields to change your password !";
      this.emptyfields();
      return errors;
    } else {
      if (
        this.state.new_password.length < 6 ||
        this.state.new_password2.length < 6
      ) {
        errors = "Your password should at least be 6 characters long";
        this.emptyfields();
        return errors;
      } else {
        if (this.state.new_password !== this.state.new_password2) {
          errors =
            "New passwords not matching ! Please re-enter your new password";
          this.emptyfields();
          return errors;
        } else {
          var bcrypt = require("bcryptjs");
          bcrypt.compare(
            this.state.current_password,
            this.state.user[5],
            (err, res) => {
              if (res === false) {
                swal(
                  "Oops!",
                  "The password your entered does not match with your old saved password !",
                  "error"
                ).then(this.emptyfields());
              }
            }
          );
          return errors;
        }
      }
    }
  }

  async patchpassword(id, newvalue) {
    await fetch(`http://localhost:8080/api/endUsers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newvalue)
    })
      .then(res => this.props.fetchuser())
      .catch(err => swal("Error Updating", err, "error"));
  }

  async modifypassword() {
    var error = await this.validatepassword();
    if (error !== null) {
      swal("Oops!", error, "error");
    } else {
      var bcrypt = require("bcryptjs");
      var hash = bcrypt.hashSync(this.state.new_password, 10);
      console.log(hash, this.state.user[0]);
      var modifiedpassword = {
        password: hash
      };
      this.patchpassword(this.state.user[0], modifiedpassword);
      swal(
        "Successfully Modified",
        "Your payment information has been updated !",
        "success"
      ).then(function() {
        window.location.reload();
      });
    }
  }

  render() {
    var dis = this.state.disabled;
    const { classes } = this.props;
    var choice;

    const home = (
      <Grid container style={styles.Grid}>
        <Grid item sm={6} style={styles.Grid}>
          <Paper style={styles.Paper}>
            <Grid container>
              <Grid item sm={11}>
                <Typography
                  variant="subtitle1"
                  style={{ marginBottom: "20px" }}
                >
                  Account Management
                </Typography>
              </Grid>
            </Grid>
            <p>
              {" "}
              Welcome on your account management portal, navigate using the menu
              to view and modify your personal information
            </p>
          </Paper>
        </Grid>
      </Grid>
    );
    const account = (
      <Grid container style={styles.Grid}>
        <Grid item sm={6} style={styles.Grid}>
          <Paper style={styles.Paper}>
            <Grid container direction="row">
              <Grid item sm={11}>
                <Typography
                  variant="subtitle1"
                  style={{ marginBottom: "20px" }}
                >
                  Account Information
                </Typography>
              </Grid>
              <Grid item sm={1}>
                <ModifyPersonalInfoModal
                  user={this.state.user}
                  customer={this.state.customer}
                  fetchcustomer={this.fetchcustomer}
                />
              </Grid>
            </Grid>
            <form>
              <Grid container direction="row">
                <Grid item>
                  <TextField
                    label="First Name"
                    // style={styles.TextField}
                    id="t_firstname"
                    className={classes.textField}
                    value={"" + this.state.user[3]}
                    margin="normal"
                    disabled={dis}
                    variant="outlined"
                  />
                  <TextField
                    id="t_lastname"
                    // style={styles.TextField}
                    label="Last Name"
                    className={classes.textField}
                    value={"" + this.state.user[4]}
                    margin="normal"
                    disabled={dis}
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="t_email"
                    // style={styles.TextField}
                    label="Email"
                    className={classes.textField}
                    value={"" + this.state.user[2]}
                    margin="normal"
                    disabled={dis}
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="t_date"
                    // style={styles.TextField}
                    label="Birth Date"
                    className={classes.textField}
                    value={"" + this.state.customer.birth_date}
                    margin="normal"
                    disabled={dis}
                    variant="outlined"
                  />
                  <TextField
                    id="t_phone"
                    // style={styles.TextField}
                    label="Phone Number"
                    className={classes.textField}
                    value={"" + this.state.customer.phone_number}
                    margin="normal"
                    disabled={dis}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );

    const password = (
      <Grid container style={styles.Grid}>
        <Grid item sm={6} style={styles.Grid}>
          <Paper style={styles.Paper}>
            <Typography variant="subtitle1" style={{ marginBottom: "20px" }}>
              Password
              <span style={{ fontStyle: "italic" }}>
                (Fill all fields to modify password)
              </span>
            </Typography>
            <form>
              <Grid container direction="row">
                <Grid item>
                  <TextField
                    id="t_oldpassword"
                    label="Old Password"
                    // style={styles.TextField}
                    margin="normal"
                    type="password"
                    disabled={dis}
                    value={this.state.current_password}
                    placeholder={"Enter old password"}
                    variant="outlined"
                    className={classes.textField}
                    onChange={e =>
                      this.setState({ current_password: e.target.value })
                    }
                  />
                </Grid>
                <Grid item sm={6}></Grid>
                <Grid item>
                  <TextField
                    id="t_newpassword"
                    // style={styles.TextField}
                    label="New Password"
                    margin="normal"
                    type="password"
                    disabled={dis}
                    value={this.state.new_password}
                    placeholder={"Enter new password"}
                    variant="outlined"
                    className={classes.textField}
                    onChange={e =>
                      this.setState({ new_password: e.target.value })
                    }
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="t_newpassword2"
                    // style={styles.TextField}
                    label="New Password²"
                    type="password"
                    margin="normal"
                    disabled={dis}
                    value={this.state.new_password2}
                    placeholder={"Re-enter new password"}
                    variant="outlined"
                    className={classes.textField}
                    onChange={e =>
                      this.setState({ new_password2: e.target.value })
                    }
                  />
                  <Grid item>
                    <Grid container>
                      <Grid item sm={11}></Grid>
                      <Grid item sm={1}>
                        <Button onClick={this.modifypassword.bind(this)}>
                          <Avatar className={classes.avatar}>
                            <SaveTwoToneIcon />
                          </Avatar>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
    const shipping = (
      <Grid container style={styles.Grid}>
        <Grid item sm={6} style={styles.Grid}>
          <Paper style={styles.Paper}>
            <Grid container direction="row">
              <Grid item sm={11}>
                <Typography
                  variant="subtitle1"
                  style={{ marginBottom: "20px" }}
                >
                  Shipping Information
                </Typography>
              </Grid>
              <Grid item sm={1}>
                <ModifyShippingInfoModal
                  shipping={this.state.shipping}
                  fetchcustomer={this.fetchcustomer}
                />
              </Grid>
            </Grid>
            <form>
              <Grid container direction="row">
                <Grid item sm={12}>
                  <TextField
                    id="t_street"
                    label="Street"
                    // style={styles.TextField.largetext}
                    style={{ width: "78%" }}
                    className={classes.textField}
                    value={"" + this.state.shipping.street}
                    margin="normal"
                    disabled={dis}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="t_city"
                    // style={styles.TextField}
                    label="City"
                    className={classes.textField}
                    value={"" + this.state.shipping.city}
                    margin="normal"
                    disabled={dis}
                    variant="outlined"
                  />
                  <TextField
                    id="t_zipcode"
                    // style={styles.TextField}
                    label="ZipCode"
                    className={classes.textField}
                    value={"" + this.state.shipping.zipcode}
                    margin="normal"
                    disabled={dis}
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="t_country"
                    // style={styles.TextField}
                    label="Country"
                    className={classes.textField}
                    value={"" + this.state.shipping.country}
                    margin="normal"
                    disabled={dis}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
    const payment = (
      <Grid container style={styles.Grid}>
        <Grid item sm={6} style={styles.Grid}>
          <Paper style={styles.Paper}>
            <Grid container direction="row">
              <Grid item sm={11}>
                <Typography
                  variant="subtitle1"
                  style={{ marginBottom: "20px" }}
                >
                  Payment Information
                </Typography>
              </Grid>
              <Grid item sm={1}>
                <ModifyPaymentInfoModal
                  payment={this.state.payment}
                  fetchcustomer={this.fetchcustomer}
                />
              </Grid>
            </Grid>
            <form>
              <Grid container direction="row">
                <Grid item sm={12}>
                  <Cards
                    name={
                      this.state.payment.cc_lastname +
                      " " +
                      this.state.payment.cc_firstname
                    }
                    number={this.state.payment.cc_number}
                  ></Cards>
                  <TextField
                    id="t_address"
                    label="Address"
                    style={{ witdh: "50%%", marginTop: "10px" }}
                    className={classes.textField}
                    value={"" + this.state.shipping.street}
                    margin="normal"
                    disabled={dis}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );

    if (this.state.choice === "Profile") {
      choice = account;
    } else if (this.state.choice === "Password") {
      choice = password;
    } else if (this.state.choice === "Shipping") {
      choice = shipping;
    } else if (this.state.choice === "Payment") {
      choice = payment;
    } else if (this.state.choice === "Home") {
      choice = home;
    }
    return (
      <div>
        <div>
          <Typography variant="h4" style={styles.Typography}>
            Manage Profile
          </Typography>
          <Grid container style={styles.Grid}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={1}>
                  <Paper style={styles.Menu}>
                    <MenuList>
                      <MenuItem
                        style={styles.MenuItem}
                        onClick={() => {
                          this.handleClick("Profile");
                        }}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem
                        style={styles.MenuItem}
                        onClick={() => {
                          this.handleClick("Password");
                        }}
                      >
                        Password
                      </MenuItem>
                      <MenuItem
                        style={styles.MenuItem}
                        onClick={() => {
                          this.handleClick("Shipping");
                        }}
                      >
                        Shipping
                      </MenuItem>
                      <MenuItem
                        style={styles.MenuItem}
                        onClick={() => {
                          this.handleClick("Payment");
                        }}
                      >
                        Payment
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </Grid>
                <Grid item sm style={styles.Grid}>
                  {choice}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

CustomerDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(withRouter(CustomerDetails));
