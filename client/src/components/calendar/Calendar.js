import React from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';

import { setDay, setMonth } from '../../actions/index';

import AppointmentList from '../appointments/AppointmentList';

import './Calendar.css';
import NavBarUser from '../navbar/NavBarUser';

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
      days.push(<div>{dateFns.format(dateFns.addDays(start, i), 'dddd')}</div>);
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
            <AppointmentList selectedDay={temp} />
          ) : null}
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
    <div>
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
    // contractor: state.thisContractor
  };
};

export default connect(
  mapStateToProps,
  { setDay, setMonth }
)(Calendar);
