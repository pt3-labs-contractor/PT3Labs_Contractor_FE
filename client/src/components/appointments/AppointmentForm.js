import React, { useState } from 'react';
import dateFns from 'date-fns';
import axios from 'axios';

import ConfirmModal from './ConfirmModal';

function AppointmentForm(props) {
  const [confirm, setConfirm] = useState(false);
  const { startTime } = props.appointment;

  function postAppointment(check) {
    if (check) {
      const bearer = `Bearer ${localStorage.getItem('jwt')}`;
      const headers = { authorization: bearer };
      const appointment = {
        contractorId: props.contractor,
        serviceId: props.service.id,
        scheduleId: props.appointment.id,
        startTime,
        duration: `${props.appointment.duration.hours}h`,
      };
      axios
        .post(
          'https://fierce-plains-47590.herokuapp.com/api/appointments',
          appointment,
          { headers }
        )
        .then(res => {
          console.log('Created!');
        })
        .catch(err => {
          console.log(err);
        });
    }
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
      <button onClick={props.clearAppointment}>X</button>
      <ConfirmModal confirm={confirm} postAppointment={postAppointment} />
    </div>
  );
}

export default AppointmentForm;
