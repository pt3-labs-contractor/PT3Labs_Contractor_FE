import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Calendar from '../calendar/Calendar';
import AppointmentList from '../appointments/AppointmentList';
import ContractorList from '../contractors/ContractorList';
import AvailabilityList from '../appointments/AvailabilityList';
import AppointmentForm from '../appointments/AppointmentForm';
// import ContractorCard from '../contractors/ContractorCard';
import TopNavbar from '../navbar/TopNavbar';
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
  const [currentTarget, setTarget] = useState(0);
  const serviceTarget = useRef(null);
  const calendarTarget = useRef(null);
  const contractorTarget = useRef(null);
  const availabilityTarget = useRef(null);
  const appointmentTarget = useRef(null);
  const targets = [
    serviceTarget,
    calendarTarget,
    contractorTarget,
    availabilityTarget,
    appointmentTarget,
  ];
  const mql = window.matchMedia('(max-width: 600px)').matches;
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
    if (mql) {
      const container = document.querySelector('.user.container');
      container.addEventListener('touchmove', e => {
        e.preventDefault();
      });
      container.addEventListener('wheel', e => {
        e.preventDefault();
      });
      scroll(serviceTarget.current);
      setTarget(0);
    }
  }, []);

  useEffect(() => {
    const dateString = dateFns.format(props.selectedDay, 'YYYY-MM-DD');
    props.fetchAvailabilityByDay(dateString);
    clearAppointment();
    // eslint-disable-next-line
  }, [props.selectedDay, serviceSort]);

  useEffect(() => {
    if (serviceSort !== 'Pick a service' && mql) {
      scroll(contractorTarget.current);
    }
  }, [props.selectedDay]);

  useEffect(() => {
    setTime({});
    contractor.id && props.fetchSchedule(contractor.id);
    // eslint-disable-next-line
  }, [contractor]);

  const selectContractor = item => {
    setContractor(item);
    const filter = item.services.filter(service => {
      return service.name === serviceSort;
    });
    setService(filter[0]);
    mql && scroll(availabilityTarget.current);
  };

  const selectTime = item => {
    setTime(item);
    mql && scroll(appointmentTarget.current);
  };

  const scroll = element => {
    const y = element.getBoundingClientRect().top + window.scrollY;
    window.scroll({
      top: y,
      behavior: 'smooth',
    });
    setTarget(currentTarget + 1);
  };

  const scrollBack = () => {
    console.log(targets[1].current);
    scroll(targets[currentTarget - 1].current);
    setTarget(currentTarget - 1);
  };

  const handleSort = event => {
    console.log(event.target.value);
    setServiceSort(event.target.value);
    props.storeServiceName(event.target.value);
    clearAppointment();
    mql && scroll(calendarTarget.current);
  };

  const clearAppointment = () => {
    setService({});
    setTime({});
    setContractor({});
  };

  return (
    <>
      <TopNavbar />
      <div className="user container">
        {mql ? (
          <div ref={serviceTarget} className="service-list">
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
        <div className="user-calendar">
          <div className="calendar-target" ref={calendarTarget}>
            <Calendar user />
          </div>
          <div className="contractor-target" ref={contractorTarget}>
            <ContractorList userLanding selectContractor={selectContractor} />
          </div>
          <div className="availability-target" ref={availabilityTarget}>
            <AvailabilityList setAppointment={selectTime} />
          </div>
          <div className="appointment-form-target" ref={appointmentTarget}>
            {contractor.id && time.id && (
              <AppointmentForm
                user
                contractor={contractor}
                clearAppointment={clearAppointment}
                appointment={time}
                service={service}
              />
            )}
          </div>
        </div>

        {mql && currentTarget > 0 ? (
          <div onClick={scrollBack} id="back-button">
            Back
          </div>
        ) : null}
        {!mql && <AppointmentList />}
      </div>
    </>
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
