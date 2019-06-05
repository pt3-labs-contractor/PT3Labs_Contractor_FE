import React from 'react';

function AppointmentForm(props) {
  return (
    <div>
      {props.appointment.startTime}
      {props.service.name}
    </div>
  );
}

export default AppointmentForm;
