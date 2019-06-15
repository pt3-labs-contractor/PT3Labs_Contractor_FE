import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { confirmApp, deleteSchedule } from '../actions/index.js';

const AppInfo = props => {
  const [sevId, setSevId] = useState();

  useEffect(() => {
    setSevId(props.sevId);
  }, [props.sevId]);

  const { x } = props;
  const { y } = props;
  const { w } = props;
  const { h } = props;
  const centerPop = 75;
  const centerBox = w / 2;
  const xper = x - centerPop + centerBox + 6;
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

  const theAppoint = props.appointments.find(a => {
    return a.id === props.appId;
  });

  const onConfirm = () => {
    const { id, startTime, duration, scheduleId } = theAppoint;
    const returnObj = {
      startTime,
      duration,
      confirmed: true,
    };
    props.confirmApp(id, returnObj);
    // props.deleteSchedule(scheduleId);
    returnToCal();
  };

  return (
    <div className="infoCont" style={position}>
      <div className="cont">
        <label className="label" htmlFor="name">
          Service:{serviceName ? serviceName.name : ''}
        </label>
        <div className="value" />
      </div>
      <div className="cont">
        <label className="label" htmlFor="price">
          Price:{serviceName ? serviceName.price : ''}
        </label>
        <div className="value" />
      </div>
      <div className="buttons">
        <button className="confirm" onClick={onConfirm}>
          Confirm
        </button>
        <button className="deny" onClick={returnToCal}>
          Deny
        </button>
      </div>
    </div>
  );
};

const mstp = state => {
  return {
    services: state.services,
    appointments: state.appointments,
  };
};

export default connect(
  mstp,
  { confirmApp, deleteSchedule }
)(AppInfo);
