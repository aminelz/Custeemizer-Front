import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SkyLight from "react-skylight";
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
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

class AddAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      admin: true,
      response: null,
      errors: []
    };
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

  async validateform() {
    var error = null;
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    await this.fetchemail();
    if (
      this.state.firstname.length === 0 ||
      this.state.lastname.length === 0 ||
      this.state.email.length === 0 ||
      this.state.password.length === 0
    ) {
      error = "You did not fill all required fields !";
    } else if (this.state.response === true) {
      error = "Email already in use !";
    } else if (reg.test(this.state.email) === false) {
      error = "Please enter a valid email address";
    }
    return error;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const error = await this.validateform();
    if (error !== null) {
      await swal("Oops!", error, "error");
      return;
    } else {
      var bcrypt = require("bcryptjs");
      var hash = bcrypt.hashSync(this.state.password, 10);
      var newAdmin = {
        first_name: this.state.firstname,
        last_name: this.state.lastname,
        email: this.state.email,
        password: hash,
        admin: true
      };
      this.props.addAdmin(newAdmin);
      swal(
        "Successfully Modified",
        "A new admin has successfully been added !",
        "success"
      ).then(this.props.track());
      this.refs.addDialog.hide();
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <SkyLight
          hideOnOverlayClicked
          data-dismiss="modal"
          ref="addDialog"
          dialogStyles={modalstyle}
        >
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <PersonAddIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add Admin
              </Typography>
              <form className={classes.form}>
                <Grid container direction="column" alignContent="space-around">
                  <Grid item>
                    <TextField
                      id="t_firstname"
                      className={classes.textField}
                      label="First Name"
                      value={this.state.firstname}
                      margin="normal"
                      variant="outlined"
                      onChange={e =>
                        this.setState({ firstname: e.target.value })
                      }
                      type="text"
                      placeholder="First Name"
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="t_lastname"
                      label="Last Name"
                      className={classes.textField}
                      value={this.state.lastname}
                      margin="normal"
                      variant="outlined"
                      onChange={e =>
                        this.setState({ lastname: e.target.value })
                      }
                      type="text"
                      placeholder="Last Name"
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="t_email"
                      label="Email"
                      className={classes.textField}
                      value={this.state.email}
                      margin="normal"
                      type="email"
                      variant="outlined"
                      onChange={e => this.setState({ email: e.target.value })}
                      placeholder="Email"
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="t_password"
                      label="Password"
                      className={classes.textField}
                      value={this.state.password}
                      margin="normal"
                      required
                      variant="outlined"
                      placeholder="Password"
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
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
                  Add
                </Button>
              </form>
            </div>
          </Container>
        </SkyLight>
        <div>
          <button
            style={{ margin: "10px" }}
            onClick={() => this.refs.addDialog.show()}
          >
            Add Admin
          </button>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(withRouter(AddAdmin));

AddAdmin.propTypes = {
  classes: PropTypes.object.isRequired
};
