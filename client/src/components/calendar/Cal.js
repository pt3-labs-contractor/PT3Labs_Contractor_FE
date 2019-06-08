import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import { Route } from 'react-router-dom';
import ServiceForm from '../servicesForm';
import Scheduler from '../scheduler';
import SchduleList from '../scheduleList';
import EScheduler from '../editForm.jsx';

import { setDay, setMonth, getSchedules } from '../../actions/index';

import AvailabilityList from '../appointments/AvailabilityList';

import './Calendar.css';

function ContCalendar(props) {
  const [id, setId] = useState('');
  // const [formHidden, setFormHidden] = useState(true);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [schedId, setSchedId] = useState();
  const { selectedDay, selectedMonth, setMonth } = props;
  const stringify = JSON.stringify(props.schedules);
  useEffect(() => {
    setId(props.id);
    props.getSchedules(props.id);
    startEndId(start, end, schedId);
  }, [stringify, props.id, start]);

  const startEndId = (start, end, id) => {
    setStart(start);
    setEnd(end);
    setSchedId(id);
  };

  function CalendarNav() {
    return (
      <div className="calendar-nav">
        {!dateFns.isThisMonth(selectedMonth) ? (
          <div onClick={() => setMonth(dateFns.subMonths(selectedMonth, 1))}>
            &lt;
          </div>
        ) : null}
        <div className="nav-month">
          {dateFns.format(selectedMonth, 'MMMM YYYY')}
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
          {dateFns.format(dateFns.addDays(start, i), 'dddd')}
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
      const daySched = props.schedules.filter(s => {
        return dateFns.isSameDay(s.startTime, temp);
      });
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
          {daySched.length > 0 ? (
            <SchduleList
              {...props}
              getSE={startEndId}
              schs={daySched}
              contID={props.id}
            />
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
    <div className="calendar">
      <CalendarNav />
      <DaysOfWeek />
      <DaysOfMonth />
      <ServiceForm />
      <Scheduler />
      <Route
        exact
        path="/contractorCalendar/sched/edit/:id"
        render={props => (
          <EScheduler {...props} start={start} end={end} id={schedId} />
        )}
      />
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
  { setDay, setMonth, getSchedules }
)(ContCalendar);
