import React from "react";
import Tshirtlist from "../../CustomerSide/Tshirt Management/TshirtList";
import Header from "../../CustomerSide/Common/Header";

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
