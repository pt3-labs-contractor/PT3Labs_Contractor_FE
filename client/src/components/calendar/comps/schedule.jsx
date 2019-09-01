import React from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteSchedule } from '../../../actions/index.js';
import Appointment from './appointment.jsx';

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

  const apps = props.appointments.filter(app => {
    return app.scheduleId === id;
  });

  const cancApps = apps.filter(a => {
    return a.confirmed === false;
  });

  const newEnd = new Date(end);

  const setEditData = e => {
    if (window.innerWidth > 601) {
      const pos = props.refs.find(r => {
        return r.id === e.target.dataset.id;
      });
      props.setPosition(pos);
    }
    props.tween();
    props.getSE(start, newEnd, id);
  };

  const confirmed = apps.filter(a => {
    if (a.confirmed === true) {
      return a.id;
    }
    return false;
  });

  const modifiedEnd = dateFns.format(end, 'HH:mm A');
  return (
    <div id={id} className="schedCont">
      {props.contractorId === props.contID ? (
        <>
          <Link
            className={
              dateFns.isSameDay(props.temp, props.selectedDay)
                ? 'editLink'
                : 'disabledLink editLink'
            }
            to={`/contractorCalendar/sched/${id}`}
            onClick={setEditData}
          >
            <p
              className={`timeSlot ${
                confirmed.length > 0
                  ? 'confirmedDot'
                  : confirmed.length === 0 &&
                    apps.length > 0 &&
                    apps.length !== cancApps.length
                  ? 'pendingDot'
                  : 'openDot'
              }`}
              data-id={id}
            >
              {modifiedStart} - {modifiedEnd}{' '}
            </p>
          </Link>
          {apps.map(a => {
            return (
              <div className="appContRef" key={a.id} id={a.id}>
                <Appointment
                  id={a.id}
                  sevId={a.serviceId}
                  start={a.startTime}
                  duration={a.duration}
                  contID={props.contID}
                  setServIdUp={props.setServIdUp}
                  setPosition={props.setPosition}
                  confirmed={a.confirmed}
                  tween={props.tween}
                  temp={props.temp}
                />
              </div>
            );
          })}
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
    selectedDay: state.thisDay,
  };
};

export default connect(
  mstp,
  { deleteSchedule }
)(Schedule);
