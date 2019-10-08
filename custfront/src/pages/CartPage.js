import React from "react";
import Cartlist from "../components/Cart&Order/CartList";
import Header from "../components/Common/Header";

function CartPage() {
  console.log(this.props);
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}> Cart</h1>
        <Cartlist />
      </div>
    </div>
  );
}

export default CartPage;
