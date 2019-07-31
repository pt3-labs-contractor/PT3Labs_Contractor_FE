import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Calendar from '../calendar/Calendar';
import AppointmentList from '../appointments/AppointmentList';
import ContractorList from '../contractors/ContractorList';
import AvailabilityList from '../appointments/AvailabilityList';
import AppointmentForm from '../appointments/AppointmentForm';
import FeedbackList from '../feedback/FeedbackList';
import TopNavbar from '../navbar/TopNavbar';
import './UserLandingPage.css';

import dateFns from 'date-fns';

import {
  fetchAccts,
  fetchSchedule,
  fetchAvailabilityByDay,
  getFeedbackByContractor,
  storeServiceName,
  clearTempFeedbak,
  postAppointment,
} from '../../actions/index';

function UserLandingPage(props) {
  const [contractor, setContractor] = useState({});
  const [time, setTime] = useState({});
  const [service, setService] = useState({});
  const [serviceSort, setServiceSort] = useState('Pick a service');
  const [currentTarget, setTarget] = useState(0);
  const [mediaQuery, setMediaQuery] = useState(window.innerWidth);
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
  const mql = window.matchMedia('(max-width: 800px)').matches;
  const serviceList = [
    'Electrical',
    'Plumbing',
    'Carpentry',
    'Landscaping',
    'Masonry',
    'Health and Beauty',
    'Roofing and Siding',
  ];

  window.addEventListener('resize', () => {
    if (
      (window.innerWidth <= 800 && mediaQuery > 800) ||
      (mediaQuery < 800 && window.innerWidth > 800)
    ) {
      window.location.reload();
    }
  });

  useEffect(() => {
    props.clearTempFeedbak();
    if (mql) {
      const container = document.querySelector('.calendar-container');
      container.addEventListener('touchmove', e => {
        e.preventDefault();
      });
      container.addEventListener('wheel', e => {
        e.preventDefault();
      });
      scroll(serviceTarget.current);
      setTarget(0);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const dateString = dateFns.format(props.selectedDay, 'YYYY-MM-DD');
    props.fetchAvailabilityByDay(
      dateString,
      props.serviceFilter,
      props.contractors
    );
    clearAppointment();
    // eslint-disable-next-line
  }, [props.selectedDay, props.contractors, serviceSort]);

  useEffect(() => {
    setContractor({});
    if (serviceSort !== 'Pick a service' && mql) {
      scroll(contractorTarget.current);
    }
    // eslint-disable-next-line
  }, [props.selectedDay]);

  useEffect(() => {
    setTime({});
    if (contractor.id) {
      const { id } = contractor;
      Promise.all([props.getFeedbackByContractor(id), props.fetchSchedule(id)]);
    }
    // eslint-disable-next-line
  }, [contractor]);

  const selectContractor = item => {
    console.log('clicked contractor');
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
    scroll(targets[currentTarget - 1].current);
    setTarget(currentTarget - 1);
  };

  const handleSort = event => {
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

  const confirmAppointment = newAppointment => {
    props.postAppointment(newAppointment);
    clearAppointment();
    mql && props.history.push('mybookings');
  };

  return (
    <>
      <TopNavbar />
      <div className="calendar-container">
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
            <select
              className="select-service"
              value={serviceSort}
              onChange={handleSort}
            >
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
            {!mql && <FeedbackList temp />}
          </div>
          <div className="appointment-form-target" ref={appointmentTarget}>
            {contractor.id && time.id && (
              <AppointmentForm
                user
                contractor={contractor}
                addAppointment={confirmAppointment}
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
    contractors: state.contractors,
    serviceFilter: state.serviceFilter,
    sorted: state.sortedContractors,
    selectedDay: state.thisDay,
    serviceFilter: state.serviceFilter,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAccts,
    fetchSchedule,
    fetchAvailabilityByDay,
    getFeedbackByContractor,
    storeServiceName,
    clearTempFeedbak,
    postAppointment,
  }
)(UserLandingPage);

UserLandingPage.propTypes = {
  contractors: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  sorted: PropTypes.array, // This is just a sorted copy of contractors
  fetchAvailabilityByDay: PropTypes.func,
  fetchSchedule: PropTypes.func,
  storeServiceName: PropTypes.func,
  selectedDay: PropTypes.instanceOf(Date),
};
