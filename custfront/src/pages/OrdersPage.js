import React from "react";
import Header from "../components/Common/Header";
import OrderList from "../components/Cart&Order/OrderList";
import OrderDetails from "../components/Cart&Order/OrderDetails";

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
