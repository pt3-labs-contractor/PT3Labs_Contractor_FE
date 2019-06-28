import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Calendar from '../calendar/Calendar';
import ContractorCard from './ContractorCard';
import AvailabilityList from '../appointments/AvailabilityList';
import AppointmentForm from '../appointments/AppointmentForm';
// import NavBarContractor from '../navbar/NavBarContractor';

import './Contractor.css';

import {
  selectSingleContractorSetting,
  fetchSchedule,
  fetchServices,
} from '../../actions/index';
import TopNavbar from '../navbar/TopNavbar';

function Contractor(props) {
  const [service, setService] = useState({ name: 'Pick a service' });
  const [appointment, setAppointment] = useState({});
  const { id } = props.match.params;

  useEffect(() => {
    Promise.all([
      props.selectSingleContractorSetting(id),
      props.fetchSchedule(id),
      // props.fetchServices(id),
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
                  <p>
                    {service.name.charAt(0).toUpperCase() +
                      service.name.slice(1)}
                  </p>
                  <p>{service.price}</p>
                </div>
              ))
            : null}
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
