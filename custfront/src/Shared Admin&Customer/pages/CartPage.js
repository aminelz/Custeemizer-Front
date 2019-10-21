import React from "react";
import Cartlist from "../../Shared Admin&Customer/Cart&Order/CartList";
import Header from "../../CustomerSide/Common/Header";

function CartPage() {
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
