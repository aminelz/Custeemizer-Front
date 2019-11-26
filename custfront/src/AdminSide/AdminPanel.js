import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import "date-fns";
import { MenuItem, MenuList, Button, Avatar } from "@material-ui/core";
import SaveTwoToneIcon from "@material-ui/icons/SaveTwoTone";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import swal from "sweetalert";
import OrderList from "../AdminSide/Manage Orders/OrderList";
import CustomerList from "../AdminSide/Manage Profiles/CustomerList";
import AdminList from "../AdminSide/Manage Profiles/AdminList";

import "./AdminPanel.css";

const styles = {
  Paper: {
    padding: "10px",
    margin: "10px"
    // maxWidth: "1000px"
  },
  Grid: {
    padding: "10px",
    margin: "10px"
  },
  Typography: {
    alignItems: "center",
    margin: 10
  },
  TextField: {
    padding: "10px",
    marginTop: "5px",
    marginBottom: "25px",
    marginRight: "25px",
    marginLeft: "25px",
    largetext: {
      width: "75%",
      padding: "10px",
      marginTop: "5px",
      marginBottom: "25px",
      marginRight: "25px",
      marginLeft: "25px"
    }
  },
  Menu: {
    padding: "10px",
    marginTop: "70px",
    width: 120,
    backgroundColor: "#000000" //#54A391
  },
  MenuItem: {
    backgroundColor: "#000000", //"#54A391",
    color: "white",
    marginBottom: 2,
    outlineColor: "white",
    outlineWidth: "1px"
  }
};
const useStyles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
});

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
      customers: [],
      orders: [],
      choice: "Landing",
      order_modification: false,
      admin_modification: false
    };
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.handleAdminChange = this.handleAdminChange.bind(this);
    this.fetchCustomers = this.fetchCustomers.bind(this);
    this.fetchAdmins = this.fetchAdmins.bind(this);
    this.fetchOrders = this.fetchOrders.bind(this);
  }
  handleClick(x) {
    this.setState({ choice: x });
  }

  handleOrderChange() {
    this.setState({ order_modification: true });
  }

  handleAdminChange() {
    this.setState({ admin_modification: true });
  }

  async componentDidMount() {
    // await this.fetchAdmins();
  }

  async componentDidUpdate(prevState) {
    if (this.state.order_modification === true) {
      await this.fetchOrders().then(
        this.setState({ order_modification: false })
      );
    }
    if (this.state.admin_modification === true) {
      await this.fetchAdmins().then(
        this.setState({ admin_modification: false })
      );
    }
  }

  async fetchAdmins() {
    const url = `http://localhost:8080/Admins`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ users: data, added: false });
      })
      .catch(err => console.log(err));
  }
  async fetchCustomers() {
    const url = `http://localhost:8080/Customers`;
    await fetch(url)
      .then(async res => await res.json())
      .then(data => {
        this.setState({ users: data });
      })
      .catch(err => console.log(err));
  }

  async fetchOrders() {
    const url = "http://localhost:8080/api/orders";
    await fetch(url)
      .then(async ans => await ans.json())
      .then(data => {
        this.setState({ orders: data._embedded.orders });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    var choice;

    const adminslist = (
      <Grid container style={styles.Grid}>
        <Grid item sm={6} style={styles.Grid}>
          <Paper style={styles.Paper} className="admins-paper">
            <Grid container>
              <Grid item md>
                <Typography
                  variant="subtitle1"
                  // style={{ marginBottom: "20px" }}
                  className="typography"
                >
                  Full Admins List
                </Typography>
              </Grid>
            </Grid>
            <AdminList />
          </Paper>
        </Grid>
      </Grid>
    );
    const customerslist = (
      <Grid container style={styles.Grid}>
        <Grid item sm={6} style={styles.Grid}>
          <Paper style={styles.Paper} className="customers-paper">
            <Grid container direction="row">
              <Grid item sm={12}>
                <Typography
                  variant="subtitle1"
                  style={{ marginBottom: "20px" }}
                >
                  Full Customers List
                </Typography>
              </Grid>
            </Grid>
            <CustomerList />
          </Paper>
        </Grid>
      </Grid>
    );

    const orderslist = (
      <Grid container style={styles.Grid}>
        <Grid item sm={6} style={styles.Grid}>
          <Paper style={styles.Paper} className="orders-paper">
            <Typography variant="subtitle1" style={{ marginBottom: "20px" }}>
              Full Orders List
            </Typography>
            <OrderList status="Admin" customer_ID={"0"} />
          </Paper>
        </Grid>
      </Grid>
    );

    const home = (
      <Grid container style={styles.Grid}>
        <Grid item sm={6} style={styles.Grid}>
          <Paper style={styles.Paper}>
            <Grid container>
              <Grid item sm={11}>
                <Typography
                  variant="subtitle1"
                  style={{ marginBottom: "20px" }}
                >
                  Admin Panel
                </Typography>
              </Grid>
            </Grid>
            <p>
              Welcome on the admin management portal, navigate using the menu to
              view/manage admins, customers and orders.
            </p>
          </Paper>
        </Grid>
      </Grid>
    );

    if (this.state.choice === "Admin") {
      choice = adminslist;
    } else if (this.state.choice === "Customer") {
      choice = customerslist;
    } else if (this.state.choice === "Orders") {
      choice = orderslist;
    } else if (this.state.choice === "Landing") {
      choice = home;
    }

    return (
      // <div>
      <div>
        <Typography variant="h4" style={styles.Typography}>
          Admin Panel
        </Typography>
        <Grid container style={styles.Grid}>
          <Grid item md={12}>
            <Grid container>
              <Grid item sm={1}>
                <Paper style={styles.Menu}>
                  <MenuList>
                    <MenuItem
                      style={styles.MenuItem}
                      onClick={() => {
                        this.handleClick("Admin");
                      }}
                    >
                      Admins
                    </MenuItem>
                    <MenuItem
                      style={styles.MenuItem}
                      onClick={() => {
                        this.handleClick("Customer");
                      }}
                    >
                      Customers
                    </MenuItem>
                    <MenuItem
                      style={styles.MenuItem}
                      onClick={() => {
                        this.handleClick("Orders");
                      }}
                    >
                      Orders
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grid>
              <Grid item md style={styles.Grid}>
                {choice}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      // </div>
    );
  }
}

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(AdminPanel);
