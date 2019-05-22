import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Settings from './components/settings/Settings';


function NavBarContractor() {
    return (
      <div>
          <h3>NavBarUser</h3>
          <Link to={'/calendar'}>Appointments</Link>
          <Link to={'/contractorFeedback'}>Feedback</Link>
          <Link to={'/billing'}>Billing</Link>

          <Link to={'/settings'}>Settings</Link>

      </div>
    )
  }
  

export default connect()(NavBarContractor);