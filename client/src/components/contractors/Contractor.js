import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Calendar from '../calendar/Calendar';
import ContractorCard from './ContractorCard';
import AvailabilityList from '../appointments/AvailabilityList';
import AppointmentForm from '../appointments/AppointmentForm';
import FeedbackList from '../feedback/FeedbackList';

import './Contractor.css';

import {
  selectSingleContractorSetting,
  fetchSchedule,
  getFeedbackByContractor,
} from '../../actions/index';
import TopNavbar from '../navbar/TopNavbar';

function Contractor(props) {
  const [service, setService] = useState({ name: 'Pick a service' });
  const [appointment, setAppointment] = useState({});
  const [mediaQuery] = useState(window.innerWidth);
  const mql = window.matchMedia('(max-width: 800px)').matches;
  const { id } = props.match.params;

  window.addEventListener('resize', () => {
    if (
      (window.innerWidth <= 800 && mediaQuery > 800) ||
      (mediaQuery < 800 && window.innerWidth > 800)
    ) {
      window.location.reload();
    }
  });

  useEffect(() => {
    Promise.all([
      props.selectSingleContractorSetting(id),
      props.fetchSchedule(id),
      props.getFeedbackByContractor(id),
    ]);
    // eslint-disable-next-line
  }, [props.list]);

  const makeAppointment = date => {
    setAppointment(date);
  };

  const clearAppointment = () => {
    setAppointment({});
    setService({});
  };

  return (
    <>
      <TopNavbar />
      <div className="contractor-container">
        <ContractorCard full contractor={props.contractor} />
        <div className="services-container">
          {Object.keys(props.contractor).length > 0
            ? props.contractor.services.map(service => (
                <div
                  className="service"
                  key={service.id}
                  onClick={() => setService(service)}
                >
                  <p className="service-title">{service.name}</p>
                  <p>{service.price}</p>
                </div>
              ))
            : null}
        </div>
        <div className="contractor-calendar">
          <Calendar contractor={props.contractor} schedule={props.schedule} />
          <AvailabilityList
            contractor
            selectedDay={props.selectedDay}
            setAppointment={makeAppointment}
          />
        </div>
        <AppointmentForm
          contractor={id}
          clearAppointment={clearAppointment}
          appointment={appointment}
          service={service}
        />
        {!mql && <FeedbackList />}
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    contractor: state.thisContractor,
    services: state.services,
    selectedDay: state.thisDay,
    schedule: state.schedule,
    error: state.errorSchedule,
  };
};

export default connect(
  mapStateToProps,
  { selectSingleContractorSetting, fetchSchedule, getFeedbackByContractor }
)(Contractor);

Contractor.propTypes = {
  contractor: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    city: PropTypes.string,
    stateAbbr: PropTypes.string,
    streetAddress: PropTypes.string,
    zipCode: PropTypes.string,
    userScore: PropTypes.number,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    createdAt: PropTypes.string,
    services: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        contractorId: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.string,
        createdAt: PropTypes.string,
      })
    ),
  }),
  selectedDay: PropTypes.instanceOf(Date),
  schedule: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      contractorId: PropTypes.string,
      startTime: PropTypes.string,
      duration: PropTypes.shape({
        hours: PropTypes.number,
      }),
      createdAt: PropTypes.string,
      open: PropTypes.bool,
    })
  ),
  fetchSchedule: PropTypes.func,
  getFeedbackByContractor: PropTypes.func,
  selectSingleContractorSetting: PropTypes.func,
};
