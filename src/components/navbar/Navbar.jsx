import React from 'react';
import './navbar.css';

const Navbar = () => (
  <div className="gpt3__navbar">
    <div className="gpt3__navbar-links">
      <div className="gpt3__navbar-links_container">
        <p><a href="/">Home</a></p>
        <p><a href="/add_referral">Add referral</a></p>
        <p><a href="/dashboard">Dashboard</a></p>
      </div>
    </div>
    <div className="gpt3__navbar-sign">
      <p>Sign in</p>
      <p><a href="/signup">Sign-UP</a></p>
    </div>
  </div>
);

export default Navbar;
