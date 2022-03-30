import React from 'react';
import './navbar.css';

const UserLoginNavbar = () => (
  <div className="gpt3__navbar">
    <div className="gpt3__navbar-links">
      <div className="gpt3__navbar-links_container">
        <p><a href="/">Home</a></p>
        <p><a href="/add_referral" >Add referral</a></p>
        <p><a href="/dashboard">Dashboard</a></p>
      </div>
    </div>
    <div className="gpt3__navbar-sign">
      <p><a href="/logout">logout</a></p>
    </div>
  </div>
);

export default UserLoginNavbar;