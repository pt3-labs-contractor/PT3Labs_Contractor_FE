import React, { useState } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import axios from 'axios';
import PropTypes from 'prop-types';
import './AppointmentForm.css';

// import { postAppointment } from '../../actions';
import ConfirmModal from './ConfirmModal';

function AppointmentForm({ appointment, service, contractor, addAppointment }) {
  const [confirm, setConfirm] = useState(false);
  const { name, price = '$--' } = service;
  const { startTime } = appointment;

  function createAppointment(check) {
    if (check) {
      const bearer = `Bearer ${localStorage.getItem('jwt')}`;
      const headers = { authorization: bearer };
      let hours;
      let minutes;
      let dur;
      if (appointment.duration.hours) {
        hours = appointment.duration.hours;
      }
      if (appointment.duration.minutes) {
        minutes = Number(appointment.duration.minutes / 60) * 100;
        minutes = minutes.toFixed(0);
      }
      if (hours && minutes) {
        dur = `${hours}.${minutes}`;
      } else if (hours) {
        dur = `${hours}`;
      } else {
        dur = `${minutes}`;
      }
      const newAppointment = {
        contractorId: contractor.id,
        serviceId: service.id,
        scheduleId: appointment.id,
        startTime,
        duration: `${dur}h`,
      };
      setConfirm(false);
      addAppointment(newAppointment);
      // axios
      //   .post(
      //     'https://fierce-plains-47590.herokuapp.com/api/appointments',
      //     appointment,
      //     { headers }
      //   )
      //   .then(res => {
      //     console.log('Created!');
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  }
  return (
    <div className="appointment-form">
      <p>
        {/* {dateFns.format(startTime, 'MMM Do [at] HH:mm')} */}
        {dateFns.isValid(new Date(startTime))
          ? dateFns.format(startTime, 'MMM Do [at] HH:mm')
          : 'Select date and time.'}
      </p>
      <p className="service-title">
        {`${name}: ${price}`}
        {/* {props.service.name
          ? `${props.service.name}: ${props.service.price}`
          : null} */}
      </p>
      {dateFns.isValid(new Date(startTime)) &&
      !service.name.includes('service') ? (
        <button
          type="button"
          className="set-btn"
          onClick={() => setConfirm(true)}
        >
          Set Appointment
        </button>
      ) : null}
      {/* <button className="close-btn" onClick={props.clearAppointment}>
        X
      </button> */}
      <ConfirmModal confirm={confirm} postAppointment={createAppointment} />
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
  contractor: PropTypes.string,
  postAppointment: PropTypes.func,
};

AppointmentForm.defaultProps = {
  service: {
    name: 'Pick a service',
    price: '$--',
  },
  appointment: {
    id: null,
  },
  contractor: null,
  postAppointment: null,
};
