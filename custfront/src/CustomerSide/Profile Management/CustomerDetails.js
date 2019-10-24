import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import { withStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";

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
    alignItems: "center"
  },
  TextField: {
    padding: "10px",
    marginTop: "5px",
    marginBottom: "25px",
    marginRight: "25px",
    marginLeft: "25px"
  }
};
const useStyles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
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
      disabled: false
    };
  }

  handleDateChange = date => {
    this.setState(date);
  };

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
    console.log(this.state.user);
  }

  render() {
    var dis = this.state.disabled;
    const { classes } = this.props;
    const account = (
      <Grid container style={styles.Grid}>
        <Grid item sm={6} style={styles.Grid}>
          <Paper style={styles.Paper}>
            <Typography variant="subtitle1" style={{ marginBottom: "20px" }}>
              Account Information
            </Typography>
            <form>
              <Grid container direction="row">
                <Grid item>
                  <TextField
                    label="First Name"
                    style={styles.TextField}
                    id="t_firstname"
                    className={classes.textField}
                    value={"" + this.state.user[3]}
                    margin="normal"
                    disabled={dis}
                    variant="outlined"
                  />
                  <TextField
                    id="t_lastname"
                    style={styles.TextField}
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
                    style={styles.TextField}
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
                    style={styles.TextField}
                    label="Birth Date"
                    className={classes.textField}
                    value={"" + this.state.customer.birth_date}
                    margin="normal"
                    disabled={dis}
                    variant="outlined"
                  />
                  <TextField
                    id="t_phone"
                    style={styles.TextField}
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
    return (
      <div>
        <Typography variant="h4" style={styles.Typography}>
          Manage Profile
        </Typography>
        {account}
      </div>
      //   <MuiPickersUtilsProvider utils={DateFnsUtils}>
      //   <KeyboardDatePicker
      //     margin="normal"
      //     id="date-picker-dialog"
      //     label="Date picker dialog"
      //     format="MM/dd/yyyy"
      //     disabled={dis}
      //     value={this.state.customer.birth_date}
      //     KeyboardButtonProps={{
      //       "aria-label": "change date"
      //     }}
      //   />
      // </MuiPickersUtilsProvider>
    );
  }
}

CustomerDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(withRouter(CustomerDetails));
