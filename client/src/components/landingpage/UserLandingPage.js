import React, { useState, useEffect, useRef } from 'react';
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
  const calendar = useRef(null);
  const mql = window.matchMedia('(max-width: 600px)');
  const serviceList = [
    'Electrical',
    'Plumbing',
    'Carpentry',
    'Landscaping',
    'Masonry',
    'Health and Beauty',
    'Roofing and Siding',
  ];

  useEffect(() => {
    const dateString = dateFns.format(props.selectedDay, 'YYYY-MM-DD');
    props.fetchAvailabilityByDay(dateString);
    clearAppointment();
    // eslint-disable-next-line
  }, [props.selectedDay, serviceSort]);

  useEffect(() => {
    if (serviceSort !== 'Pick a service' && mql) {
      scroll(document.getElementsByClassName('contractor-list')[0]);
    }
  }, [props.selectedDay]);

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
    mql && scroll(document.getElementsByClassName('availability-list')[0]);
  };

  const selectTime = item => {
    setTime(item);
    mql && scroll(document.getElementsByClassName('appointment-list')[0]);
  };

  const scroll = element => {
    const y = element.getBoundingClientRect().top + window.scrollY;
    window.scroll({
      top: y,
      behavior: 'smooth',
    });
  };

  const handleSort = event => {
    console.log(event.target.value);
    setServiceSort(event.target.value);
    props.storeServiceName(event.target.value);
    clearAppointment();
    mql && scroll(calendar.current);
  };

  const clearAppointment = () => {
    setService({});
    setTime({});
    setContractor({});
  };

  return (
    <div className="user container">
      {mql.matches ? (
        <div className="service-list">
          <h2>Pick a service</h2>
          {serviceList.map(service => (
            <button value={service.toLowerCase()} onClick={handleSort}>
              {service}
            </button>
          ))}
        </div>
      ) : (
        <form>
          <select value={serviceSort} onChange={handleSort}>
            <option value="">Pick a service</option>
            {serviceList.map(service => (
              <option key={service} value={service.toLowerCase()}>
                {service}
              </option>
            ))}
          </select>
        </form>
      )}
      <div ref={calendar} className="user-calendar">
        <Calendar user />
        <ContractorList userLanding selectContractor={selectContractor} />
        {/* {contractor.id && (
          <AvailabilityList
            setAppointment={selectTime}
            // selectedDay={props.selectedDay}
          />
        )} */}
        <AvailabilityList
          setAppointment={selectTime}
          // selectedDay={props.selectedDay}
        />
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
