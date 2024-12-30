import React from 'react';
import { Link } from 'react-router-dom';

import '../components/Navbar.css';

const Navbar = () => {

  const isUserLoggedIn = !!localStorage.getItem('token'); // Check if token exists

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect the user to the login page
    window.location.href = '/login';
  };

  return (
    <div className="full-length-navbar">
  <div className="navbar-logo">
    <h2>MyApp</h2>
  </div>
  <ul className="navbar-links">
    <li><a href="/">Home</a></li>
    <li><a href="/register">Register</a></li>
    {!isUserLoggedIn && <li><a href="/login">Login</a></li>}
        {isUserLoggedIn && <li><a href="/profile">Profile</a></li>}
        {isUserLoggedIn && (
          <li onClick={handleLogout}>
            <a>Log Out</a>
          </li>
        )}
  </ul>
</div>
  );
};

export default Navbar;
