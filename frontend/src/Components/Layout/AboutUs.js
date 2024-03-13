import React from 'react';
import './Aboutus.css'; // Import CSS file for styling
import { Button } from '@mui/material';
import { GitHub, Instagram, LinkedIn } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h2 className='headline'>About Us</h2>
      <p>Welcome to <strong>Our E-Commerce Website</strong>!</p>
      
      <p>At <strong>Our E-Commerce Website</strong>, we're passionate about providing you with an exceptional online shopping experience. Whether you're searching for the latest fashion trends, high-quality electronics, or unique home decor items, we've got you covered.</p>
      
      <h3>Our Mission</h3>
      <p>Our mission is to make online shopping convenient, enjoyable, and secure for everyone. We strive to offer a diverse selection of products at competitive prices while maintaining the highest standards of customer service.</p>
      
      <h3>Why Choose Us?</h3>
      <ul>
        <li><strong>Wide Selection:</strong> Browse through thousands of products across various categories, ensuring that you find exactly what you're looking for.</li>
        <li><strong>User-Friendly Interface:</strong> Our website is designed with you in mind. Enjoy seamless navigation, intuitive search functionalities, and a hassle-free checkout process.</li>
        <li><strong>Quality Assurance:</strong> We partner with trusted brands and suppliers to deliver only the highest quality products to our customers.</li>
        <li><strong>Secure Transactions:</strong> Your privacy and security are our top priorities. Shop with confidence knowing that your personal information is protected through state-of-the-art encryption technology.</li>
      </ul>
      
      <h3>Our Team</h3>
      <p>Behind every successful purchase is a dedicated team committed to your satisfaction. From customer support representatives to logistics experts, our team works tirelessly to ensure that your shopping experience exceeds your expectations.</p>
      
      <h3>Get in Touch</h3>
      <p>Have questions or feedback? We'd love to hear from you! Contact our friendly customer support team via email, phone, or live chat, and we'll be happy to assist you.</p>
      
      <p>Thank you for choosing <strong>Our E-Commerce Website</strong>. Happy shopping!</p>
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
          <Button variant="contained">
            <LinkedIn />
            <Link
              to="https://www.linkedin.com/in/amit-landge-a28159249"
              target="_blank"
              style={{ color: "white" }}
            >
              Linkdin
            </Link>
          </Button>
        </div>
    </div>
  );
};

export default AboutUs;

