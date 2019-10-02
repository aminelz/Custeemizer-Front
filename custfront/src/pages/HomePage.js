import React from "react";
import Tshirtlist from "../components/Tshirt/Tshirtlist";
import Header from "../components/Common/Header";
import TshirtDetails from "../components/Tshirt/TshirtFullDetails";

function HomePage() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Tshirtlist />
      </div>
      <div>
        <TshirtDetails />
      </div>
    </div>
  );
}

export default HomePage;
