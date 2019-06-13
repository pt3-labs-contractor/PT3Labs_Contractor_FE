import React from 'react';
import { connect } from 'react-redux';
import Schedule from './schedule.jsx';
import { setRefs } from '../actions/index.js';

const ScheduleList = props => {
  const refCallback = el => {
    if (el) {
      const loc = el.getBoundingClientRect();
      const ref = { id: el.firstChild, pos: loc };
      const add = loc.x + loc.y;
      if (props.refs) {
        const newSize = [...props.refs];
        if (newSize.length > 0) {
          const xs = newSize.map(s => {
            return s.id.id;
          });
          if (!xs.includes(ref.id.id)) {
            const modSize = [...newSize, ref];
            props.setRefs(modSize);
            // setSize([...newSize, loc]);
          }
        }
      } else {
        // setSize([loc]);
        props.setRefs([ref]);
      }

      // props.getSize(el.getBoundingClientRect());
    }
  };

  return (
    <div className="listCont">
      {props.schs.map((s, i) => {
        return (
          <div key={props.id + i} className="schedCont" ref={refCallback}>
            <Schedule
              {...props}
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
    scheds: state.schedule,
    refs: state.refs,
  };
};

export default connect(
  mstp,
  { setRefs }
)(ScheduleList);
