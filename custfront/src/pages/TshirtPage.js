import React from "react";
import TshirtCategory from "../components/Tshirt/TshirtCategory";
import Header from "../components/Common/Header";

function TshirtPage() {
  const returnall = (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Home</h1>
        <TshirtCategory />
      </div>
    </div>
  );
  return returnall;
}

export default TshirtPage;
