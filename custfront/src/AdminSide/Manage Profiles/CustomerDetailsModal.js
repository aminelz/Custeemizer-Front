import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SkyLight from "react-skylight";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { TextField, makeStyles, MenuItem, Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import Cards from "react-credit-cards";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PaymentIcon from "@material-ui/icons/Payment";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import clsx from "clsx";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ReactTooltip from "react-tooltip";

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
  zIndex: 1000,
  padding: "15px",
  boxShadow: "0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)"
};

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

class CustomerDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipping: [],
      payment: [],
      customer: [],
      activeStep: 0,
      user_ID: this.props.id
    };
    this.fetchinfo = this.fetchinfo.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  async componentDidMount() {
    await this.fetchinfo(this.props.id);
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  async fetchinfo(id) {
    const url = `http://localhost:8080/Customer/${id}`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({
          customer: data,
          shipping: data.shipping,
          payment: data.payment
        });
        console.log("Data", data);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const customerdetails = (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PostAddIcon />
          </Avatar>
          <Typography
            component={"span"}
            variant="h5"
            style={{ color: "black" }}
          >
            Customer Details
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

    return (
      <div>
        <SkyLight
          hideOnOverlayClicked
          data-dismiss="modal"
          ref="addDialog"
          dialogStyles={modalstyle}
        >
          {customerdetails}
        </SkyLight>
        {/* <Tooltip title="View Customer Info"> */}
        <div>
          <VisibilityIcon
            style={{ color: "darkblue" }}
            data-tip="View Customer's Info"
            onClick={() => this.refs.addDialog.show()}
          />
          <ReactTooltip place="bottom" position="float" type="info" />
        </div>
        {/* <button></button> */}
        {/* </Tooltip> */}
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
        return this.returnPersonalInfo();
      case 1:
        return this.returnShippingInfo();
      case 2:
        return this.returnPaymentInfo();
      default:
        return "Unknown step";
    }
  }

  // EACH STEP RETURN FUNCTIONS : Personal / Shipping / Personal
  returnPersonalInfo() {
    const classes = this.props;
    return (
      <form>
        <Grid container direction="row">
          <Grid item>
            <TextField
              label="First Name"
              // style={styles.TextField}
              id="t_firstname"
              className={classes.textField}
              value={"" + this.props.user.first_name}
              margin="normal"
              disabled={true}
              variant="outlined"
              placeholder="First Name"
            />
            <TextField
              id="t_lastname"
              // style={styles.TextField}
              label="Last Name"
              className={classes.textField}
              value={"" + this.props.user.last_name}
              margin="normal"
              disabled={true}
              variant="outlined"
              placeholder="Last Name"
            />
          </Grid>
          <Grid item>
            <TextField
              id="t_email"
              // style={styles.TextField}
              label="Email"
              className={classes.textField}
              value={"" + this.props.user.email}
              margin="normal"
              disabled={true}
              variant="outlined"
              placeholder="Email"
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
              disabled={true}
              variant="outlined"
              placeholder="Birth Date"
            />
            <TextField
              id="t_phone"
              // style={styles.TextField}
              label="Phone Number"
              className={classes.textField}
              value={"" + this.state.customer.phone_number}
              margin="normal"
              disabled={true}
              variant="outlined"
              placeholder="Phone Number"
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          // onClick={this.validatepersonal.bind(this)}
          onClick={() => {
            this.handleNext();
          }}
          style={{ marginTop: "25px" }}
        >
          View Shipping Information
        </Button>
      </form>
    );
  }

  returnShippingInfo() {
    const classes = this.props;
    return (
      <form>
        <Grid container direction="row">
          <Grid item md={12}>
            <TextField
              id="t_street"
              label="Street"
              className={classes.textField}
              value={this.state.shipping.street}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={12}>
            <Grid container spacing={1}>
              <Grid item md>
                <TextField
                  id="t_city"
                  // style={styles.TextField}
                  label="City"
                  className={classes.textField}
                  value={this.state.shipping.city}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item md>
                <TextField
                  id="t_zipcode"
                  // style={styles.TextField}
                  label="ZipCode"
                  className={classes.textField}
                  value={this.state.shipping.zipcode}
                  margin="normal"
                  variant="outlined"
                  type="int"
                />
              </Grid>
              <Grid item md>
                <TextField
                  id="t_country"
                  // style={styles.TextField}
                  label="Country"
                  className={classes.textField}
                  value={this.state.shipping.country}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={6}>
            <Button
              //   type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                this.handleBack();
              }}
              style={{ marginTop: "25px" }}
            >
              View Personal Information
            </Button>
          </Grid>
          <Grid item md={6}>
            <Button
              //   type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                this.handleNext();
              }}
              style={{ marginTop: "25px" }}
            >
              View Shipping Information
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }

  returnPaymentInfo() {
    const classes = this.props;
    return (
      <form>
        <Grid container direction="row" spacing={1}>
          <Grid item md={12}>
            <Cards
              name={
                this.state.payment.cc_lastname +
                " " +
                this.state.payment.cc_firstname
              }
              number={this.state.payment.cc_number}
              expiry={this.state.payment.cc_expiry}
              cvc=""
              focus=""
            ></Cards>
          </Grid>
          <Grid item md>
            <TextField
              id="t_address"
              label="Holder's Address"
              style={{ witdh: "50%%", marginTop: "10px" }}
              className={classes.textField}
              value={this.state.payment.cc_address}
              margin="normal"
              variant="outlined"
              fullWidth
              disabled={true}
            />
          </Grid>
        </Grid>
        <Button
          //   type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            this.handleBack();
          }}
          style={{ marginTop: "25px" }}
        >
          View Shipping Information
        </Button>
      </form>
    );
  }
}

CustomerDetailsModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(CustomerDetailsModal);

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
    1: <PersonOutlineIcon />,
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
