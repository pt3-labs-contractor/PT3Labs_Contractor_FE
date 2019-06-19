import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import { Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';
import ServiceForm from './forms/servicesForm.jsx';
import Scheduler from './comps/scheduler.jsx';
import SchduleList from './comps/scheduleList.jsx';
import EScheduler from './forms/editForm.jsx';
import PopBoxSched from './popups/popBox.jsx';
import AppInfo from './comps/appointConf.jsx';
import './cal.css';

import { setDay, setMonth, getSchedules, setRefs } from '../../actions/index';

import AvailabilityList from '../appointments/AvailabilityList';

import './Calendar.css';

function ContCalendar(props) {
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [w, setW] = useState();
  const [h, setH] = useState();
  const [wHeight, setWHeight] = useState();
  const [wWidth, setWWidth] = useState();
  const [xper, setXper] = useState([]);
  const [yper, setYper] = useState([]);
  const starting = { height: window.screen.height, width: window.screen.width };
  const [targetCell, setTargetCell] = useState({ hidden: true, id: null });
  const [sevAppId, setSevAppId] = useState();
  const [appId, setAppId] = useState();
  const { selectedDay, selectedMonth, setMonth } = props;
  const [id, setId] = useState('');
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [schedId, setSchedId] = useState();
  const isClinet = typeof window === 'object';
  const stringify = JSON.stringify(props.schedules);
  const { refs } = props;
  const ref = React.createRef();
  const [render, setRender] = useState();
  useEffect(() => {
    console.log('ran');
    setId(props.id);
    props.getSchedules(props.id);
    startEndId(start, end, schedId);
    window.addEventListener('resize', windowResize);
    return () => {
      window.removeEventListener('resize', windowResize);
    };
  }, [stringify, props.id, start, props.selectedDay, window.innerWidth]);

  const windowResize = () => {
    if (
      window.innerWidth !== props.win.width ||
      window.innerHeight !== props.win.height
    ) {
      return true;
    }
  };

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
              return s.id;
            });
            if (!xs.includes(ref.id)) {
              const modSize = [...newSize, ref];
              props.setRefs(modSize);
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

  const startEndId = (start, end, id) => {
    setStart(start);
    setEnd(end);
    setSchedId(id);
  };

  const setPos = e => {
    const pos = props.refs.find(r => {
      return r.id === e.target.dataset.day;
    });
    setPosition(pos);
    props.history.push('/contractorCalendar/newSched');
  };

  const setPosition = pos => {
    setX(pos.pos.x);
    setY(pos.pos.y);
    setW(pos.pos.width);
    setH(pos.pos.height);
  };

  const setServIdUp = (theSevId, theAppId) => {
    setSevAppId(theSevId);
    setAppId(theAppId);
  };

  function CalendarNav() {
    return (
      <div className="calendar-nav">
        {!dateFns.isThisMonth(selectedMonth) ? (
          <div onClick={() => setMonth(dateFns.subMonths(selectedMonth, 1))}>
            &lt;
          </div>
        ) : null}
        <div className="nav-month">
          {dateFns.format(selectedMonth, 'MMMM YYYY')}
        </div>
        <div onClick={() => setMonth(dateFns.addMonths(selectedMonth, 1))}>
          &gt;
        </div>
      </div>
    );
  }

  function DaysOfWeek() {
    const days = [];

    const start = dateFns.startOfWeek(selectedMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day-cell" key={i}>
          {dateFns.format(dateFns.addDays(start, i), 'dddd')}
        </div>
      );
    }
    return <div className="day-container">{days}</div>;
  }

  function DaysOfMonth() {
    const startMonth = dateFns.startOfMonth(selectedMonth);
    const endMonth = dateFns.endOfMonth(selectedMonth);
    const startCalendar = dateFns.startOfWeek(startMonth);
    const endCalendar = dateFns.endOfWeek(endMonth);

    let day = startCalendar;
    const days = [];

    while (day <= endCalendar) {
      let newDay = String(day);
      newDay = newDay.split(' ');
      const id = newDay.join('');
      const temp = day;
      const isSameDay = dateFns.isSameDay(temp, selectedDay);
      const daySched = props.schedules.filter(s => {
        return dateFns.isSameDay(s.startTime, temp);
      });
      const dayApp = props.appointments.filter(a => {
        return dateFns.isSameDay(a.startTime, temp);
      });
      days.push(
        <div
          key={temp}
          id={id}
          ref={refCallback}
          data-ref={render}
          className={`spacer ${
            isSameDay
              ? ' selected day'
              : !dateFns.isSameMonth(temp, selectedMonth)
              ? 'disable'
              : ''
          }`}
          onClick={() => handleSelect(temp)}
        >
          {dateFns.format(day, 'D')}
          <div className="add" data-day={id} onClick={setPos}>
            +
          </div>
          <div
            key={temp}
            className={`cel ${
              isSameDay && targetCell.hidden === false && targetCell.id === id
                ? ' selected day hidden'
                : !dateFns.isSameMonth(temp, selectedMonth)
                ? 'disable'
                : ''
            }`}
            onClick={() => handleSelect(temp)}
          >
            {props.contractor.name ? (
              <AvailabilityList selectedDay={temp} />
            ) : null}
            {daySched.length > 0 ? (
              <SchduleList
                {...props}
                render={render}
                temp={temp}
                getSE={startEndId}
                schs={daySched}
                contID={props.id}
                today={props.selectedDay}
                setPosition={setPosition}
                setServIdUp={setServIdUp}
                appointments={dayApp}
              />
            ) : null}
          </div>
          {daySched.length > 1 || (daySched.length > 0 && dayApp.length > 0) ? (
            <>
              <div
                className={`downCont ${
                  targetCell.hidden === false && targetCell.id === id
                    ? 'arrowHidden'
                    : ''
                }`}
                data-cell={id}
                onClick={showHide}
              >
                <FontAwesomeIcon icon={faAngleDoubleDown} />
              </div>
              <div
                className={`downCont ${
                  targetCell.hidden === false && targetCell.id === id
                    ? ''
                    : 'arrowHidden'
                }`}
                data-cell={id}
                onClick={showHide}
              >
                <FontAwesomeIcon icon={faAngleDoubleUp} />
              </div>
            </>
          ) : null}
        </div>
      );
      day = dateFns.addDays(day, 1);
    }

    return <div className="cell-container">{days}</div>;
  }

  function handleSelect(day) {
    if (dateFns.isSameMonth(day, selectedMonth)) {
      props.setDay(day);
    } else if (!dateFns.isBefore(day, dateFns.startOfMonth(new Date()))) {
      props.setMonth(day);
      props.setDay(day);
    }
  }

  const showHide = e => {
    targetCell.hidden === true
      ? setTargetCell({ hidden: false, id: e.target.dataset.cell })
      : setTargetCell({ hidden: true, id: null });
  };

  return (
    <div className="cal">
      <CalendarNav />
      <DaysOfWeek />
      <Route
        exact
        path="/contractorCalendar/sched/:id"
        render={props => (
          <PopBoxSched
            {...props}
            x={x}
            y={y}
            w={w}
            h={h}
            start={start}
            end={end}
            id={schedId}
          />
        )}
      />
      <DaysOfMonth />
      <ServiceForm />
      <Route
        exact
        path="/contractorCalendar/newSched"
        render={props => <Scheduler {...props} x={x} y={y} h={h} w={w} />}
      />
      <Route
        exact
        path="/contractorCalendar/sched/edit/:id"
        render={props => (
          <EScheduler
            {...props}
            x={x}
            y={y}
            w={w}
            h={h}
            start={start}
            end={end}
            id={schedId}
          />
        )}
      />
      <Route
        exact
        path="/contractorCalendar/app/:id"
        render={props => (
          <AppInfo
            {...props}
            sevId={sevAppId}
            appId={appId}
            x={x}
            y={y}
            w={w}
            h={h}
          />
        )}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    selectedDay: state.thisDay,
    selectedMonth: state.thisMonth,
    schedules: state.schedule,
    appointments: state.appointments,
    id: state.user.contractorId,
    refs: state.refs,
    // contractor: state.thisContractor
  };
};

export default connect(
  mapStateToProps,
  { setDay, setMonth, getSchedules, setRefs }
)(ContCalendar);
