import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Schedule from './schedule.jsx';
import { setRefs } from '../../../actions/index.js';

const ScheduleList = props => {
  const refCallback = el => {
    if (el) {
      const loc = el.getBoundingClientRect();
      const ref = { element: el, id: el.id, pos: loc };
      if (props.refs) {
        const find = props.refs.find(r => {
          return r.element.id === el.id;
        });
        if (find) {
          const locString = JSON.stringify(loc);
          const posString = JSON.stringify(find.pos);
          if (posString !== locString) {
            const newRef = { ...find, pos: loc };
            const remove = props.refs.filter(r => {
              return r.element.id !== el.id;
            });
            const finalRefs = [...remove, newRef];
            props.setRefs(finalRefs);
          }
        } else {
          const newSize = [...props.refs];
          if (newSize.length > 0) {
            const xs = newSize.map(s => {
              return s.id.id;
            });
            if (!xs.includes(ref.id)) {
              const modSize = [...newSize, ref];
              props.setRefs(modSize);
              // setSize([...newSize, loc]);
            }
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
          <div
            key={s.id}
            id={s.id}
            className="schedCont"
            ref={refCallback}
            data-ref={props.render}
          >
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
    scheds: state.schedule,
    refs: state.refs,
  };
};

export default connect(
  mstp,
  { setRefs }
)(ScheduleList);
