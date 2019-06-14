import React from 'react';
import { connect } from 'react-redux';

import NavBarUser from '../navbar/NavBarUser';

function MyBookings(props) {
  const sendText = () => {
    fetch(`http://localhost:5000/api/send-text`).then(console.log('clicked'));
  };

  return (
    <div>
      <NavBarUser />
      <div className="main-body">
        <h1>MyBookings Page</h1>
        <p>Twilio SMS Testing</p>
        <button onClick={sendText}>Click to send text</button>
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
