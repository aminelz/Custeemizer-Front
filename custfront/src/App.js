import React from "react";
import "./App.css";
import Tshirtlist from "./components/Tshirtlist";
import Header from "./components/Header";
import Cartlist from "./components/Cartlist";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//Pages to be routed
import CartPage from "./pages/Cart";
import HomePage from "./pages/Home";

//import Userlist from "./components/Userlist";

function App() {
  return (
    <Router>
      <Route path="/Cart" component={CartPage} />
      <Route path="/" component={HomePage} />
    </Router>
  );
}

export default App;
