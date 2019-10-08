import React from "react";
import Tshirtlist from "../components/Tshirt/TshirtList";
import Header from "../components/Common/Header";

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
    </div>
  );
}

export default HomePage;
