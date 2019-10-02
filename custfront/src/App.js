import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Pages to be routed
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";

//import Userlist from "./components/Userlist";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Mycart" component={CartPage} />
        <Route path="/Orders" component={OrdersPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
