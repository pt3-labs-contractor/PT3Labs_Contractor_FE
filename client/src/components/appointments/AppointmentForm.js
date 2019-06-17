import React, { useState } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import axios from 'axios';
import PropTypes from 'prop-types';

import ConfirmModal from './ConfirmModal';

function AppointmentForm(props) {
  const [confirm, setConfirm] = useState(false);
  const { startTime } = props.appointment;
  console.log(props.appointment);

  function postAppointment(check) {
    if (check) {
      const bearer = `Bearer ${localStorage.getItem('jwt')}`;
      const headers = { authorization: bearer };
      let hours;
      let minutes;
      let dur;
      if (props.appointment.duration.hours) {
        hours = props.appointment.duration.hours;
      }
      if (props.appointment.duration.minutes) {
        minutes = Number(props.appointment.duration.minutes / 60) * 100;
        minutes = minutes.toFixed(0);
      }
      if (hours && minutes) {
        dur = `${hours}.${minutes}`;
      } else if (hours) {
        dur = `${hours}`;
      } else {
        dur = `${minutes}`;
      }
      const appointment = {
        contractorId: props.contractor,
        serviceId: props.service.id,
        scheduleId: props.appointment.id,
        startTime,
        duration: `${dur}h`,
      };
      console.log(appointment);
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
  // console.log(props.appointment);
  return (
    <div className="appointment-form">
      <p>
        {dateFns.format(startTime, 'MMM Do [at] HH:mm')}
        {/* {dateFns.isValid(new Date(startTime))
          ? dateFns.format(startTime, 'MMM Do [at] HH:mm')
          : 'Select date and time.'} */}
      </p>
      <p>
        {`${props.service.name}: ${props.service.price}`}
        {/* {props.service.name
          ? `${props.service.name}: ${props.service.price}`
          : null} */}
      </p>
      {dateFns.isValid(new Date(startTime)) &&
      !props.service.name.includes('something') ? (
        <button onClick={() => setConfirm(true)}>Set Appointment</button>
      ) : null}
      <button onClick={props.clearAppointment}>X</button>
      <ConfirmModal confirm={confirm} postAppointment={postAppointment} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    sort: state.serviceFilter,
  };
};

export default connect(mapStateToProps)(AppointmentForm);

AppointmentForm.propTypes = {
  service: PropTypes.objectOf(PropTypes.string),
  appointment: PropTypes.shape({
    id: PropTypes.string,
    contractorId: PropTypes.string,
    startTime: PropTypes.string,
    duration: PropTypes.object,
    createdAt: PropTypes.string,
  }),
};

AppointmentForm.defaultProps = {
  service: {
    id: null,
    contractorId: null,
    name: 'Pick something motherlover',
    price: '$--',
    createdAt: null,
  },
  appointment: {
    startTime: 'Select date and time',
  },
};
