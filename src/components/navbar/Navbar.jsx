import React from 'react';
import './navbar.css';

export default function Navbar() {
  const userStorage = localStorage.getItem('user');
  const userData = userStorage ? JSON.parse(userStorage) : {};

  const logout = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        {
          userData && userData.id ?
            <div className="gpt3__navbar-links_container">
              <p><a href="/">Home</a></p>
              <p><a href="/add_referral">Add referral</a></p>
              <p><a href="/dashboard">Dashboard</a></p>
            </div> :
            <div className="gpt3__navbar-links_container">
              <p><a href="/">Home</a></p>
            </div>
        }
      </div>
      <div className="gpt3__navbar-sign">
        {userData && userData.id ? (
          <p>
            <button type="button" onClick={logout}>Logout</button>
          </p>
        ) : (
          <p>
            <a href="/signin">Signin</a>
            <a className='ml-4' href="/signup">Signup</a>
          </p>
        )}
      </div>
    </div >
  )
}