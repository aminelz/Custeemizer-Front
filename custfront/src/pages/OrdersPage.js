import React from "react";
import Header from "../components/Common/Header";
import OrderList from "../components/Cart&Order/OrderList";

function OrdersPage() {
  return (
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
}

export default OrdersPage;
