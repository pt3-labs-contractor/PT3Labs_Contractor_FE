import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Calendar from '../calendar/Calendar';
import ContractorCard from './ContractorCard';
import AvailabilityList from '../appointments/AvailabilityList';

import {
  selectSingleContractorSetting,
  fetchSchedule,
} from '../../actions/index';

function Contractor(props) {
  const [selectedService, setService] = useState({});

  useEffect(() => {
    const { id } = props.match.params;
    Promise.all([
      props.selectSingleContractorSetting(id),
      props.fetchSchedule(id),
    ]);
    // eslint-disable-next-line
  }, []);

  const makeAppointment = () => {};

  return (
    <div>
      <ContractorCard contractor={props.contractor} />
      {props.services.map(service => (
        <div key={service.id} onClick={() => setService(service)}>
          <p>{service.name}</p>
          <p>{service.price}</p>
        </div>
      ))}
      <Calendar contractor={props.contractor} />
      <AvailabilityList selectedDay={props.selectedDay} />
      <div>{selectedService.name}</div>
    </div>
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
  { selectSingleContractorSetting, fetchSchedule }
)(Contractor);
