import React from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';

// import AvailabilityList from '../appointments/AvailabilityList';

import { setDay, setMonth, fetchAvailabilityByDay } from '../../actions/index';

import './Calendar.css';

function Calendar(props) {
  const { selectedDay, selectedMonth, setMonth, schedule } = props;

  function CalendarNav() {
    return (
      <div className="calendar-nav">
        {!dateFns.isThisMonth(selectedMonth) ? (
          <div onClick={() => setMonth(dateFns.subMonths(selectedMonth, 1))}>
            &lt;
          </div>
        ) : null}
        <div className="nav-month">
          {dateFns.format(selectedMonth, 'MMMM YYYY').toUpperCase()}
        </div>
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
        <div className="day-cell" key={i}>
          {dateFns.format(dateFns.addDays(start, i), 'ddd')}
        </div>
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
      let available = false;
      if (schedule) {
        const date = schedule.find(item =>
          dateFns.isSameDay(item.startTime, temp)
        );
        available = date ? dateFns.isSameDay(date.startTime, temp) : false;
      }
      days.push(
        <div
          key={temp}
          className={`cell ${
            dateFns.isSameDay(temp, selectedDay)
              ? ' selected'
              : !dateFns.isSameMonth(temp, selectedMonth)
              ? 'disable'
              : available
              ? 'available'
              : ''
          }`}
          onClick={() => handleSelect(temp)}
        >
          {dateFns.format(day, 'D')}
        </div>
      );
      day = dateFns.addDays(day, 1);
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
    <div className="calendar calendar-test">
      <CalendarNav />
      <DaysOfWeek />
      <DaysOfMonth />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    selectedDay: state.thisDay,
    selectedMonth: state.thisMonth,
    schedules: state.schedule,
    id: state.user.contractorId,
    // contractor: state.thisContractor
  };
};

export default connect(
  mapStateToProps,
  { setDay, setMonth, fetchAvailabilityByDay }
)(Calendar);
