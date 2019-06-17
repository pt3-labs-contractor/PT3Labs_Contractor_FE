import React, { useEffect, useState } from 'react';
import dateFns from 'date-fns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  faTrash,
  faTimesCircle,
  faPencilAlt,
  faCheck,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteSchedule } from '../../../actions/index.js';

import './popBox.css';

const PopBoxSched = props => {
  const start = dateFns.format(props.start, 'ddd HH:mm');
  const end = dateFns.format(props.end, 'ddd HH:mm');
  const hDiff = dateFns.differenceInHours(props.end, props.start);
  const mDiff = dateFns.differenceInMinutes(props.end, props.start);
  // const [pending, setPending] = useState([]);
  const { id } = props;
  const { x } = props;
  const { y } = props;
  const { w } = props;
  const { h } = props;
  const { appointments } = props;
  const centerBox = w / 2;
  const xper = centerBox - 100 + x;
  const yper = y - 177;
  let finalMin;
  if (mDiff % 60 !== 0) {
    const min = hDiff * 60;
    finalMin = mDiff - min;
  }

  if (finalMin === undefined) {
    finalMin = 0;
  }

  const deleteSched = () => {
    props.deleteSchedule(id);
    close();
  };
  const close = () => {
    props.history.push('/contractorCalendar');
  };

  const position = {
    position: 'absolute',
    left: `${xper}` + 'px',
    top: `${yper}` + 'px',
    zIndex: '10000',
    backgroundColor: 'white',
  };

  const pending = props.appointments.filter(a => {
    const check = dateFns.isEqual(new Date(a.startTime), new Date(props.start));
    const { confirmed } = a;
    if (check === true && confirmed === false) {
      return a;
    }
  });

  return (
    <div className="boxCont" style={position}>
      <div className="closeIconEdit">
        <FontAwesomeIcon icon={faTimesCircle} onClick={close} />
      </div>
      <ul className="infoList">
        <li className="start">Start: {start}</li>
        <li className="end">End: {end}</li>
        <ul className="duration">
          <div className="dur">Duration</div>
          <li className="hours">Hours: {hDiff}</li>
          <li className="min">Minutes: {finalMin}</li>
        </ul>
        {pending.length > 0 ? (
          <li className="pending">
            Pending Appointments: <FontAwesomeIcon icon={faCheck} />
          </li>
        ) : (
          <li className="pending">
            Pending Appointments: <FontAwesomeIcon icon={faBan} />
          </li>
        )}
      </ul>
      <div className="actions">
        <Link to={`/contractorCalendar/sched/edit/${id}`} className="edit">
          <FontAwesomeIcon icon={faPencilAlt} /> Edit
        </Link>
        <button className="delete" onClick={deleteSched}>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
    </div>
  );
};

const mstp = state => {
  return {
    appointments: state.appointments,
  };
};
export default connect(
  mstp,
  { deleteSchedule }
)(PopBoxSched);
