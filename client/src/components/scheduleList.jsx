import React from 'react';
import Schedule from './schedule.jsx';

const ScheduleList = props => {
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
            today={props.today}
          />
        );
      })}
    </div>
  );
};

export default ScheduleList;
