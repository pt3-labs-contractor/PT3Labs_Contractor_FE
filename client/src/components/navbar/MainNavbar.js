import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavbar.css';

export default function MainNavbar() {
  return (
    <div>
      <header className="main-navbar">
        <div className="main-navbar-logo">
          <NavLink to="/">
            <h1>Digital Contractor</h1>
          </NavLink>
        </div>
        <nav className="main-navbar-items">
          <ul>
            <li>
              <NavLink to="/login">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/logout">Sign up</NavLink>
            </li>
            <li>
              <NavLink to="/contractors">Contractors</NavLink>
            </li>
            <li>
              <NavLink to="/user">User</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
