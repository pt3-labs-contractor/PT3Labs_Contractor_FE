import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Schedule from './schedule.jsx';

const ScheduleList = props => {
  return (
    <div className="listCont">
      {props.schs.map((s, i) => {
        return (
          <Schedule
            {...props}
            id={s.id}
            start={s.startTime}
            duration={s.duration}
            getSE={props.getSE}
            contID={props.contID}
            today={props.today}
            setPosition={props.setPosition}
          />
        );
      })}
    </div>
  );
};

const mstp = state => {
  return {
    scheds: state.schedule,
  };
};

export default connect(mstp)(ScheduleList);
