import React from 'react';
import { Route } from 'react-router-dom';
import Schedule from './schedule.jsx';
import EScheduler from './editForm';

const ScheduleList = props => {
  return (
    <div className="listCont">
      {props.schs.map(s => {
        return <Schedule id={s.id} start={s.startTime} duration={s.duration} />;
      })}
    </div>
  );
};

export default ScheduleList;
