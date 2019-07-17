import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import NavBarUser from '../navbar/NavBarUser';
import TopNavbar from '../navbar/TopNavbar';
import { confirmApp, fetchAccts } from '../../actions/index';
import './MyBookings.css';

function MyBookings(props) {
  const [appointments, setAppointmentsList] = useState(props.appointments)
  useEffect(() => {
    setAppointmentsList(props.appointments)
    console.log(appointments)
  }, [props.appointments])

  function cancelApp(e) {
    // console.log(e)
    e.preventDefault();
    // console.log(e)
    console.log(e)

  }

  return (
    <>
      <TopNavbar />
      <NavBarUser />
      <div className="main-body">
        <div className="booking-container">
          <h2 className="main-header-title">Appointment Summary</h2>

          <div>
            {/* {loading ? <p>Loading Appointments....</p> : null} */}
            {/* {error ? <p>{error}</p> : null} */}
            {appointments.map(app => 
                <div>
                  <p>You have an appointment with {app.contractorId}</p>
                  <p>On: {app.startTime}</p>
                  <p>For: {app.serviceId}</p>
                  {app.confirmed === null 
                    ? <p>Not confirmed yet</p> 
                    : <p>Contractor confirmed!</p>}

                <button onClick={cancelApp}>Cancel</button>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    contractors: state.contractors,
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
