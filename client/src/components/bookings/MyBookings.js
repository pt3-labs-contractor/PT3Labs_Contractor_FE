import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import NavBarUser from '../navbar/NavBarUser';
import TopNavbar from '../navbar/TopNavbar';
import { confirmApp, fetchAccts } from '../../actions/index';
import './MyBookings.css';

function MyBookings(props) {
  const [confirmed, setConfirmed] = useState([]);
  const { appointments } = props;

  useEffect(() => {
    console.log(appointments);
    const filteredAp = appointments.filter(app => app.confirmed);
    appointments.forEach(app => {
      console.log(app.confirmed);
    });
    setConfirmed(filteredAp);
  }, [appointments]);

  return (
    <>
      <TopNavbar />
      <NavBarUser />
      <div className="main-body">
        <div className="booking-container">
          <h2 className="main-header-title">Appointment Summary</h2>
          {confirmed.map(appointment => (
            <p>{appointment.id}</p>
          ))}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    appointments: state.appointments,
    user: state.user,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  { confirmApp, fetchAccts }
)(MyBookings);
