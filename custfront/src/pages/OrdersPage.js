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
        <OrderList />
      </div>
    </div>
  );
}

export default OrdersPage;
