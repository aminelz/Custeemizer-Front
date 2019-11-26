import React from "react";
import PropTypes from "prop-types";

import "./TshirtDisplay.css";
import { Paper } from "@material-ui/core";
import TshirtQuickView from "./TshirtQuickView";

function TshirtDisplay(props) {
  const { tshirts } = props;

  return tshirts.map((tshirt, index) => (
    <div className="shelf-item" data-sku="12064273040195392" key={index}>
      <div className="shelf-item__thumb">
        <img src={tshirt.image_URL} alt="Cat Tee Black T-Shirt" />
      </div>
      <p className="shelf-item__title">{tshirt.name}</p>
      <div className="shelf-item__price">
        <div className="val">
          <b> {tshirt.price}</b> <small>MAD</small>
        </div>
      </div>
      <div className="shelf-item__buy-btn">
        <TshirtQuickView tshirt={tshirt} />
      </div>
    </div>

    // </Paper>
  ));
}

TshirtDisplay.propTypes = {
  tshirts: PropTypes.any.isRequired
};

export default TshirtDisplay;

// <Paper class="products">
// <div class="product-card">
//   <div class="product-image">
//     <img src={tshirt.image_URL} alt="Tshirt" />
//   </div>
//   <div class="product-info">
//     <h5>{tshirt.name}</h5>
//     <h6>
//       {tshirt.price} <b>MAD</b>
//     </h6>
//   </div>
// </div>
