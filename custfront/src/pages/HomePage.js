import React from "react";
import Tshirtlist from "../components/Tshirt/TshirtList";
import Header from "../components/Common/Header";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Home</h1>
        <Tshirtlist />
      </div>
      <Link to="/Tshirts/Homme"> Homme </Link>
      <Link to="/Tshirts/Femme"> Femme </Link>
    </div>
  );
}

export default HomePage;
