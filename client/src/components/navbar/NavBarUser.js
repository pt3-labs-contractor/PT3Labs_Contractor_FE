import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBarUser.css';

function NavBarUser() {
  return (
    <div>
      <nav className="navbar bg-dark">
        <NavLink to="/">
          <h1>
            <i className="far fa-calendar-alt"> Digital Calendar - user</i>
          </h1>
        </NavLink>
        <ul>
          <li>
            <NavLink to="/calendar">Calendar</NavLink>
          </li>
          <li>
            <NavLink to="/userFeedback">Feedback</NavLink>
          </li>
          <li>
            <NavLink to="/app/contractors">Contractors</NavLink>
          </li>
          <li>
            <NavLink to="/">Log Out</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default connect()(NavBarUser);
