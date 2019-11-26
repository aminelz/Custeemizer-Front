import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SkyLight from "react-skylight";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import Cards from "react-credit-cards";
import { Select, MenuItem } from "@material-ui/core";
import AmericanExpress from "../../Shared Admin&Customer/Ressources/americanexpress.png";
import Visa from "../../Shared Admin&Customer/Ressources/visa.png";
import Mastercard from "../../Shared Admin&Customer/Ressources/mastercard.png";

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

class ModifyShippingInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cc_number: props.payment.cc_number,
      cc_firstname: props.payment.cc_firstname,
      cc_lastname: props.payment.cc_lastname,
      cc_address: props.payment.cc_address,
      cc_expiry: props.payment.cc_expiry,
      cc_type: props.payment.cc_type,
      id: props.payment.payment_ID
    };
  }
  handleInputFocus = e => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  async validatemodification() {
    var errors = null;
    if (
      this.state.cc_number.length === 0 ||
      this.state.cc_firstname.length === 0 ||
      this.state.cc_lastname.length === 0 ||
      this.state.cc_address.length === 0 ||
      this.state.cc_expiry.length === 0 ||
      this.state.cc_type.length === 0
    ) {
      errors = "You did not fill all required fields !";
    } else if (
      this.state.cc_number === this.props.payment.cc_number &&
      this.state.cc_firstname === this.props.payment.cc_firstname &&
      this.state.cc_lastname === this.props.payment.cc_lastname &&
      this.state.cc_address === this.props.payment.cc_address &&
      this.state.cc_type === this.props.payment.cc_type &&
      this.state.cc_expiry === this.props.payment.cc_expiry
    ) {
      errors = "Nothing has been modified !";
    } else if (this.state.cc_number.length !== 16) {
      errors = "The credit card number should be 16 digits long !";
    }
    return errors;
  }

  async modifypayment(id, newvalue) {
    await fetch(`http://localhost:8080/api/paymentInfoes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newvalue)
    })
      .then(res => this.props.fetchcustomer(this.props.user.user_ID))
      .catch(err => console.log(err));
  }

  handleSubmit = async event => {
    event.preventDefault();
    const errors = await this.validatemodification();
    if (errors !== null) {
      await swal("Oops!", errors, "error");
      return;
    } else if (errors === null) {
      var modifiedPayment = {
        cc_number: this.state.cc_number,
        cc_firstname: this.state.cc_firstname,
        cc_lastname: this.state.cc_lastname,
        cc_address: this.state.cc_address,
        cc_expiry: this.state.cc_expiry,
        cc_type: this.state.cc_type
      };
      this.modifypayment(this.state.id, modifiedPayment);
      swal(
        "Successfully Modified",
        "Your payment information has been updated !",
        "success"
      )
        .then(this.props.track())
        .then(this.refs.addDialog.hide());
      // ).then(function() {
      //   window.location.reload();
      // });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <SkyLight
          hideOnOverlayClicked
          ref="addDialog"
          dialogStyles={modalstyle}
        >
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <EditIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Modify Account Information
              </Typography>
              <form>
                {/* <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <Grid container alignItems="center" direction="row">
                      <Grid item>
                        <Cards
                          name={
                            this.state.cc_lastname +
                            " " +
                            this.state.cc_firstname
                          }
                          number={this.state.cc_number}
                        ></Cards>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="t_number"
                          label="Credit Card Number"
                          style={{ witdh: "50%%", marginTop: "10px" }}
                          className={classes.textField}
                          value={"" + this.state.cc_number}
                          margin="normal"
                          variant="outlined"
                          onChange={e =>
                            this.setState({
                              cc_number: Math.max(0, parseInt(e.target.value))
                                .toString()
                                .slice(0, 16)
                            })
                          }
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          id="t_lastname"
                          label="Last Name"
                          style={{ witdh: "50%%", marginTop: "10px" }}
                          className={classes.textField}
                          value={"" + this.state.cc_lastname}
                          margin="normal"
                          variant="outlined"
                          onChange={e =>
                            this.setState({ cc_lastname: e.target.value })
                          }
                        />
                        <TextField
                          id="t_firstname"
                          label="First Name"
                          style={{ witdh: "50%%", marginTop: "10px" }}
                          className={classes.textField}
                          value={"" + this.state.cc_firstname}
                          margin="normal"
                          variant="outlined"
                          onChange={e =>
                            this.setState({ cc_firstname: e.target.value })
                          }
                        />
                        <Grid item>
                          <TextField
                            id="t_address"
                            label="Address"
                            style={{ witdh: "50%%", marginTop: "10px" }}
                            className={classes.textField}
                            value={"" + this.state.cc_address}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            onChange={e =>
                              this.setState({ cc_address: e.target.value })
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid> */}
                <Grid container direction="row" spacing={1}>
                  <Grid item md={12}>
                    <Cards
                      name={
                        this.state.cc_lastname + " " + this.state.cc_firstname
                      }
                      number={this.state.cc_number}
                      expiry={this.state.c_expiry}
                      cvc=""
                      focus=""
                    ></Cards>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      id="m_number"
                      label="Credit Card Number"
                      style={{ witdh: "50%%", marginTop: "10px" }}
                      className={classes.textField}
                      type="int"
                      required
                      value={this.state.cc_number}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      onChange={e =>
                        this.setState({
                          cc_number: Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 16)
                        })
                      }
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      id="m_expiry"
                      required
                      label="Expiry"
                      style={{ witdh: "50%%", marginTop: "10px" }}
                      className={classes.textField}
                      value={this.state.cc_expiry}
                      margin="normal"
                      variant="outlined"
                      placeholder="MM/YY"
                      inputProps={{ maxLength: 5 }}
                      onChange={e =>
                        this.setState({
                          cc_expiry: e.target.value
                        })
                      }
                    />
                  </Grid>
                  <Grid item md={2}>
                    <Select
                      onChange={e => this.setState({ cc_type: e.target.value })}
                      inputProps={{
                        name: "type",
                        id: "type_id"
                      }}
                      name="type"
                      value={this.state.cc_type}
                      label="Type"
                      style={{ marginTop: "14px" }}
                    >
                      <MenuItem value="Visa">
                        <img
                          src={Visa}
                          alt="Visa"
                          width="45px"
                          heigth="40px"
                        ></img>
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
                          id="m_lastname"
                          required
                          label="Holder's Last Name"
                          style={{ witdh: "50%%", marginTop: "10px" }}
                          className={classes.textField}
                          value={this.state.cc_lastname}
                          margin="normal"
                          variant="outlined"
                          onChange={e =>
                            this.setState({
                              cc_lastname: e.target.value
                            })
                          }
                        />
                      </Grid>
                      <Grid item md>
                        <TextField
                          id="m_firstname"
                          required
                          label="Holder's First Name"
                          style={{ witdh: "50%%", marginTop: "10px" }}
                          className={classes.textField}
                          value={this.state.cc_firstname}
                          margin="normal"
                          variant="outlined"
                          onChange={e =>
                            this.setState({
                              cc_firstname: e.target.value
                            })
                          }
                        />
                      </Grid>
                      <Grid item md>
                        <TextField
                          id="m_address"
                          label="Holder's Address"
                          required
                          style={{ witdh: "50%%", marginTop: "10px" }}
                          className={classes.textField}
                          value={this.state.cc_address}
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          onChange={e =>
                            this.setState({
                              cc_address: e.target.value
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
                  onClick={this.handleSubmit}
                >
                  Save Modifications
                </Button>
              </form>
            </div>
          </Container>
        </SkyLight>
        <div>
          <Avatar className={classes.avatar}>
            <EditIcon onClick={() => this.refs.addDialog.show()} />
          </Avatar>
        </div>
      </div>
    );
  }
}

ModifyShippingInfoModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(withRouter(ModifyShippingInfoModal));
