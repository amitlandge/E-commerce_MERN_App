import React from "react";
import "./Main.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const Main = () => {
  return (
    <div className="main-page">
      <section class="hero">
        <div class="hero-content">
          <h1>E-Commerce For Everyone</h1>
          <p>Discover the latest trends and shop with confidence.</p>
          <Button variant="contained">
            <Link to="/products" style={{ color: "white" }}>
              Shop Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Main;
