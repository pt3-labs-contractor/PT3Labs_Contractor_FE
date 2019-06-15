import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import dateFns from 'date-fns';
import { postNewSchedule } from '../actions/index.js';

const Scheduler = props => {
  const [start, setStart] = useState(props.today || new Date());
  const [end, setEnd] = useState(new Date());
  const { x } = props;
  const { y } = props;
  const { w } = props;
  const { h } = props;
  const centerPop = 100;
  const centerBox = w / 2;
  const xper = x - centerPop + centerBox;
  const yper = y - 150;
  console.log(y, h);

  const position = {
    position: 'absolute',
    left: `${xper}` + 'px',
    top: `${yper}` + 'px',
    zIndex: '100',
    backgroundColor: 'white',
  };
  console.log(position);

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
    const duration = `${minutes / 60}h`;
    const { contractorId } = props.user;
    const newSchedule = {
      contractorId,
      startTime: start,
      duration,
    };
    props.postNewSchedule(newSchedule);
    close();
  };
  const close = () => {
    props.history.push('/contractorCalendar');
  };
  return (
    <div className="schedulerCont" style={position}>
      <div className="close" onClick={close}>
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
    today: state.thisDay,
    user: state.user,
  };
};

export default connect(
  mstp,
  { postNewSchedule }
)(Scheduler);
