import React, { useState, useEffect } from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteSchedule } from '../actions/index';
import Appointment from './appointment.jsx';

const Schedule = props => {
  let { id, start, duration } = props;
  const modifiedStart = dateFns.format(start, 'HH:mm A');
  start = new Date(start);
  const [size, setSize] = useState();
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

  const newEnd = new Date(end);

  // const theE = e => {
  //   const pos = props.refs.find(r => {
  //     return r.id.id === e.target.dataset.id;
  // });
  // console.log(props.setPostion);
  // props.setPosition(x, y);
  // };

  const setEditData = e => {
    const pos = props.refs.find(r => {
      return r.id.id === e.target.dataset.id;
    });
    props.setPosition(pos);
    props.getSE(start, newEnd, id);
  };

  const refCallback = el => {
    if (el) {
      // console.log(el);
      const loc = el.getBoundingClientRect();
      const ref = { id: el.id, pos: loc };
      const add = loc.x + loc.y;
      if (props.refs) {
        const newSize = [...props.refs];
        if (newSize.length > 0) {
          const xs = newSize.map(s => {
            return s.id;
          });
          if (!xs.includes(ref.id)) {
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

  const modifiedEnd = dateFns.format(end, 'HH:mm A');
  return (
    <div id={id} className="schedCont">
      {props.contractorId === props.contID ? (
        <>
          {/* <div className="delete" onClick={deleteSched}> */}
          {/*   {' '} */}
          {/*   X{' '} */}
          {/* </div> */}
          <Link
            className="editLink"
            to={`/contractorCalendar/sched/${id}`}
            onClick={setEditData}
          >
            <p className="timeSlot" data-id={id}>
              {modifiedStart} - {modifiedEnd}{' '}
            </p>
          </Link>
          {apps.map(a => {
            return (
              <div className="appContRef" id={a.id} ref={refCallback}>
                <Appointment
                  id={a.id}
                  sevId={a.serviceId}
                  start={a.startTime}
                  duration={a.duration}
                  contID={props.contID}
                  setServIdUp={props.setServIdUp}
                  setPosition={props.setPosition}
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
  };
};

export default connect(
  mstp,
  { deleteSchedule }
)(Schedule);
