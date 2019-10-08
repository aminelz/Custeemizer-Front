import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Pages to be routed
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import UserPage from "./pages/UserPage";
import CustomerInfo from "./components/Customer/CustomerInfo";
import TshirtPage from "./pages/TshirtPage";
//import Userlist from "./components/Userlist";

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
        <Route path="/Customer/:id" exact component={CustomerInfo} />
        <Route path="/Tshirts/:sex" component={TshirtPage} />
      </Switch>
    </Router>
  );
}

export default App;
