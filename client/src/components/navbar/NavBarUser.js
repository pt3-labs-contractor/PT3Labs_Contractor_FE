import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function NavBarUser() {
    return (
      <div>
          <h3>NavBarUser</h3>
          <Link to={'/calendar'}>Calendar</Link>
          <Link to={'/appointments'}>Appointments</Link>
          <Link to={'/userFeedback'}>Feedback</Link>
          <Link to={'/contractors'}>Contractors</Link>
          <button>Log Out</button>

      </div>
    )
  }
  

export default connect()(NavBarUser);