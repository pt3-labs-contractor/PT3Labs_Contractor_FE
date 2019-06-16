import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import dateFns from 'date-fns';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postNewSchedule, updateSchedule } from '../actions/index.js';
import './editForm.css';

const EScheduler = props => {
  const { x, y, w, h } = props;
  const [start, setStart] = useState(props.start);
  const [end, setEnd] = useState(props.end);
  const { id } = props;

  const centerPop = 100;
  const centerBox = w / 2;
  const xper = x - centerPop + centerBox;
  const yper = y - 150;

  const position = {
    position: 'absolute',
    left: `${xper}` + 'px',
    top: `${yper}` + 'px',
    zIndex: '100',
    backgroundColor: 'white',
  };

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
      startTime: new Date(start),
      duration,
      open: true,
    };
    console.log(newSchedule);
    props.updateSchedule(id, newSchedule);
    props.history.push('/contractorCalendar');
  };
  return (
    <div className="schedulerCont" style={position}>
      <div className="closeIcon">
        <FontAwesomeIcon icon={faTimesCircle} onClick={closeEdit} />
      </div>
      <DateTimePicker
        className="start"
        value={start}
        clearIcon={null}
        onChange={schange}
      />
      <DateTimePicker
        className="end"
        value={end}
        clearIcon={null}
        onChange={echange}
      />
      <button className="save" onClick={submit}>
        Save
      </button>
    </div>
  );
};

const mstp = state => {
  console.log(state.schedule);
  return {
    user: state.user,
  };
};

export default connect(
  mstp,
  { postNewSchedule, updateSchedule }
)(EScheduler);
