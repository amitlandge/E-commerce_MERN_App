import { GitHub, Instagram } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Aboutus.css";
const AboutUs = () => {
  return (
    <div>
      <div className="aboutus-container">
        <div>
          <img
            alt="user"
            src="https://res.cloudinary.com/dow92cdi4/image/upload/v1703226249/amit08_powf1n.jpg"
            className="aboutus-image"
          />
        </div>
        <h1>Amit Landge</h1>
        <h2>amitlandge333@gmail.com</h2>
        <div className="aboutus-links">
          <Button variant="outlined">
            <Instagram />
            <Link to="https://www.instagram.com/_amit333_/" target="_blank">
              Instagram
            </Link>
          </Button>
          <Button variant="contained" color="success">
            <GitHub />
            <Link
              to="https://github.com/amitlandge"
              target="_blank"
              style={{ color: "white" }}
            >
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
