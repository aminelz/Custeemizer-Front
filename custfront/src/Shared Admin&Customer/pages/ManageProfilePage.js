import React from "react";
import CustomerDetails from "../../CustomerSide/Profile Management/CustomerDetails";
import Header from "../../CustomerSide/Common/Header";

function ManageProfilePage() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Cart</h1>
        <CustomerDetails />
      </div>
    </div>
  );
}

export default ManageProfilePage;
