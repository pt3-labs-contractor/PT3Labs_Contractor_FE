import React, { useState } from 'react';
import dateFns from 'date-fns';

import ConfirmModal from './ConfirmModal';

function AppointmentForm(props) {
  const [confirm, setConfirm] = useState(false);
  const { startTime } = props.appointment;

  function postAppointment() {
    console.log('It worked!');
    setConfirm(false);
  }

  return (
    <div>
      <p>
        {dateFns.isValid(new Date(startTime))
          ? dateFns.format(startTime, 'MMM Do [at] HH:mm')
          : 'Select date and time.'}
      </p>
      <p>
        {props.service.name
          ? `${props.service.name}: ${props.service.price}`
          : null}
      </p>
      {dateFns.isValid(new Date(startTime)) && props.service.name ? (
        <button onClick={() => setConfirm(true)}>Set Appointment</button>
      ) : null}
      <ConfirmModal confirm={confirm} postAppointment={postAppointment} />
    </div>
  );
}

export default AppointmentForm;
