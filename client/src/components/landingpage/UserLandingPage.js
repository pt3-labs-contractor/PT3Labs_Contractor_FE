import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Calendar from '../calendar/Calendar';
import AppointmentList from '../appointments/AppointmentList';
import ContractorList from '../contractors/ContractorList';
import AvailabilityList from '../appointments/AvailabilityList';
import AppointmentForm from '../appointments/AppointmentForm';
// import ContractorCard from '../contractors/ContractorCard';
import './UserLandingPage.css';

import { fetchSchedule } from '../../actions/index';

function UserLandingPage(props) {
  const [showList, setShowList] = useState(false);
  const [contractor, setContractor] = useState({});
  const [time, setTime] = useState({});
  const [service, setService] = useState({});

  useEffect(() => {
    contractor.id && props.fetchSchedule(contractor.id);
    // eslint-disable-next-line
  }, [contractor]);

  const selectContractor = item => {
    setContractor(item);
  };

  const selectTime = item => {
    setTime(item);
  };

  const selectService = item => {
    setService(item);
    console.log('fired', item);
  };

  const clearAppointment = () => {
    setService({});
    setTime({});
    setContractor({});
  };

  return (
    <div className="user container">
      <button onClick={() => setShowList(!showList)}>
        Select a contractor
      </button>
      <div className="user-calendar">
        <Calendar user />
        {showList ? <ContractorList /> : null}
        <ContractorList
          userLanding
          selectService={selectService}
          selectContractor={selectContractor}
        />
        {contractor.id && (
          <AvailabilityList
            setAppointment={selectTime}
            selectedDay={props.selectedDay}
          />
        )}
        {contractor.id && service.id && time.id && (
          <AppointmentForm
            contractor={contractor.id}
            clearAppointment={clearAppointment}
            appointment={time}
            service={service}
          />
        )}
      </div>
      <AppointmentList />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    contractors: state.sortedContractors,
    selectedDay: state.thisDay,
  };
};

export default connect(
  mapStateToProps,
  { fetchSchedule }
)(UserLandingPage);
