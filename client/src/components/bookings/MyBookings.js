import React, { useState, useEffect } from 'react';

import moment from 'moment';
import { connect } from 'react-redux';

import NavBarUser from '../navbar/NavBarUser';
import TopNavbar from '../navbar/TopNavbar';
import { confirmApp, fetchAccts, deleteApp } from '../../actions/index';
import './MyBookings.css';

function MyBookings(props) {
  const [confirmed, setConfirmed] = useState([]);
  const { appointments } = props;

  useEffect(() => {
    // console.log(appointments);
    const filteredAp = appointments.filter(app => app.confirmed);
    appointments.forEach(app => {
      // console.log(app.confirmed);
    });
    setConfirmed(filteredAp);
  }, [appointments]);


  function cancelApp(id) {
    // e.preventDefault();
    // console.log(app.id)
    props.deleteApp(appointments, id)
  }

  return (
    <>
      <TopNavbar />
      <NavBarUser />
      <div className="main-body">
        <div className="booking-container">
          <h2 className="main-header-title">Appointment Summary</h2>

          <div className="app-container">
            {appointments ?
            appointments.map(app => 
              <div>
                  <p>You have an appointment with {app.contractorName}</p>
                  <p> On: {moment(app.startTime).format('MMMM Do')} @ {moment(app.startTime).format('h:mm a')} 
                  </p>
                  <p>For: {app.service}</p>
                  {app.confirmed === null 
                    ? <p>Not confirmed yet</p> 
                    : <p>Contractor confirmed!</p>}

                <button className="cancel-app-button" onClick={e => cancelApp(app.id)}>Cancel</button>
                </div>
              )
              : null}
          </div>
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
  { confirmApp, fetchAccts, deleteApp }
)(MyBookings);
