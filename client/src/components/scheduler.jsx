import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import dateFns from 'date-fns';
import { postNewSchedule } from '../actions/index.js';

const Scheduler = props => {
  const [start, setStart] = useState(props.today || new Date());
  const [end, setEnd] = useState(new Date());

  useEffect(() => {
    setStart(props.today);
    setEnd(props.today);
  }, [props.today]);

  const schange = value => {
    setStart(value);
    setEnd(value);
  };

  const echange = value => {
    setEnd(value);
  };

  const submit = e => {
    e.preventDefault();
    const minutes = dateFns.differenceInMinutes(end, start);
    const hours = dateFns.differenceInHours(end, start);
    const minutesLeft = minutes - hours * 60;
    const duration = `${minutes / 60}h`;
    const { contractorId } = props.user;
    const newSchedule = {
      contractorId,
      startTime: start,
      duration,
    };
    props.postNewSchedule(newSchedule);
    console.log(newSchedule);
  };
  return (
    <div className="schedulerCont">
      <DateTimePicker className="start" value={start} onChange={schange} />
      <DateTimePicker className="end" value={end} onChange={echange} />
      <button className="submit" onClick={submit}>
        Submit
      </button>
    </div>
  );
};

const mstp = state => {
  return {
    today: state.thisDay,
    user: state.user,
  };
};

export default connect(
  mstp,
  { postNewSchedule }
)(Scheduler);
