import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Alumni Networking Portal connects graduates, fostering professional growth and collaboration.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/mainpage">Home</Link></li>
            <li><Link to="/myprofile">My Profile</Link></li>
            <li><Link to="/share">Share</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@alumniportal.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Alumni Networking Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;