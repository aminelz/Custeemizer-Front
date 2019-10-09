import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

//Pages to be routed
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import UserPage from "./pages/UserPage";
import TshirtPage from "./pages/TshirtPage";

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
      </Switch>
    </Router>
  );
}

export default App;
