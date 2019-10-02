import React from "react";
import Cartlist from "../components/Cart&Order/Cartlist";
import Header from "../components/Common/Header";

function CartPage() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1> MY CART</h1>
        <Cartlist />
      </div>
    </div>
  );
}

export default CartPage;
