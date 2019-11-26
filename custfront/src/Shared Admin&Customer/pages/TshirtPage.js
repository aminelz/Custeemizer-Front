import React from "react";
// import TshirtCategory from "./TshirtCategory";
// import Header from "../CustomerSide/Common/Header";
// import TshirtFullDetails from "../../CustomerSide/Tshirt Management/TshirtFullDetails";

function TshirtPage(props) {
  const returnAll = (
    <div>
      <div>{/* <Header /> */}</div>
      <div>
        <h1 style={{ textAlign: "center" }}> Tshirt Selection</h1>
        {/* <TshirtCategory /> */}
      </div>
    </div>
  );
  const returnDetails = (
    <div>
      <div>{/* <Header /> */}</div>
      <div>
        <h1 style={{ textAlign: "center" }}> Tshirt Selection</h1>
        {/* <TshirtFullDetails /> */}
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
