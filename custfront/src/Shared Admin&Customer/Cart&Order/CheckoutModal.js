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

class CheckoutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipping: [],
      payment: [],
      activeStep: 0,
      success: null,
      customer_ID: "",
      user_ID: this.props.user_ID
    };
    this.fetchinfo = this.fetchinfo.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  async componentDidMount() {
    await this.fetchinfo(this.props.user_ID);
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
  async fetchinfo(id) {
    const url = `http://localhost:8080/Customer/${id}`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({
          customer_ID: data.customer_ID,
          shipping: data.shipping,
          payment: data.payment
        }).then(console.log("Shipping", this.state.shipping));
      })
      .catch(err => console.log(err));
  }

  async addOrder(x) {
    const url = "http://localhost:8080/NewOrder";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(x)
    })
      .then(res => this.props.handleCart())
      .catch(err => console.error(err));
  }

  handleSubmit() {
    var neworder = {
      cart_id: this.props.cart_ID,
      customer_id: this.state.customer_ID,
      total: this.props.total
    };
    this.addOrder(neworder);
    swal(
      "Successfully Added",
      "Your Order has been processed ! You can find check out your order in your order's history",
      "success"
    );
    this.refs.addDialog.hide();
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const orderreview = (
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
            Checkout
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
          //   afterClose={null}
        >
          {orderreview}
        </SkyLight>
        <button onClick={() => this.refs.addDialog.show()}>Checkout</button>
      </div>
    );
  }

  getSteps() {
    return ["Order Review", "Shipping Confirmation", "Payment Confirmation"];
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return this.returnOrderForm();
      case 1:
        return this.returnShippingForm();
      case 2:
        return this.returnPaymentForm();
      default:
        return "Unknown step";
    }
  }

  // EACH STEP RETURN FUNCTIONS : Personal / Shipping / Personal
  returnOrderForm() {
    const classes = this.props;
    const rows = this.props.items.map((item, index) => (
      <tr key={index}>
        <td>{item.tshirt.name}</td>
        <td>
          <img src={item.tshirt.image_URL} alt="tshirt" width="45px" />
        </td>
        <td>{item.tshirt.price}</td>
        <td>
          <input
            type="number"
            className="input"
            value={item.quantity}
            min="1"
            readOnly
          />
        </td>
        <td>{item.tshirt.price * item.quantity}</td>
      </tr>
    ));
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            {rows}
          </tbody>
        </table>
        <TextField
          id="t_totalprice"
          // style={styles.TextField}
          label="Total Price"
          className={classes.textField}
          value={this.props.total}
          margin="normal"
          variant="outlined"
          style={{ marginLeft: "42%", marginBottom: "10px", width: "20%" }}
        />
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
          Confirm Order
        </Button>
      </div>
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
          Confirm Shipping Address
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
            this.handleSubmit();
          }}
          style={{ marginTop: "25px" }}
        >
          Confirm Payment Information
        </Button>
      </form>
    );
  }
}

CheckoutModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(CheckoutModal);

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
    1: <ShoppingCartIcon />,
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
