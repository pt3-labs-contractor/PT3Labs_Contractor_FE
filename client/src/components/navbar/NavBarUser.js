import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBarUser.css';

function NavBarUser() {
  return (
    <div className="sideNav">
      <NavLink to="/" className="side-link">
        <i className="fas fa-home" />
        <span className="side-listing"> Home</span>
      </NavLink>
      <NavLink to="/app" className="side-link" activeClassName="current">
        <i className="fas fa-calendar-alt" />
        <span className="side-listing"> Schedule</span>
      </NavLink>
      <NavLink to="/mybookings" className="side-link" activeClassName="current">
        <i className="fas fa-book" />
        <span className="side-listing"> My Bookings</span>
      </NavLink>
      <NavLink
        to="/userFeedback"
        className="side-link"
        activeClassName="current"
      >
        <i className="fas fa-users" />
        <span className="side-listing"> Feedback</span>
      </NavLink>
      <NavLink to="/settings" className="side-link" activeClassName="current">
        <i className="fas fa-user-cog" />
        <span className="side-listing"> Settings</span>
      </NavLink>
      <NavLink to="/app/contractors">Contractors</NavLink>
    </div>
  );
}

export default connect()(NavBarUser);
