import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../calendar/Calendar';
import AppointmentList from '../appointments/AppointmentList';
import './UserLandingPage.css';

function UserLandingPage(props) {
  return (
    <div className="user container">
      <Link to="/app/contractors">Select a contractor</Link>
      <Calendar />
      <AppointmentList />
    </div>
  );
}

export default UserLandingPage;
