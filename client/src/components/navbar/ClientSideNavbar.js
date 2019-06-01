import React from 'react';
import { NavLink } from 'react-router-dom';

import './ClientSideNavbar.css';

export default function ClientSideNavbar() {
  return (
    <aside className="sideNav">
      <NavLink to="/schedule" className="side-link">
        Schedule
      </NavLink>
      <NavLink to="/bookings" className="side-link">
        My Bookings
      </NavLink>
      <NavLink to="/feedback" className="side-link">
        Feedback
      </NavLink>
      <NavLink to="/settings" className="side-link">
        Settings
      </NavLink>
    </aside>
  );
}
