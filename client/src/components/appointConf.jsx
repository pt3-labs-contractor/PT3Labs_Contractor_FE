import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

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
  const xper = x - centerPop + centerBox;
  const yper = y - 150 - h / 2;

  const position = {
    position: 'absolute',
    left: `${xper}` + 'px',
    top: `${yper}` + 'px',
    zIndex: '100',
    backgroundColor: 'white',
  };

  const returnToCal = e => {
    e.preventDefault();
    props.history.push('/contractorCalendar');
  };

  const serviceName = props.services.find(s => {
    console.log(s.id);
    console.log(props.sevId);
    return s.id === props.sevId;
  });
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
        <button className="confirm" onClick={returnToCal}>
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
  };
};

export default connect(mstp)(AppInfo);
