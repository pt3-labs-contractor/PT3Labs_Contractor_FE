import React, { useState } from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { deleteSchedule } from '../actions/index';
import EScheduler from './editForm';

const Schedule = props => {
  const [hidden, setHidden] = useState(true);
  let { id, start, duration } = props;
  const modifiedStart = dateFns.format(start, 'HH:mm A');
  start = new Date(start);
  let end = start;
  if (duration.hours) {
    end = dateFns.addHours(start, duration.hours);
  }
  if (duration.minutes) {
    end = dateFns.addMinutes(end, duration.minutes);
  }
  if (duration.seconds) {
    end = dateFns.addSeconds(end, duration.seconds);
  }
  if (duration.milliseconds) {
    end = dateFns.addMilliseconds(end, duration.milliseconds);
  }

  const newEnd = new Date(end);

  const deleteSched = () => {
    props.deleteSchedule(id);
  };

  const setEditData = () => {
    props.getSE(start, newEnd, id);
  };

  const modifiedEnd = dateFns.format(end, 'HH:mm A');
  return (
    <div className="schedCont">
      {props.contractorId === props.contID ? (
        <>
          <div className="delete" onClick={deleteSched}>
            {' '}
            X{' '}
          </div>
          <Link
            to={`/contractorCalendar/sched/edit/${id}`}
            onClick={setEditData}
          >
            Edit
          </Link>
          {/* <div id={id} className="edit" onClick={unhide}> */}
          {/* Edit */}
          {/* </div> */}
          <p className="timeSlot">
            {modifiedStart} - {modifiedEnd}{' '}
          </p>
        </>
      ) : (
        <p className="timeSlot">
          {modifiedStart} - {modifiedEnd}{' '}
        </p>
      )}
    </div>
  );
};

const mstp = state => {
  console.log(state);
  return {
    contractorId: state.user.contractorId,
  };
};

export default connect(
  mstp,
  { deleteSchedule }
)(Schedule);
