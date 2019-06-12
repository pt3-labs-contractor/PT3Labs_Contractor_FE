import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Calendar from '../calendar/Calendar';
import ContractorCard from './ContractorCard';
import AvailabilityList from '../appointments/AvailabilityList';
import NavBarUser from '../navbar/NavBarUser';
import AppointmentForm from '../appointments/AppointmentForm';

import './Contractor.css';

import {
  selectSingleContractorSetting,
  fetchSchedule,
  fetchServices,
} from '../../actions/index';

function Contractor(props) {
  const [service, setService] = useState({});
  const [appointment, setAppointment] = useState({});
  const { id } = props.match.params;

  useEffect(() => {
    Promise.all([
      props.selectSingleContractorSetting(id),
      props.fetchSchedule(id),
      props.fetchServices(id),
    ]);
    // eslint-disable-next-line
  }, []);

  const makeAppointment = date => {
    setAppointment(date);
  };

  const clearAppointment = () => {
    setAppointment({});
    setService({});
  };

  return (
    <>
      <NavBarUser />
      <div className="contractor-container">
        <ContractorCard contractor={props.contractor} />
        <div className="services-container">
          {props.services.map(service => (
            <div key={service.id} onClick={() => setService(service)}>
              <p>{service.name}</p>
              <p>{service.price}</p>
            </div>
          ))}
        </div>
        <div className="contractor-calendar">
          <Calendar contractor={props.contractor} schedule={props.schedule} />
          <div className="availability-list">
            <AvailabilityList
              contractor
              selectedDay={props.selectedDay}
              setAppointment={makeAppointment}
            />
          </div>
        </div>
        <AppointmentForm
          contractor={id}
          clearAppointment={clearAppointment}
          appointment={appointment}
          service={service}
        />
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
  { selectSingleContractorSetting, fetchSchedule, fetchServices }
)(Contractor);
