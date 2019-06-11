import React, { useState } from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteSchedule } from '../actions/index';

const Schedule = props => {
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

  const theE = e => {
    const x = e.clientX;
    const y = e.clientY;
    // console.log(props.setPostion);
    props.setPosition(x, y);
  };

  const setEditData = () => {
    props.getSE(start, newEnd, id);
  };

  const modifiedEnd = dateFns.format(end, 'HH:mm A');
  return (
    <div id={id} className="schedCont" onClick={theE}>
      {props.contractorId === props.contID ? (
        <>
          {/* <div className="delete" onClick={deleteSched}> */}
          {/*   {' '} */}
          {/*   X{' '} */}
          {/* </div> */}
          <Link
            className="editLink"
            to={`/contractorCalendar/sched/${id}`}
            onClick={setEditData}
          >
            <p className="timeSlot">
              {modifiedStart} - {modifiedEnd}{' '}
            </p>
          </Link>
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
  return {
    contractorId: state.user.contractorId,
  };
};

export default connect(
  mstp,
  { deleteSchedule }
)(Schedule);
