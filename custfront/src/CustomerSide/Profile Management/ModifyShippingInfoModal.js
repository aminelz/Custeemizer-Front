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

class ModifyShippingInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: props.shipping.street,
      city: props.shipping.city,
      zipcode: props.shipping.zipcode,
      country: props.shipping.country,
      id: props.shipping.shipping_ID
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async validatemodification() {
    var errors = null;
    if (
      this.state.city.length === 0 ||
      this.state.zipcode.length === 0 ||
      this.state.country.length === 0 ||
      this.state.street.length === 0
    ) {
      errors = "You did not fill all required fields !";
    } else if (this.state.zipcode.length !== 5) {
      errors = "Zipcode should be 5 digits long !";
    } else if (
      this.state.city === this.props.shipping.city &&
      this.state.zipcode === this.props.shipping.zipcode &&
      this.state.country === this.props.shipping.country &&
      this.state.street === this.props.shipping.street
    ) {
      errors = "Nothing has been modified !";
    }
    return errors;
  }

  async modifyshipping(id, newvalue) {
    await fetch(`http://localhost:8080/api/shippingInfoes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newvalue)
    })
      .then(res => this.props.fetchcustomer(this.props.shipping.customer))
      .catch(err => swal("Error Updating", err, "error"));
  }

  handleSubmit = async event => {
    event.preventDefault();
    const errors = await this.validatemodification();
    if (errors !== null) {
      await swal("Oops!", errors, "error");
      return;
    } else if (errors === null) {
      console.log("No Errors");
      var modifiedShipping = {
        street: this.state.street,
        city: this.state.city,
        zipcode: this.state.zipcode,
        country: this.state.country
      };
      this.modifyshipping(this.state.id, modifiedShipping);
      swal(
        "Successfully Modified",
        "Your shipping information has been updated !",
        "success"
      ).then(function() {
        window.location.reload();
      });
      this.refs.addDialog.hide();
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ alignItems: "left" }}>
        <SkyLight hideOnOverlayClicked ref="addDialog">
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
                <Grid container direction="row">
                  <Grid item sm={12}>
                    <TextField
                      id="t_street"
                      label="Street"
                      required
                      // style={styles.TextField.largetext}
                      style={{ width: "78%" }}
                      className={classes.textField}
                      value={this.state.street}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      onChange={e => this.setState({ street: e.target.value })}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="t_city"
                      // style={styles.TextField}
                      label="City"
                      required
                      className={classes.textField}
                      value={this.state.city}
                      margin="normal"
                      variant="outlined"
                      onChange={e => this.setState({ city: e.target.value })}
                    />
                    <TextField
                      id="t_zipcode"
                      // style={styles.TextField}
                      label="ZipCode"
                      required
                      className={classes.textField}
                      value={this.state.zipcode}
                      margin="normal"
                      variant="outlined"
                      type="int"
                      onChange={e =>
                        this.setState({
                          zipcode: Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 5)
                        })
                      }
                    />
                  </Grid>
                  <Grid item sm>
                    <TextField
                      id="t_country"
                      // style={styles.TextField}
                      label="Country"
                      required
                      className={classes.textField}
                      value={this.state.country}
                      margin="normal"
                      variant="outlined"
                      onChange={e => this.setState({ country: e.target.value })}
                    />
                    {/* <Select
                      inputProps={{
                        name: "country",
                        id: "country_id"
                      }}
                      name="country"
                      label="Country"
                      value="Morocco"
                    >
                      <MenuItem value="Morocco">Morocco</MenuItem>
                    </Select> */}
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
