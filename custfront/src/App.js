import React from "react";
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
import CustomerDetails from "./CustomerSide/Profile Management/CustomerDetails";
// import SignupPage from "./Shared Admin&Customer/pages/SignUpPage";

function App() {
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
        <Route path="/Signup" component={CustomerDetails} />
      </Switch>
    </Router>
  );
}

export default App;
