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
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel, MenuItem } from "@material-ui/core";
import swal from "sweetalert";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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
  }
});

class ModifyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { processed: props.processed, orderID: props.orderID };
    this.handleChange = this.handleChange.bind(this);
    this.modifyorder = this.modifyorder.bind(this);
  }

  async modifyorder(order, newvalue) {
    await fetch(`http://localhost:8080/api/orders/${order}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newvalue)
    })
      .then(res => this.props.fetchorder())
      .catch(err => console.error(err));
  }

  // async fetchorders() {
  //   const url = "http://localhost:8080/Orders";
  //   await fetch(url)
  //     .then(async ans => await ans.json())
  //     .then(data => {
  //       this.setState({ orders: data });
  //     })
  //     .catch(err => console.log(err));
  // }

  handleSubmit = async event => {
    event.preventDefault();
    var modifiedOrder = {
      processed: this.state.processed
    };
    this.modifyorder(this.state.orderID, modifiedOrder);
    swal(
      "Successfully Modified",
      "A new admin has successfully been added !",
      "success"
    )
      .then(this.props.track())
      .then(this.refs.addDialog.hide());
  };

  handleChange = event => {
    this.setState({ processed: event.target.value });
  };

  render(props) {
    const { classes } = this.props;
    return (
      <div style={{ alignItems: "left" }}>
        <SkyLight hideOnOverlayClicked ref="addDialog">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <EditIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Modify Order Processing
              </Typography>
              <form className={classes.form} noValidate>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  alignItems="center"
                >
                  <Grid item xs={4} sm={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="processing-label-placeholder">
                        Processing
                      </InputLabel>
                      <Select
                        onChange={this.handleChange}
                        inputProps={{
                          name: "processing",
                          id: "processing_id"
                        }}
                        name="processing"
                        value={this.state.processed}
                      >
                        <MenuItem value="Order Received">
                          Order Received
                        </MenuItem>
                        <MenuItem value="Pending Confirmation">
                          Pending Confirmation
                        </MenuItem>
                        <MenuItem value="Order Confirmed">
                          Order Confirmed
                        </MenuItem>
                        <MenuItem value="Pending Payment">
                          Pending Payment
                        </MenuItem>
                        <MenuItem value="Preparing Order">
                          Preparing Order
                        </MenuItem>
                        <MenuItem value="Pending Shipment">
                          Pending Shipment
                        </MenuItem>
                        <MenuItem value="Shipped">Shipped</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
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
          <EditIcon
            style={{ color: "darkblue" }}
            onClick={() => this.refs.addDialog.show()}
            data-tip="Modify Processing State"
          />
          <ReactTooltip place="bottom" position="float" type="info" />
        </div>
      </div>
    );
  }
}
ModifyOrder.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(withRouter(ModifyOrder));
