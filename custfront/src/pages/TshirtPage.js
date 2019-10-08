import React from "react";
import TshirtCategory from "../components/Tshirt/TshirtCategory";
import Header from "../components/Common/Header";
import TshirtFullDetails from "../components/Tshirt/TshirtFullDetails";

function TshirtPage(props) {
  const returnAll = (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Tshirt Selection</h1>
        <TshirtCategory />
      </div>
    </div>
  );
  const returnDetails = (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Tshirt Selection</h1>
        <TshirtFullDetails />
      </div>
    </div>
  );
  const path = props.match.path;
  if (path.includes("/Tshirts/")) {
    return returnAll;
  } else if (path.includes("/Tshirt/")) {
    return returnDetails;
  }
}

export default TshirtPage;
