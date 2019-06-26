import React from 'react';
import { connect } from 'react-redux';
import Schedule from './schedule.jsx';
import { setRefs } from '../../../actions/index.js';

const ScheduleList = props => {
  const { refs } = props;
  let refArray = [];
  const refCallback = el => {
    if (window.innerWidth > 601) {
      if (el) {
        const loc = el.getBoundingClientRect();
        const ref = { element: el, id: el.id, pos: loc };
        if (refs) {
          const find = refs.find(r => {
            return r.element.id === el.id;
          });
          if (find) {
            const locString = JSON.stringify(loc);
            const posString = JSON.stringify(find.pos);
            if (posString !== locString) {
              const newRef = { ...find, pos: loc };
              const remove = refArray.filter(r => {
                return r.element.id !== el.id;
              });
              const finalRefs = [...remove, newRef];
              refArray = finalRefs;
              if (el.parentElement.lastChild === el) {
                props.setRefs(refArray);
              }
              // props.setRefs(finalRefs);
            }
          } else {
            let newSize = [];
            if (refArray.length > 0) {
              newSize = [...refArray];
            } else {
              newSize = [...refs];
            }
            if (newSize.length > 0) {
              const xs = newSize.map(s => {
                return s.id;
              });
              if (!xs.includes(ref.id)) {
                const modSize = [...newSize, ref];
                const htmlArr = Array.from(el.parentElement.children);
                refArray = modSize;
                const newids = htmlArr.map(h => {
                  return h.id;
                });
                const check = refArray.filter(r => {
                  return newids.includes(r.id);
                });
                if (check.length === htmlArr.length) {
                  props.setRefs(refArray);
                }
                // if (el.parentElement.firstChild === el) {
                //   props.setRefs(refArray);
                // }
              }
            }
          }
        } else {
          // setSize([loc]);
          // props.setRefs([ref]);
          refArray.push(ref);
          if (el.parentElement.lastChild === el) {
            props.setRefs(refArray);
          }
        }

        // props.getSize(el.getBoundingClientRect());
      }
    }
  };

  return (
    <div className="listCont">
      {props.schs.map((s, i) => {
        return (
          <div
            key={s.id}
            id={s.id}
            className="schCont"
            data-ref={props.render}
            ref={refCallback}
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
    // scheds: state.schedule,
    refs: state.refs,
  };
};

export default connect(
  mstp,
  { setRefs }
)(ScheduleList);
