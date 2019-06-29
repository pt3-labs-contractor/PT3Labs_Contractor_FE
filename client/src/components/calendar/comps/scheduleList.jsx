import React from 'react';
import { connect } from 'react-redux';
import Schedule from './schedule.jsx';
import { setRefs } from '../../../actions/index.js';

const ScheduleList = props => {
  return (
    <div className="listCont">
      {props.schs.map((s, i) => {
        return (
          <div key={s.id} id={s.id} className="schCont" data-ref={props.render}>
            <Schedule
              {...props}
              temp={props.temp}
              id={s.id}
              start={s.startTime}
              duration={s.duration}
              getSE={props.getSE}
              contID={props.contID}
              today={props.today}
              setPosition={props.setPosition}
              appointments={props.appointments}
              setServIdUp={props.setServIdUp}
              setRefs={props.setRefs}
            />
          </div>
        );
      })}
    </div>
  );
};

const mstp = state => {
  return {
    // scheds: state.schedule,
    refs: state.refs,
  };
};

export default connect(
  mstp,
  { setRefs }
)(ScheduleList);
