import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';

import Calendar from '../calendar/Calendar';
import AppointmentList from '../appointments/AppointmentList';
import ContractorList from '../contractors/ContractorList';
import AvailabilityList from '../appointments/AvailabilityList';
import AppointmentForm from '../appointments/AppointmentForm';
import FeedbackList from '../feedback/FeedbackList';
import TopNavbar from '../navbar/TopNavbar';

import './UserLandingPage.css';

import {
  fetchAccts,
  fetchSchedule,
  fetchAvailabilityByDay,
  getFeedbackByContractor,
  storeServiceName,
  clearTempFeedbak,
} from '../../actions/index';

function UserLandingPage(props) {
  const [contractor, setContractor] = useState({});
  const [time, setTime] = useState({});
  const [service, setService] = useState({});
  const [serviceSort, setServiceSort] = useState('Pick a service');
  const [currentTarget, setTarget] = useState(0);
  const [mediaQuery] = useState(window.innerWidth);
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

  const scroll = element => {
    const y = element.getBoundingClientRect().top + window.scrollY;
    window.scroll({
      top: y,
      behavior: 'smooth',
    });
    setTarget(currentTarget + 1);
  };

  const clearAppointment = () => {
    setService({});
    setTime({});
    setContractor({});
  };

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
    setContractor(item);
    const filter = item.services.filter(serv => {
      return serv.name === serviceSort;
    });
    setService(filter[0]);
    mql && scroll(availabilityTarget.current);
  };

  const selectTime = item => {
    setTime(item);
    mql && scroll(appointmentTarget.current);
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

  return (
    <>
      <TopNavbar />
      <div className="calendar-container">
        {mql ? (
          <div ref={serviceTarget} className="service-list">
            <h2>Pick a service</h2>
            {serviceList.map(serv => (
              <button
                type="button"
                value={serv.toLowerCase()}
                onClick={handleSort}
              >
                {serv}
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
              {serviceList.map(serv => (
                <option key={serv} value={serv.toLowerCase()}>
                  {serv}
                </option>
              ))}
            </select>
          </form>
        )}
        <div className="user-calendar">
          <div className="calendar-target" ref={calendarTarget}>
            <Calendar />
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
                clearAppointment={clearAppointment}
                appointment={time}
                service={service}
              />
            )}
          </div>
        </div>

        {mql && currentTarget > 0 ? (
          <div
            role="button"
            onClick={scrollBack}
            onKeyDown={scrollBack}
            id="back-button"
            tabIndex={0}
          >
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
  };
};

UserLandingPage.defaultProps = {
  contractors: null,
  serviceFilter: null,
  fetchAvailabilityByDay: null,
  fetchSchedule: null,
  getFeedbackByContractor: null,
  clearTempFeedbak: null,
  storeServiceName: null,
  selectedDay: null,
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
  serviceFilter: PropTypes.string,
  fetchAvailabilityByDay: PropTypes.func,
  fetchSchedule: PropTypes.func,
  getFeedbackByContractor: PropTypes.func,
  storeServiceName: PropTypes.func,
  clearTempFeedbak: PropTypes.func,
  selectedDay: PropTypes.instanceOf(Date),
};
