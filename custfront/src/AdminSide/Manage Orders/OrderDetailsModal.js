import React, { Component } from "react";
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
import VisibilityIcon from "@material-ui/icons/Visibility";
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
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  root: {
    width: "90%",
    marginTop: "20px",
    marginLeft: "43%"
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
  marginTop: "-100px",
  marginLeft: "-25%",
  backgroundColor: "#fff",
  borderRadius: "2px",
  zIndex: 1000,
  padding: "15px",
  boxShadow: "0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)",
  alignItems: "center"
};

class OrderDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.fetchcart = this.fetchcart.bind(this);
  }

  async componentDidMount() {
    await this.fetchcart();
  }

  async fetchcart() {
    const url = `http://localhost:8080/Order/${this.props.order_ID}/items`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ items: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const rows = this.state.items.map((item, index) => (
      <tr key={index}>
        <td>{item.tshirt.name}</td>
        <td>
          <img src={item.tshirt.image_URL} alt="tshirt" width="45px" />
        </td>
        <td>{item.tshirt.price}</td>
        <td>{item.quantity}</td>
        <td>{item.tshirt.price * item.quantity}</td>
      </tr>
    ));
    // const orderreview = (
    //   <Container component="main" maxWidth="md">
    //     <CssBaseline />
    //     <div className={classes.paper}>
    //       <Avatar className={classes.avatar}>
    //         <PostAddIcon />
    //       </Avatar>
    //       <Typography
    //         component={"span"}
    //         variant="h5"
    //         style={{ color: "black" }}
    //       >
    //         Order Details
    //       </Typography>
    //       <div className={classes.root}>
    //         <table>
    //           <tbody>
    //             <tr>
    //               <th>Name</th>
    //               <th>Image</th>
    //               <th>Price</th>
    //               <th>Quantity</th>
    //               <th>Total</th>
    //             </tr>
    //             {rows}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </Container>
    // );

    return (
      <div>
        <SkyLight
          hideOnOverlayClicked
          data-dismiss="modal"
          ref="addDialog"
          dialogStyles={modalstyle}
          //   afterClose={null}
        >
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
                Order Details
              </Typography>
              <div className={classes.root}>
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
              </div>
            </div>
          </Container>
        </SkyLight>
        <div>
          <VisibilityIcon
            data-tip="View Order Details"
            onClick={() => this.refs.addDialog.show()}
            style={{ color: "darkblue" }}
          />
          <ReactTooltip place="bottom" position="float" type="info" />
        </div>
        {/* <button
          data-tip="Modify Processing State"
          onClick={() => this.refs.addDialog.show()}
        >
          <VisibilityIcon />
        </button>
        <ReactTooltip place="bottom" position="float" type="info" /> */}
      </div>
    );
  }
}

export default withStyles(useStyles)(OrderDetailsModal);
