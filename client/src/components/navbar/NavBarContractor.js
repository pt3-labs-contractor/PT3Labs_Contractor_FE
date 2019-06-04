import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import Settings from './components/settings/Settings';

function NavBarContractor() {
  return (
    <div>
      <nav className="navbar bg-dark">
        <NavLink to="/">
          <h1>
            <i className="far fa-calendar-alt"> Digital Calendar- contractor</i>
          </h1>
        </NavLink>
        <ul>
          <li>
            <NavLink to="/calendar">Appointments</NavLink>
          </li>
          <li>
            <NavLink to="/contractorFeedback">Feedback</NavLink>
          </li>
          <li>
            <NavLink to="/billing">Billing</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Setting</NavLink>
          </li>
          <li>
            <NavLink to="/">Log Out</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default connect()(NavBarContractor);
