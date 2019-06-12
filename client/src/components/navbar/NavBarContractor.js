import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import Settings from './components/settings/Settings';

function NavBarContractor() {
  return (
    // <div>
    //   <nav className="navbar bg-dark">
    //     <NavLink to="/">
    //       <h1>
    //         <i className="far fa-calendar-alt"> Digital Calendar- contractor</i>
    //       </h1>
    //     </NavLink>
    //     <ul>
    //       <li>
    //         <NavLink to="/calendar">Appointments</NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/contractorFeedback">Feedback</NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/billing">Billing</NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/settings">Setting</NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/">Log Out</NavLink>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
    <div className="sideNav">
      <NavLink to="/" className="side-link">
        <i className="fas fa-home" />
        <span className="side-listing"> Home</span>
      </NavLink>
      <NavLink
        to="/contractorschedule"
        className="side-link"
        activeClassName="current"
      >
        <i className="far fa-calendar-alt" />
        <span className="side-listing"> My Schedule</span>
      </NavLink>
      <NavLink
        to="/contractorfeedback"
        className="side-link"
        activeClassName="current"
      >
        <i className="fas fa-users" />
        <span className="side-listing"> My Feedback</span>
      </NavLink>
      <NavLink to="/billing" className="side-link" activeClassName="current">
        <i className="fas fa-money-check-alt" />
        <span className="side-listing"> Billing</span>
      </NavLink>
      <NavLink
        to="/contractorsettings"
        className="side-link"
        activeClassName="current"
      >
        <i className="fas fa-user-cog" />
        <span className="side-listing"> Settings</span>
      </NavLink>
    </div>
  );
}

export default connect()(NavBarContractor);
