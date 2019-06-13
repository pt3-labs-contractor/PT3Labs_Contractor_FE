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

import dateFns from 'date-fns';

import {
  fetchSchedule,
  fetchAvailabilityByDay,
  sortContractorsByService,
  storeServiceName,
} from '../../actions/index';

function UserLandingPage(props) {
  const [contractor, setContractor] = useState({});
  const [time, setTime] = useState({});
  const [service, setService] = useState({});
  const [serviceSort, setServiceSort] = useState('Pick a service');

  useEffect(() => {
    const dateString = dateFns.format(props.selectedDay, 'YYYY-MM-DD');
    props.fetchAvailabilityByDay(dateString);
    clearAppointment();
    // eslint-disable-next-line
  }, [props.selectedDay, serviceSort]);

  useEffect(() => {
    contractor.id && props.fetchSchedule(contractor.id);
    // eslint-disable-next-line
  }, [contractor]);

  const selectContractor = item => {
    setContractor(item);
    const filter = item.services.filter(service => {
      return service.name === serviceSort;
    });
    setService(filter[0]);
  };

  const selectTime = item => {
    setTime(item);
    console.log('appointment', item);
  };

  const handleSort = event => {
    setServiceSort(event.target.value);
    props.storeServiceName(event.target.value);
    clearAppointment();
  };

  const clearAppointment = () => {
    setService({});
    setTime({});
    setContractor({});
  };

  return (
    <div className="user container">
      <form>
        <select value={serviceSort} onChange={handleSort}>
          <option value="">Pick a service</option>
          <option value="electrical">Electrical</option>
          <option value="plumbing">Plumbing</option>
          <option value="landscaping">Landscaping</option>
          <option value="carpentry">Carpentry</option>
          <option value="health and beauty">Health and beauty</option>
          <option value="masonry">Masonry</option>
          <option value="roofing and siding">Roofing and Siding</option>
        </select>
      </form>
      <div className="user-calendar">
        <Calendar user />
        <ContractorList userLanding selectContractor={selectContractor} />
        {contractor.id && (
          <AvailabilityList
            setAppointment={selectTime}
            // selectedDay={props.selectedDay}
          />
        )}
        {contractor.id && time.id && (
          <AppointmentForm
            user
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
    sorted: state.sortedContractors,
    selectedDay: state.thisDay,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchSchedule,
    fetchAvailabilityByDay,
    sortContractorsByService,
    storeServiceName,
  }
)(UserLandingPage);
