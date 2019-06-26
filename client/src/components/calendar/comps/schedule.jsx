import React from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteSchedule } from '../../../actions/index.js';
import Appointment from './appointment.jsx';

const Schedule = props => {
  let { id, start, duration } = props;
  const modifiedStart = dateFns.format(start, 'HH:mm A');
  start = new Date(start);
  let end = start;

  if (duration.hours) {
    end = dateFns.addHours(start, duration.hours);
  }
  if (duration.minutes) {
    end = dateFns.addMinutes(end, duration.minutes);
  }
  if (duration.seconds) {
    end = dateFns.addSeconds(end, duration.seconds);
  }
  if (duration.milliseconds) {
    end = dateFns.addMilliseconds(end, duration.milliseconds);
  }

  const apps = props.appointments.filter(app => {
    return app.scheduleId === id;
  });

  const cancApps = apps.filter(a => {
    return a.confirmed === false;
  });

  const newEnd = new Date(end);

  const setEditData = e => {
    if (window.innerWidth > 601) {
      const pos = props.refs.find(r => {
        return r.id === e.target.dataset.id;
      });
      props.setPosition(pos);
    }
    props.getSE(start, newEnd, id);
  };
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
                props.setRefs(modSize);
                const newids = htmlArr.map(h => {
                  return h.id;
                });
                const check = refArray.filter(r => {
                  return newids.includes(r.id);
                });
                if (check.length + 1 === htmlArr.length) {
                  props.setRefs(refArray);
                }
                if (el.parentElement.firstChild === el) {
                  props.setRefs(refArray);
                }
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

  const confirmed = apps.filter(a => {
    if (a.confirmed === true) {
      return a.id;
    }
  });

  const modifiedEnd = dateFns.format(end, 'HH:mm A');
  return (
    <div id={id} className="schedCont">
      {props.contractorId === props.contID ? (
        <>
          <Link
            className={
              dateFns.isSameDay(props.temp, props.selectedDay)
                ? 'editLink'
                : 'disabledLink editLink'
            }
            to={`/contractorCalendar/sched/${id}`}
            onClick={setEditData}
          >
            <p
              className={`timeSlot ${
                confirmed.length > 0
                  ? 'confirmedDot'
                  : confirmed.length === 0 &&
                    apps.length > 0 &&
                    apps.length !== cancApps.length
                  ? 'pendingDot'
                  : 'openDot'
              }`}
              data-id={id}
            >
              {modifiedStart} - {modifiedEnd}{' '}
            </p>
          </Link>
          {apps.map(a => {
            return (
              <div className="appContRef" ref={refCallback} id={a.id}>
                <Appointment
                  id={a.id}
                  sevId={a.serviceId}
                  start={a.startTime}
                  duration={a.duration}
                  contID={props.contID}
                  setServIdUp={props.setServIdUp}
                  setPosition={props.setPosition}
                  confirmed={a.confirmed}
                  temp={props.temp}
                />
              </div>
            );
          })}
        </>
      ) : (
        <p className="timeSlot">
          {modifiedStart} - {modifiedEnd}{' '}
        </p>
      )}
    </div>
  );
};

const mstp = state => {
  return {
    contractorId: state.user.contractorId,
    refs: state.refs,
    selectedDay: state.thisDay,
  };
};

export default connect(
  mstp,
  { deleteSchedule }
)(Schedule);
