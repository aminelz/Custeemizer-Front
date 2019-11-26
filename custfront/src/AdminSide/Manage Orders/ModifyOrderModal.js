import React from "react";
import { withRouter } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel, MenuItem } from "@material-ui/core";
import swal from "sweetalert";

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
    swal(
      "Successfully Modified",
      "A new admin has successfully been added !",
      "success"
    )
      .then(props.track())
      .then(props.closemodal());
  };

  return (
   
  );
}

export default withRouter(ModifyOrderModal);
