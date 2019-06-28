import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import NavBarUser from '../navbar/NavBarUser';
import TopNavbar from '../navbar/TopNavbar';
import { confirmApp, fetchAccts } from '../../actions/index';
import './MyBookings.css';

function MyBookings(props) {
  return (
    <>
      <TopNavbar />
      <NavBarUser />
      <div className="main-body">
        <div className="booking-container">
          <h2 className="main-header-title">Appointment Summary</h2>
        </div>
      </div>
    </>
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

export default connect(
  mapStateToProps,
  { confirmApp, fetchAccts }
)(MyBookings);
