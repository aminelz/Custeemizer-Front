import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SkyLight from "react-skylight";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { TextField, makeStyles, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import swal from "sweetalert";
import moment from "moment";
import Cards from "react-credit-cards";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PaymentIcon from "@material-ui/icons/Payment";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import clsx from "clsx";
import Select from "@material-ui/core/Select";
import AmericanExpress from "../../Shared Admin&Customer/Ressources/americanexpress.png";
import Visa from "../../Shared Admin&Customer/Ressources/visa.png";
import Mastercard from "../../Shared Admin&Customer/Ressources/mastercard.png";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const useStyles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.\
    minWidth: 120,
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  root: {
    width: "90%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
});

const modalstyle = {
  width: "50%",
  height: "auto",
  position: "fixed",
  top: "35%",
  left: "50%",
  marginTop: "-200px",
  marginLeft: "-25%",
  backgroundColor: "#fff",
  borderRadius: "2px",
  zIndex: 100,
  padding: "15px",
  boxShadow: "0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)"
};

class AddCustomerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_first_name: "",
      user_last_name: "",
      user_email: "",
      user_password: "",
      user_id: "",
      customer_phone_number: "",
      customer_birth_date: "",
      customer_id: "",
      shipping_street: "",
      shipping_city: "",
      shipping_zipcode: "",
      shipping_country: "",
      shipping_id: "",
      payment_cc_number: "",
      payment_cc_firstname: "",
      payment_cc_lastname: "",
      payment_cc_address: "",
      payment_cc_type: "",
      payment_cc_expiry: "",
      payment_id: "",
      password: "",
      password2: "",
      response: "",
      activeStep: 0,
      login_email: "",
      login_password: "",
      success: null
    };
    this.login = this.login.bind(this);
    this.validatelogin = this.validatelogin.bind(this);
    this.emptylogin = this.emptylogin.bind(this);
  }

  changedate(x) {
    this.setState({ customer_birth_date: x });
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      user_first_name: "",
      user_last_name: "",
      user_email: "",
      user_password: "",
      user_id: "",
      customer_phone_number: "",
      customer_birth_date: "",
      customer_id: "",
      shipping_street: "",
      shipping_city: "",
      shipping_zipcode: "",
      shipping_country: "",
      shipping_id: "",
      payment_cc_number: "",
      payment_cc_firstname: "",
      payment_cc_lastname: "",
      payment_cc_address: "",
      payment_cc_expiry: "",
      payment_cc_type: "",
      payment_id: "",
      password: "",
      password2: ""
    });
  };

  async validatepersonal() {
    var errors = null;
    if (
      this.state.user_first_name.length === 0 ||
      this.state.user_last_name.length === 0 ||
      this.state.user_email.length === 0 ||
      this.state.customer_phone_number.length === 0 ||
      this.state.customer_birth_date.length === 0 ||
      this.state.password === 0 ||
      this.state.password2 === 0
    ) {
      errors = "You did not fill all required fields !";
    } else {
      const url = `http://localhost:8080/User/${this.state.user_email}/email`;
      const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      await fetch(url)
        .then(async res => await res.json())
        .then(data => {
          this.setState({ response: data.response });
        })
        .catch(err => console.log(err));
      if (reg.test(this.state.user_email) === false) {
        errors = "Please enter a valid email address";
      } else if (this.state.response === true) {
        errors = "The email you entered is already used !";
      } else if (
        this.state.password.length < 6 ||
        this.state.password2.length < 6
      ) {
        errors = "Your password should at least be 6 characters long";
      } else if (this.state.password !== this.state.password2) {
        errors =
          "New passwords not matching ! Please re-enter your new password";
      }
    }

    if (errors === null) {
      this.handleNext();
    } else {
      swal("Oops", errors, "error").then((errors = null));
    }
  }
  validateshipping() {
    var errors = null;
    if (
      this.state.shipping_city.length === 0 ||
      this.state.shipping_country.length === 0 ||
      this.state.shipping_street.length === 0 ||
      this.state.shipping_zipcode.length === 0
    ) {
      errors = "You did not fill all required fields !";
    } else if (this.state.shipping_zipcode.length !== 5) {
      errors = "Zipcode should be 5 digits long !";
    }

    if (errors === null) {
      this.handleNext();
    } else {
      swal("Oops", errors, "error").then((errors = null));
    }
  }
  validatepayment() {
    var errors = null;
    var current_year = parseInt(
      new Date()
        .getFullYear()
        .toString()
        .substr(-2)
    );
    var current_month = parseInt((new Date().getMonth() + 1).toString());
    var expiry_year = parseInt(this.state.payment_cc_expiry.substr(-2));
    var expiry_month = parseInt(this.state.payment_cc_expiry.substr(0, 2));
    var year_diff = expiry_year - current_year;
    var month_diff = expiry_month - current_month;
    if (
      this.state.payment_cc_address.length === 0 ||
      this.state.payment_cc_firstname.length === 0 ||
      this.state.payment_cc_lastname.length === 0 ||
      this.state.payment_cc_number.length === 0 ||
      this.state.payment_cc_expiry.length === 0 ||
      this.state.payment_cc_type.length === 0
    ) {
      errors = "You did not fill all required fields !";
    } else if (this.state.payment_cc_number.length !== 16) {
      errors = "Your credit card number should contain 16 digits !";
    } else if (this.state.payment_cc_expiry.charAt(2) !== "/") {
      errors = "The expiry doesn't match the right format: MM/YY !";
    } else if (expiry_month > 12 || expiry_month <= 0) {
      errors = "Please enter a valid month";
    } else if (year_diff < 0 || (year_diff === 0 && month_diff < 0)) {
      errors = "You credit card is expired";
    }
    if (errors === null) {
      this.handleSubmit();
    } else {
      swal("Oops", errors, "error").then((errors = null));
    }
  }

  emptylogin() {
    this.setState({ login_email: "", login_password: "" });
  }

  async validatelogin() {
    var errors = null;
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      this.state.login_email.length === 0 ||
      this.state.login_password.length === 0
    ) {
      errors = "You did not fill all required fields !";
    } else if (reg.test(this.state.login_email) === false) {
      errors = "Please enter a valid email address";
    } else {
      const value = {
        email: this.state.login_email,
        password: this.state.login_password
      };
      await this.login(value);
      if (this.state.success === false) {
        errors = "Wrong Password !";
      } else if (this.state.success === null) {
        errors = "Email doesn't exist !";
      } else if (this.state.success === true) {
        errors = null;
      }
    }
    if (errors === null) {
      swal("Successful Login", "Welcome Back ! :)", "success").then(
        this.emptylogin
      );
      // this.refs.addDialog.hide();
    } else {
      swal("Oops", errors, "error")
        .then((errors = null))
        .then(this.emptylogin);
    }
  }

  async addUser(value) {
    await fetch("http://localhost:8080/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    })
      .then(async res => await res.json())
      .then(data => {
        this.props.changeLoginState("Customer", data.customer_id);
        console.log("Customer id:", data.customer_id);
      })
      .catch(err => console.error(err));
  }

  handleSubmit() {
    var bcrypt = require("bcryptjs");
    var hash = bcrypt.hashSync(this.state.password, 10);
    var newuser = {
      user_firstname: this.state.user_first_name,
      user_lastname: this.state.user_last_name,
      user_email: this.state.user_email,
      user_password: hash,
      customer_birthdate: moment(this.state.customer_birth_date).format("L"),
      customer_phonenumber: this.state.customer_phone_number,
      payment_number: this.state.payment_cc_number,
      payment_firstname: this.state.payment_cc_firstname,
      payment_lastname: this.state.payment_cc_lastname,
      payment_type: this.state.payment_cc_type,
      payment_address: this.state.payment_cc_address,
      payment_expiry: this.state.payment_cc_expiry,
      shipping_street: this.state.shipping_street,
      shipping_zipcode: this.state.shipping_zipcode,
      shipping_city: this.state.shipping_city,
      shipping_country: this.state.shipping_country
    };
    this.addUser(newuser);

    swal("Successfully Added", "Your account has been created !", "success");
    this.refs.addDialog.hide();
  }

  async login(value) {
    await fetch("http://localhost:8080/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    })
      .then(async res => await res.json())
      .then(data => {
        console.log("The Data : ", data);
        if (data.login_status === "wrong") {
          this.setState({ success: false });
        } else if (data.login_status === null) {
          this.setState({ success: null });
        } else {
          this.setState({ success: true });
          this.props.changeLoginState(data.login_status, data.id);
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const register = (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography
            component={"span"}
            variant="h5"
            style={{ color: "black" }}
          >
            Create New Account
          </Typography>
          <div className={classes.root}>
            <Stepper activeStep={this.state.activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel
                      StepIconComponent={ColorlibStepIcon}
                      {...labelProps}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div>
              <Typography component={"span"} className={classes.instructions}>
                {this.getStepContent(this.state.activeStep, this.state)}
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    );
    const login = (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
          <Typography
            component={"span"}
            variant="h5"
            style={{ color: "black" }}
          >
            Login
          </Typography>
          <div className={classes.root}>
            <div>
              <form>
                <Grid container direction="row">
                  <Grid item md>
                    <TextField
                      id="l_email"
                      required
                      placeholder="Email"
                      className={classes.textField}
                      label="Email"
                      value={this.state.login_email + ""}
                      margin="normal"
                      variant="outlined"
                      onChange={e =>
                        this.setState({ login_email: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md>
                    <TextField
                      id="l_password"
                      label="Password"
                      required
                      // style={styles.TextField}
                      margin="normal"
                      type="password"
                      value={this.state.login_password}
                      placeholder={"Enter password"}
                      variant="outlined"
                      className={classes.textField}
                      onChange={e =>
                        this.setState({ login_password: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  // onClick={this.validatepersonal.bind(this)}
                  onClick={this.validatelogin}
                  style={{ marginTop: "25px" }}
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    );

    return (
      <div>
        <SkyLight
          hideOnOverlayClicked
          data-dismiss="modal"
          ref="addDialog"
          dialogStyles={modalstyle}
          afterClose={
            this.props.choice === "Login" ? this.emptylogin : this.handleReset
          }
        >
          {this.props.choice === "Login" ? login : register}
        </SkyLight>
        <p
          onClick={() => this.refs.addDialog.show()}
          style={{ margin: 0, padding: 0 }}
        >
          {this.props.choice}
        </p>
        {/* <div>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
        </div> */}
      </div>
    );
  }

  getSteps() {
    return [
      "Account Information",
      "Shipping Information",
      "Payment Information"
    ];
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return this.returnPersonalForm();
      case 1:
        return this.returnShippingForm();
      case 2:
        return this.returnPaymentForm();
      default:
        return "Unknown step";
    }
  }

  // EACH STEP RETURN FUNCTIONS : Personal / Shipping / Personal
  returnPersonalForm() {
    const classes = this.props;
    return (
      <form className={classes.form}>
        <Grid container direction="row" spacing={1}>
          <Grid item md={4}>
            <Grid container>
              <Grid item md>
                <TextField
                  id="t_firstname"
                  required
                  className={classes.textField}
                  label="First Name"
                  value={this.state.user_first_name + ""}
                  margin="normal"
                  variant="outlined"
                  onChange={e =>
                    this.setState({ user_first_name: e.target.value })
                  }
                  placeholder="First Name"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="t_newpassword"
                  label="Password"
                  required
                  // style={styles.TextField}
                  margin="normal"
                  type="password"
                  value={this.state.password}
                  placeholder={"Enter Password"}
                  variant="outlined"
                  className={classes.textField}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </Grid>
              <Grid item md>
                <TextField
                  id="t_phone"
                  label="Phone Number"
                  required
                  placeholder="Phone Number"
                  className={classes.textField}
                  value={this.state.customer_phone_number + ""}
                  margin="normal"
                  variant="outlined"
                  onChange={e =>
                    this.setState({
                      customer_phone_number: e.target.value
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <Grid container>
              <Grid item md>
                <TextField
                  id="t_lastname"
                  label="Last Name"
                  required
                  placeholder="Last Name"
                  className={classes.textField}
                  value={this.state.user_last_name + ""}
                  margin="normal"
                  variant="outlined"
                  onChange={e =>
                    this.setState({ user_last_name: e.target.value })
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  id="t_newpassword2"
                  // style={styles.TextField}
                  label="New Password"
                  margin="normal"
                  required
                  type="password"
                  value={this.state.password2}
                  placeholder={"Re-Enter new password"}
                  variant="outlined"
                  className={classes.textField}
                  onChange={e => this.setState({ password2: e.target.value })}
                />
              </Grid>
              <Grid item md>
                <MaterialUIPickers
                  date={this.state.customer_birth_date}
                  change={this.changedate.bind(this)}
                  required
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <Grid container>
              <Grid item md>
                <TextField
                  id="t_email"
                  required
                  label="Email"
                  className={classes.textField}
                  value={this.state.user_email + ""}
                  margin="normal"
                  placeholder="Email"
                  variant="outlined"
                  onChange={e => this.setState({ user_email: e.target.value })}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          // onClick={this.validatepersonal.bind(this)}
          onClick={this.validatepersonal.bind(this)}
          style={{ marginTop: "25px" }}
        >
          Next (Shipping Info)
        </Button>
      </form>
    );
  }

  returnShippingForm() {
    const classes = this.props;
    return (
      <form>
        <Grid container direction="row">
          <Grid item md={12}>
            <TextField
              id="t_street"
              label="Street"
              required
              className={classes.textField}
              value={this.state.shipping_street}
              margin="normal"
              variant="outlined"
              placeholder="Street"
              fullWidth
              onChange={e => this.setState({ shipping_street: e.target.value })}
            />
          </Grid>
          <Grid item md={12}>
            <Grid container spacing={1}>
              <Grid item md>
                <TextField
                  id="t_city"
                  // style={styles.TextField}
                  label="City"
                  required
                  className={classes.textField}
                  value={this.state.shipping_city}
                  margin="normal"
                  variant="outlined"
                  placeholder="City"
                  onChange={e =>
                    this.setState({ shipping_city: e.target.value })
                  }
                />
              </Grid>
              <Grid item md>
                <TextField
                  id="t_zipcode"
                  // style={styles.TextField}
                  label="ZipCode"
                  required
                  className={classes.textField}
                  placeholder="ZipCode"
                  value={this.state.shipping_zipcode}
                  margin="normal"
                  variant="outlined"
                  type="int"
                  onChange={e =>
                    this.setState({
                      shipping_zipcode: Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 5)
                    })
                  }
                />
              </Grid>
              <Grid item md>
                <TextField
                  id="t_country"
                  // style={styles.TextField}
                  label="Country"
                  required
                  placeholder="Country"
                  className={classes.textField}
                  value={this.state.shipping_country}
                  margin="normal"
                  variant="outlined"
                  onChange={e =>
                    this.setState({
                      shipping_country: e.target.value
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button
          //   type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={this.validateshipping.bind(this)}
          style={{ marginTop: "25px" }}
        >
          Next (Payment Info)
        </Button>
      </form>
    );
  }

  returnPaymentForm() {
    const classes = this.props;
    return (
      <form>
        <Grid container direction="row" spacing={1}>
          <Grid item md={12}>
            <Cards
              name={
                this.state.payment_cc_lastname +
                " " +
                this.state.payment_cc_firstname
              }
              number={this.state.payment_cc_number}
              expiry={this.state.payment_cc_expiry}
              cvc=""
              focus=""
            ></Cards>
          </Grid>
          <Grid item md={6}>
            <TextField
              id="t_number"
              label="Credit Card Number"
              style={{ witdh: "50%%", marginTop: "10px" }}
              className={classes.textField}
              type="int"
              required
              value={this.state.payment_cc_number}
              placeholder="xxxxxxxxxxxxxxxx"
              margin="normal"
              variant="outlined"
              fullWidth
              onChange={e =>
                this.setState({
                  payment_cc_number: Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 16)
                })
              }
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id="t_expiry"
              required
              label="Expiry"
              style={{ witdh: "50%%", marginTop: "10px" }}
              className={classes.textField}
              value={this.state.payment_cc_expiry}
              margin="normal"
              variant="outlined"
              placeholder="MM/YY"
              inputProps={{ maxLength: 5 }}
              onChange={e =>
                this.setState({
                  payment_cc_expiry: e.target.value
                })
              }
            />
          </Grid>
          <Grid item md={2}>
            <Select
              onChange={e => this.setState({ payment_cc_type: e.target.value })}
              inputProps={{
                name: "type",
                id: "type_id"
              }}
              name="type"
              value={this.state.payment_cc_type}
              label="Type"
              style={{ marginTop: "14px" }}
            >
              <MenuItem value="Visa">
                <img src={Visa} alt="Visa" width="45px" heigth="40px"></img>
              </MenuItem>
              <MenuItem value="MasterCard">
                <img
                  src={Mastercard}
                  alt="MasterCard"
                  width="45px"
                  heigth="40px"
                ></img>
              </MenuItem>
              <MenuItem value="American Express">
                <img
                  src={AmericanExpress}
                  alt="American Express"
                  width="45px"
                  heigth="40px"
                ></img>
              </MenuItem>
            </Select>
          </Grid>
          <Grid item md={12}>
            <Grid container spacing={1}>
              <Grid item md>
                <TextField
                  id="t_lastname"
                  required
                  label="Holder's Last Name"
                  style={{ witdh: "50%%", marginTop: "10px" }}
                  className={classes.textField}
                  value={this.state.payment_cc_lastname}
                  margin="normal"
                  placeholder="Last Name"
                  variant="outlined"
                  onChange={e =>
                    this.setState({ payment_cc_lastname: e.target.value })
                  }
                />
              </Grid>
              <Grid item md>
                <TextField
                  id="t_firstname"
                  required
                  label="Holder's First Name"
                  style={{ witdh: "50%%", marginTop: "10px" }}
                  className={classes.textField}
                  value={this.state.payment_cc_firstname}
                  margin="normal"
                  placeholder="First Name"
                  variant="outlined"
                  onChange={e =>
                    this.setState({ payment_cc_firstname: e.target.value })
                  }
                />
              </Grid>
              <Grid item md>
                <TextField
                  id="t_address"
                  label="Holder's Address"
                  required
                  style={{ witdh: "50%%", marginTop: "10px" }}
                  className={classes.textField}
                  value={this.state.payment_cc_address}
                  margin="normal"
                  variant="outlined"
                  placeholder="Address"
                  fullWidth
                  onChange={e =>
                    this.setState({ payment_cc_address: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button
          //   type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={this.validatepayment.bind(this)}
          style={{ marginTop: "25px" }}
        >
          Register
        </Button>
      </form>
    );
  }
}

AddCustomerModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(withRouter(AddCustomerModal));

function MaterialUIPickers(props) {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const handleDateChange = date => {
    setSelectedDate(date);
    props.change(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Birth Date"
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PermIdentityIcon />,
    2: <LocalShippingIcon />,
    3: <PaymentIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};
