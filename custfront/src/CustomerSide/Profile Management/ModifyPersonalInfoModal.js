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
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import swal from "sweetalert";
import moment from "moment";

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

class ModifyPersonalInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: props.user[3],
      last_name: props.user[4],
      email: props.user[2],
      phone_number: props.customer.phone_number,
      birth_date: props.customer.birth_date,
      response: null,
      customerid: props.customer.customer_ID,
      userid: props.user[0]
    };
  }

  changedate(x) {
    this.setState({ birth_date: moment(x).format("L") });
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

  async validatemodification() {
    var errors = null;
    await this.fetchemail();
    if (
      this.state.first_name.length === 0 ||
      this.state.last_name.length === 0 ||
      this.state.email.length === 0 ||
      this.state.phone_number.length === 0 ||
      this.state.birth_date.length === 0
    ) {
      errors = "You did not fill all required fields !";
    } else if (
      this.state.response === true &&
      this.state.email !== this.props.user[2]
    ) {
      errors = "The email you entered is already used !";
    } else if (
      this.state.first_name === this.props.user[3] &&
      this.state.last_name === this.props.user[4] &&
      this.state.email === this.props.user[2] &&
      this.state.phone_number === this.props.customer.phone_number &&
      this.state.birth_date === this.props.customer.birth_date
    ) {
      errors = "Nothing has been modified !";
    }
    return errors;
  }

  async modifyCustomer(id, newvalue) {
    await fetch(`http://localhost:8080/api/customers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newvalue)
    })
      .then(res => this.props.fetchcustomer(this.props.customer.customer_ID))
      .catch(err => swal("Error Updating", err, "error"));
  }

  async modifyUser(id, newvalue) {
    await fetch(`http://localhost:8080/api/endUsers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newvalue)
    })
      .then(res => this.props.fetchcustomer(this.props.customer.customer_ID))
      .catch(err => swal("Error Updating", err, "error"));
  }

  handleSubmit = async event => {
    event.preventDefault();
    const errors = await this.validatemodification();
    if (errors !== null) {
      await swal("Oops!", errors, "error");
      return;
    } else if (errors === null) {
      console.log(this.state.birth_date);
      var modifiedCustomer = {
        phone_number: this.state.phone_number,
        birth_date: this.state.birth_date
      };
      var modifiedUser = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email
      };
      if (
        this.state.first_name !== this.props.user[3] ||
        this.state.last_name !== this.props.user[4] ||
        this.state.email !== this.props.user[2]
      ) {
        this.modifyUser(this.state.userid, modifiedUser);
      }
      if (
        this.state.phone_number !== this.props.customer.phone_number ||
        this.state.birth_date !== this.props.customer.birth_date
      ) {
        this.modifyCustomer(this.state.customerid, modifiedCustomer);
      }

      swal(
        "Successfully Modified",
        "Your account's personal information has been updated !",
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
      <div>
        <SkyLight hideOnOverlayClicked data-dismiss="modal" ref="addDialog">
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <EditIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Modify Account Information
              </Typography>
              <form className={classes.form}>
                <Grid container direction="row">
                  <Grid item>
                    <TextField
                      id="t_firstname"
                      className={classes.textField}
                      label="First Name"
                      value={this.state.first_name}
                      margin="normal"
                      variant="outlined"
                      onChange={e =>
                        this.setState({ first_name: e.target.value })
                      }
                    />
                    <TextField
                      id="t_lastname"
                      label="Last Name"
                      className={classes.textField}
                      value={this.state.last_name}
                      margin="normal"
                      variant="outlined"
                      onChange={e =>
                        this.setState({ last_name: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="t_email"
                      label="Email"
                      className={classes.textField}
                      value={this.state.email}
                      margin="normal"
                      variant="outlined"
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="t_phone"
                      label="Phone Number"
                      className={classes.textField}
                      value={this.state.phone_number}
                      margin="normal"
                      variant="outlined"
                      onChange={e =>
                        this.setState({ phone_number: e.target.value })
                      }
                    />
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="t_birthdate"
                        label="Birth Date"
                        format="MM/dd/yyyy"
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                        onChange={e =>
                          this.setState({ birth_date: e.target.value })
                        }
                        value={this.state.birth_date}
                      />
                    </MuiPickersUtilsProvider> */}
                    <MaterialUIPickers
                      date={this.state.birth_date}
                      change={this.changedate.bind(this)}
                    />
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

ModifyPersonalInfoModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(withRouter(ModifyPersonalInfoModal));

function MaterialUIPickers(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date(props.date));
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
