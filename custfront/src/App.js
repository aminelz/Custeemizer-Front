import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

//Pages to be routed
import CartPage from "./Shared Admin&Customer/pages/CartPage";
import HomePage from "./Shared Admin&Customer/pages/HomePage";
import OrdersPage from "./Shared Admin&Customer/pages/OrdersPage";
import UserPage from "./Shared Admin&Customer/pages/UserPage";
import TshirtPage from "./Shared Admin&Customer/pages/TshirtPage";
import ManageProfilePage from "./Shared Admin&Customer/pages/ManageProfilePage";
// import AddCustomer from "./CustomerSide/Profile Management/AddCustomer";
// import SignupPage from "./Shared Admin&Customer/pages/SignUpPage";

class App extends Component {
  // constructor(props){
  //   super(props);
  //   this.setState({isAutheticated: "NO", user_id:})
  // }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/Cart" component={CartPage} />
          <Route path="/Orders" component={OrdersPage} />
          <Route path="/Home" component={HomePage} />
          <Route path="/Customers" component={UserPage} />
          <Route path="/Admins" component={UserPage} />
          <Route path="/Customer/:id" component={UserPage} />
          <Route path="/Tshirts/:sex" component={withRouter(TshirtPage)} />
          <Route path="/Tshirt/:id" component={withRouter(TshirtPage)} />
          <Route path="/Order/:id" component={OrdersPage} />
          <Route path="/MyAccount" component={ManageProfilePage} />
          {/* <Route path="/Register" component={AddCustomer} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
