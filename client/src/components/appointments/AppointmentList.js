import React from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';

function AppointmentList(props) {
  return (
    <div className="main-body">
      <h3>Confirmed Appointments</h3>
      {props.appointments.map(item => (
        <div>
          <h5>{dateFns.format(item.appointmentDatetime, 'MMMM Do:')}</h5>
          <p>
            {`${dateFns.format(
              item.appointmentDatetime,
              'HH:mm'
            )} - ${dateFns.format(
              dateFns.addHours(item.appointmentDatetime, item.duration.hours),
              'HH:mm'
            )}`}
          </p>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    appointments: state.appointments,
  };
};

export default connect(mapStateToProps)(AppointmentList);
