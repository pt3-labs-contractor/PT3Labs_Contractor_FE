import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Settings from './components/settings/Settings';


function NavBarContractor() {
    return (
      <div>
          <h3>NavBarContractor</h3>
          <Link to={'/calendar'}>Appointments</Link>
          <Link to={'/contractorFeedback'}>Feedback</Link>
          <Link to={'/billing'}>Billing</Link>
          <Link to={'/settings'}>Settings</Link>
          <button>Log Out</button>

      </div>
    )
  }
  

export default connect()(NavBarContractor);