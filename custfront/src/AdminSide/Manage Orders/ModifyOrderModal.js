import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SkyLight from "react-skylight";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
}));

function ModifyOrderModal(props) {
  const classes = useStyles();
  const [process, setProcess] = React.useState(props.old_processed);

  const handleChange = event => {
    setProcess(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    var modifiedOrder = {
      processed: process
    };
    props.modifyOrder(props.orderID, modifiedOrder);
    props.closemodal();
    props.track();
  };

  return (
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
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item xs={4} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="processing-label-placeholder">
                  Processing
                </InputLabel>
                <Select
                  onChange={handleChange}
                  inputProps={{
                    name: "processing",
                    id: "processing_id"
                  }}
                  name="processing"
                  autoWidth="true"
                  value={process}
                >
                  <MenuItem value="Order Received">Order Received</MenuItem>
                  <MenuItem value="Pending Confirmation">
                    Pending Confirmation
                  </MenuItem>
                  <MenuItem value="Order Confirmed">Order Confirmed</MenuItem>
                  <MenuItem value="Pending Payment">Pending Payment</MenuItem>
                  <MenuItem value="Preparing Order">Preparing Order</MenuItem>
                  <MenuItem value="Pending Shipment">Pending Shipment</MenuItem>
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
            onClick={handleSubmit}
          >
            Save Modifications
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default withRouter(ModifyOrderModal);
