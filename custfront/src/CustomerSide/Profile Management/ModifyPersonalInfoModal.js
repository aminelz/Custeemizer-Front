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
      first_name: this.props.user[3],
      last_name: this.props.user[4],
      email: this.props.user[2],
      phone_number: this.props.customer.phone_number,
      birth_date: this.props.customer.birth_date
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  async handleSubmit(event) {}

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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="t_birthdate"
                        label="Birth Date"
                        format="MM/dd/yyyy"
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                        onChange={this.handleChange}
                        value={this.state.birth_date}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
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
