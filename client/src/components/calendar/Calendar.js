import React from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import ServiceForm from '../servicesForm';
import Scheduler from '../scheduler';

import { setDay, setMonth } from '../../actions/index';

import AvailabilityList from '../appointments/AvailabilityList';

import './Calendar.css';

function Calendar(props) {
  const { selectedDay, selectedMonth, setMonth } = props;

  function CalendarNav() {
    return (
      <div className="calendar-nav">
        {!dateFns.isThisMonth(selectedMonth) ? (
          <div onClick={() => setMonth(dateFns.subMonths(selectedMonth, 1))}>
            &lt;
          </div>
        ) : null}
        <div>{dateFns.format(selectedMonth, 'MMMM YYYY')}</div>
        <div onClick={() => setMonth(dateFns.addMonths(selectedMonth, 1))}>
          &gt;
        </div>
      </div>
    );
  }

  function DaysOfWeek() {
    const days = [];

    const start = dateFns.startOfWeek(selectedMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i}>{dateFns.format(dateFns.addDays(start, i), 'dddd')}</div>
      );
    }
    return <div className="day-container">{days}</div>;
  }

  function DaysOfMonth() {
    const startMonth = dateFns.startOfMonth(selectedMonth);
    const endMonth = dateFns.endOfMonth(selectedMonth);
    const startCalendar = dateFns.startOfWeek(startMonth);
    const endCalendar = dateFns.endOfWeek(endMonth);

    let day = startCalendar;
    const days = [];

    while (day <= endCalendar) {
      const temp = day;
      days.push(
        <div
          key={temp}
          className={`cell ${
            dateFns.isSameDay(temp, selectedDay)
              ? ' selected'
              : !dateFns.isSameMonth(temp, selectedMonth)
              ? 'disable'
              : ''
          }`}
          onClick={() => handleSelect(temp)}
        >
          {dateFns.format(day, 'D')}
          {props.contractor.name ? (
            <AvailabilityList selectedDay={temp} />
          ) : null}
        </div>
      );
      day = dateFns.addDays(day, 1);
      console.log(day);
    }

    return <div className="cell-container">{days}</div>;
  }

  function handleSelect(day) {
    if (dateFns.isSameMonth(day, selectedMonth)) {
      props.setDay(day);
    } else if (!dateFns.isBefore(day, dateFns.startOfMonth(new Date()))) {
      props.setMonth(day);
      props.setDay(day);
    }
  }

  return (
    <div className="calendar">
      <CalendarNav />
      <DaysOfWeek />
      <DaysOfMonth />
      <ServiceForm />
      <Scheduler />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    selectedDay: state.thisDay,
    selectedMonth: state.thisMonth,
    // contractor: state.thisContractor
  };
};

export default connect(
  mapStateToProps,
  { setDay, setMonth }
)(Calendar);
