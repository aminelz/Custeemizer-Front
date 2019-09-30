import React from "react";
import Cartlist from "../components/Cartlist";
import Header from "../components/Header";

function CartPage() {
  return (
    <div>
      <Header />
      <h1> MY CART</h1>
      <Cartlist />
    </div>
  );
}

export default CartPage;
