import React from "react";
import Cartlist from "../components/Cartlist";
import Tshirtlist from "../components/Tshirtlist";
import Header from "../components/Header";

function HomePage() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Tshirtlist />
      </div>
    </div>
  );
}

export default HomePage;
