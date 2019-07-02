import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  updateSchedule,
  confirmApp,
  deleteSchedule,
  getUser,
} from '../../../actions/index.js';
import './appointConf.scss';

const AppInfo = props => {
  // const [sevId, setSevId] = useState();

  const theAppoint = props.appointments.find(a => {
    return a.id === props.appId;
  });

  const allConfirmCheck = props.appointments.filter(a => {
    return a.startTime === theAppoint.startTime;
  });

  useEffect(() => {
    // setSevId(props.sevId);
    props.getUser(theAppoint.userId);
  }, [props.sevId, theAppoint.id]);

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

  const returnToCal = () => {
    props.history.push('/contractorCalendar');
  };

  const serviceName = props.services.find(s => {
    return s.id === props.sevId;
  });

  const onConfirm = e => {
    e.preventDefault();
    const { id, startTime, duration, scheduleId } = theAppoint;
    let dur;
    const { hours } = duration;
    const { minutes } = duration;
    if (hours && minutes) {
      dur = `${(hours * 60 + minutes) / 60}h`;
    }
    if (hours) {
      dur = `${hours}h`;
    }
    if (minutes) {
      dur = `${minutes / 60}h`;
    }
    const returnObj = {
      startTime,
      duration: dur,
      confirmed: true,
    };

    const scheduleLock = {
      startTime,
      duration: dur,
      open: false,
    };
    props.confirmApp(id, returnObj);
    props.updateSchedule(scheduleId, scheduleLock);
    // props.deleteSchedule(scheduleI;
    returnToCal();
  };

  const unConfirm = e => {
    e.preventDefault();
    const { id, startTime, duration, scheduleId } = theAppoint;
    let dur;
    const { hours } = duration;
    const { minutes } = duration;
    if (hours && minutes) {
      dur = `${(hours * 60 + minutes) / 60}h`;
    }
    if (hours) {
      dur = `${hours}h`;
    }
    if (minutes) {
      dur = `${minutes / 60}h`;
    }
    const returnObj = {
      startTime,
      duration: dur,
      confirmed: false,
    };

    const check = allConfirmCheck.filter(a => {
      return a.confirmed;
    });

    const ids = check.map(a => {
      return a.id;
    });

    let scheduleUnLock;

    if (ids.length === 1 && ids.includes(id)) {
      scheduleUnLock = {
        startTime,
        duration: dur,
        open: true,
      };

      props.confirmApp(id, returnObj);
      props.updateSchedule(scheduleId, scheduleUnLock);
    } else {
      props.confirmApp(id, returnObj);
    }
    // props.deleteSchedule(scheduleI;
    returnToCal();
  };

  const close = () => {
    props.history.push('/contractorCalendar');
  };

  return (
    <div
      className={`infoContApp arrowHidden ${
        theAppoint.confirmed === null
          ? 'sBordPend'
          : theAppoint.confirmed === true
          ? 'sBordConfirm'
          : theAppoint.confirmed === false
          ? 'sBordDeny'
          : null
      }`}
      style={window.innerWidth > 601 ? position : null}
    >
      <div className="closeIconEditApp">
        <FontAwesomeIcon icon={faTimesCircle} onClick={close} />
      </div>
      {props.user !== undefined ? (
        <>
          <div className="cont">
            <label className="label" htmlFor="username">
              Name: {props.user[0].username}
            </label>
          </div>
          <div className="cont">
            <label className="lab" htmlFor="email">
              Email: {props.user[0].email}
            </label>
          </div>
          <div className="cont">
            <label className="label" htmlFor="phone">
              Phone Number: {props.user[0].phoneNumber}
            </label>
          </div>
        </>
      ) : null}
      <div className="cont">
        <label className="label" htmlFor="name">
          Service: {serviceName ? serviceName.name : ''}
        </label>
        <div className="value" />
      </div>
      <div className="cont">
        <label className="label" htmlFor="price">
          Price: {serviceName ? serviceName.price : ''}
        </label>
        <div className="value" />
      </div>
      <div className="buttons">
        <button className="confirm" onClick={onConfirm}>
          Confirm
        </button>
        <button className="deny" onClick={unConfirm}>
          Deny
        </button>
      </div>
    </div>
  );
};

const mstp = state => {
  return {
    user: state.queryUser,
    services: state.services,
    appointments: state.appointments,
  };
};

export default connect(
  mstp,
  { confirmApp, deleteSchedule, updateSchedule, getUser }
)(AppInfo);
