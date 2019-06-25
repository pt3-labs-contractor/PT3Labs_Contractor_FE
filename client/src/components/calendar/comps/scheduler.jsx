import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import dateFns from 'date-fns';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postNewSchedule } from '../../../actions/index.js';

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

  const position = {
    position: 'absolute',
    left: `${xper}` + 'px',
    top: `${yper}` + 'px',
    zIndex: '100',
    backgroundColor: 'white',
  };

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
      startTime: start,
      duration,
    };
    props.postNewSchedule(newSchedule);
    console.log(newSchedule);
    console.log(props.user);
    close();
  };
  const close = () => {
    props.history.push('/contractorCalendar');
  };
  return (
    <div className="schedulerCont" style={position}>
      <div className="closeIcon">
        <FontAwesomeIcon icon={faTimesCircle} onClick={close} />
      </div>
      <DateTimePicker
        className="start"
        clearIcon={null}
        value={start}
        onChange={schange}
      />
      <DateTimePicker
        className="end"
        value={end}
        onChange={echange}
        clearIcon={null}
      />
      <button className="save" onClick={submit}>
        Save
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
