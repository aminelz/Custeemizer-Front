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
      choice: "Profile"
    };
  }
  handleClick(x) {
    this.setState({ choice: x });
  }

  async componentDidMount() {
    await this.fetchcustomer();
    await this.fetchuser();
  }

  async fetchcustomer() {
    const url = "http://localhost:8080/Customer/4";
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
  async fetchuser() {
    const url = "http://localhost:8080/UserCustomer/4";
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ user: data[0] });
      })
      .catch(err => console.log(err));
  }

  render() {
    var dis = this.state.disabled;
    const { classes } = this.props;
    var choice;

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
            </Typography>
            <form>
              <Grid container direction="row">
                <Grid item>
                  <TextField
                    id="t_oldpassword"
                    label="Old Password"
                    // style={styles.TextField}
                    margin="normal"
                    disabled={dis}
                    value={" "}
                    placeholder={"Enter old password"}
                    variant="outlined"
                    className={classes.textField}
                  />
                </Grid>
                <Grid item sm={6}></Grid>
                <Grid item>
                  <TextField
                    id="t_newpassword"
                    // style={styles.TextField}
                    label="New Password"
                    margin="normal"
                    disabled={dis}
                    value={" "}
                    placeholder={"Enter new password"}
                    variant="outlined"
                    className={classes.textField}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="t_newpassword2"
                    // style={styles.TextField}
                    label="New Password²"
                    margin="normal"
                    disabled={dis}
                    value={" "}
                    placeholder={"Re-enter new password"}
                    variant="outlined"
                    className={classes.textField}
                  />
                  <Grid item>
                    <Grid container>
                      <Grid item sm={11}></Grid>
                      <Grid item sm={1}>
                        <Button onClick={console.log("Save Clicked")}>
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
                  user={this.state.user}
                  customer={this.state.customer}
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
                  user={this.state.user}
                  customer={this.state.customer}
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
