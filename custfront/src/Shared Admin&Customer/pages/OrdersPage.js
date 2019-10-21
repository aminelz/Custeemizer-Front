import React from "react";
import Header from "../../CustomerSide/Common/Header";
import OrderList from "../../AdminSide/Manage Orders/OrderList";
import OrderDetails from "../../Shared Admin&Customer/Cart&Order/OrderDetails";

function OrdersPage({ match }) {
  const allorders = (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Orders</h1>
        <OrderList />
      </div>
    </div>
  );
  const orderdetails = (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Orders</h1>
        <OrderDetails />
      </div>
    </div>
  );
  if (match.path === "/Orders") {
    return allorders;
  } else if (match.path.includes("/Order/")) {
    return orderdetails;
  }
}

export default OrdersPage;
