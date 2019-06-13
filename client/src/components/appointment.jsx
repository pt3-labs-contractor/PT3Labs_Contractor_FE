import React, { useState } from 'react';
import dateFns from 'date-fns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Appointment = props => {
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
  const modifiedEnd = dateFns.format(end, 'HH:mm A');

  const setServId = e => {
    props.setServIdUp(e.target.dataset.appid);
    const pos = props.refs.find(r => {
      return r.id === e.target.dataset.refid;
    });
    console.log(pos);
    props.setPosition(pos);
  };

  return (
    <div className="appCont">
      {props.contractorId === props.contID ? (
        <>
          <Link
            className="appLink"
            to={`/contractorCalendar/app/${id}`}
            onClick={setServId}
          >
            <li className="appSlot" data-refid={id} data-appid={props.sevId}>
              {modifiedStart} - {modifiedEnd}{' '}
            </li>
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
    refs: state.refs,
  };
};

export default connect(mstp)(Appointment);