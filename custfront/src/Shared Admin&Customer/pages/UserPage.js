import React from "react";
import Customerlist from "../../AdminSide/Manage Profiles/CustomerList";
import Header from "../../CustomerSide/Common/Header";
import Adminlist from "../../AdminSide/Manage Profiles/AdminList";
import CustomerInfo from "../../AdminSide/Manage Profiles/CustomerInfo";

function UserPage({ match }) {
  const returnadmin = (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Users</h1>
        <Adminlist />
      </div>
    </div>
  );
  const returncustomer = (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Users</h1>
        <Customerlist />
      </div>
    </div>
  );
  const returncustomerinfo = (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Users</h1>
        <CustomerInfo />
      </div>
    </div>
  );

  if (match.path === "/Customers") {
    return returncustomer;
  } else if (match.path === "/Admins") {
    return returnadmin;
  } else if (match.path.includes("/Customer/")) {
    return returncustomerinfo;
  }
}

export default UserPage;
