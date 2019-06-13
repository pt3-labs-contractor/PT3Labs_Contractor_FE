import React from 'react';
import dateFns from 'date-fns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteSchedule } from '../actions/index.js';

import './popBox.css';

const PopBoxSched = props => {
  const start = dateFns.format(props.start, 'ddd HH:mm');
  const end = dateFns.format(props.end, 'ddd HH:mm');
  const hDiff = dateFns.differenceInHours(props.end, props.start);
  const mDiff = dateFns.differenceInMinutes(props.end, props.start);
  const { id } = props;
  const { x } = props;
  const { y } = props;
  const { w } = props;
  const { h } = props;
  const centerPop = 75;
  const centerBox = w / 2;
  const xper = x - centerPop + centerBox;
  const yper = y - 150 - h / 2;
  let finalMin;
  if (mDiff % 60 !== 0) {
    const min = hDiff * 60;
    finalMin = mDiff - min;
  }

  const deleteSched = () => {
    props.deleteSchedule(id);
  };
  const close = () => {
    props.history.push('/contractorCalendar');
  };

  const position = {
    position: 'absolute',
    left: `${xper}` + 'px',
    top: `${yper}` + 'px',
    zIndex: '100',
    backgroundColor: 'white',
  };
  return (
    <div className="boxCont" style={position}>
      <div className="close" onClick={close}>
        Close
      </div>
      <ul className="infoList">
        <li className="start">{start}</li>
        <ul className="duration">
          <li className="hours">{hDiff}</li>
          <li className="min">{finalMin}</li>
        </ul>
        <li className="end">{end}</li>
      </ul>
      <div className="actions">
        <Link to={`/contractorCalendar/sched/edit/${id}`}>Edit</Link>
        <button className="delete" onClick={deleteSched}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default connect(
  null,
  { deleteSchedule }
)(PopBoxSched);