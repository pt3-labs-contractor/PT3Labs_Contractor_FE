import React, { useState } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import './AppointmentForm.css';

import { postAppointment } from '../../actions';
import ConfirmModal from './ConfirmModal';

function AppointmentForm({
  appointment,
  service,
  contractor,
  postAppointment,
}) {
  const [confirm, setConfirm] = useState(false);
  const { name, price } = service;
  const { startTime } = appointment;

  function createAppointment(check) {
    if (check) {
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
      postAppointment(newAppointment);
    }
    setConfirm(false);
  }
  return (
    <div className="appointment-form">
      <p>
        {dateFns.isValid(new Date(startTime))
          ? dateFns.format(startTime, 'MMM Do [at] HH:mm')
          : 'Select date and time.'}
      </p>
      <p className="service-title">{`${name}: ${price}`}</p>
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
      <ConfirmModal confirm={confirm} postAppointment={createAppointment} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    sort: state.serviceFilter,
  };
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

export default connect(
  mapStateToProps,
  { postAppointment }
)(AppointmentForm);

AppointmentForm.propTypes = {
  service: PropTypes.objectOf(PropTypes.string),
  appointment: PropTypes.shape({
    id: PropTypes.string,
    contractorId: PropTypes.string,
    startTime: PropTypes.string,
    duration: PropTypes.object,
    createdAt: PropTypes.string,
  }),
  contractor: PropTypes.shape({
    city: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    stateAbbr: PropTypes.string,
    streetAddress: PropTypes.string,
    zipCode: PropTypes.string,
    services: PropTypes.arrayOf(
      PropTypes.shape({
        contractorId: PropTypes.string,
        createdAt: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.string,
      })
    ),
  }),
  postAppointment: PropTypes.func,
};
