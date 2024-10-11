import React from "react";
import "./ProductItems.css";
import { Link } from "react-router-dom";

import { Card, Rating, Typography } from "@mui/material";

const ProductItems = ({
  name,

  price,
  rating,
  numberOfReviews,
  id,
  image,
}) => {
  console.log(image);

  return (
    <Link className="product-cart" to={`/product/${id}`}>
      <Card>
        <div class="card">
          <img src={image[0].url} alt="Product " className="cardImage" />

          <div class="card-content">
            <h2>{name}</h2>

            <Rating value={rating} readOnly={true} style={{ width: 90 }} />
            <Typography variant="body2" color="text.secondary">
              ( {numberOfReviews} Reviews )
            </Typography>
            <br></br>
            <span class="price">{price} Rs</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductItems;
