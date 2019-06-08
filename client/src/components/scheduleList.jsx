import React from 'react';
import { Route } from 'react-router-dom';
import Schedule from './schedule.jsx';

const ScheduleList = props => {
  console.log(props);
  return (
    <div className="listCont">
      {props.schs.map(s => {
        return (
          <Schedule
            {...props}
            id={s.id}
            start={s.startTime}
            duration={s.duration}
            getSE={props.getSE}
            contID={props.contID}
          />
        );
      })}
    </div>
  );
};

export default ScheduleList;
