import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import dateFns from 'date-fns';
import { postNewSchedule, updateSchedule } from '../actions/index.js';

const EScheduler = props => {
  const [start, setStart] = useState(props.start);
  const [end, setEnd] = useState(props.end);
  const { id } = props;

  useEffect(() => {
    setStart(props.start);
    setEnd(props.end);
  }, [props.start, props.end]);

  const schange = value => {
    setStart(value);
    // setEnd(value);
  };

  const echange = value => {
    setEnd(value);
  };

  const closeEdit = () => {
    props.history.push('/contractorCalendar');
  };



  const submit = e => {
    e.preventDefault();
    const minutes = dateFns.differenceInMinutes(end, start);
    const duration = `${minutes / 60}h`;
    const { contractorId } = props.user;
    const newSchedule = {
      contractorId,
      startTime: start,
      duration,
    };
    props.updateSchedule(id, newSchedule);
    props.history.push('/contractorCalendar');
  };
  return (
    <div className="schedulerCont" >
      <div className="close" onClick={closeEdit}>
        Close
      </div>
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
    user: state.user,
  };
};

export default connect(
  mstp,
  { postNewSchedule, updateSchedule }
)(EScheduler);
