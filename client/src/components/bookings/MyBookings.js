import React from 'react';
import { connect } from 'react-redux';

import NavBarUser from '../navbar/NavBarUser';
import TopNavbar from '../navbar/TopNavbar';
import './MyBookings.css';

function MyBookings(props) {
  const sendText = () => {
    fetch(`http://localhost:5000/api/send-text`).then(console.log('clicked'));
  };

  return (
    <div>
      <TopNavbar />
      <NavBarUser />
      <div className="main-body">
        <h1>MyBookings Page</h1>
        <p>Twilio SMS Testing</p>
        <button onClick={sendText}>Click to send text</button>

        <div className="appointment-info">
          <div className="appointment-heading">
            <h4>Appointment Info</h4>
          </div>
          <div className="appointment-body">
            <div className="appointment-item">
              <h4>Contractor</h4>
            </div>
            <div className="appointment-item">
              <h4>Service</h4>
            </div>
            <div className="appointment-item">
              <h4>Date</h4>
            </div>
            <div className="appointment-item">
              <h4>Time</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    contractors: state.contractors,
    user: state.user,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(mapStateToProps)(MyBookings);
