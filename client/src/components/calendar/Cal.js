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
import './cal.scss';

import { setDay, setMonth, getSchedules, setRefs } from '../../actions/index';

import AvailabilityList from '../appointments/AvailabilityList';

import './Calendar.css';
import TopNavbar from '../navbar/TopNavbar.js';
import NavBarContractor from '../navbar/NavBarContractor.js';

function ContCalendar(props) {
  const [ahead, setAhead] = useState();
  const [behind, setBehind] = useState();
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [w, setW] = useState();
  const [h, setH] = useState();
  const [targetCell, setTargetCell] = useState({ hidden: true, id: null });
  const [sevAppId, setSevAppId] = useState();
  const [appId, setAppId] = useState();
  const { selectedDay, selectedMonth, setMonth } = props;
  // const [id, setId] = useState('');
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [schedId, setSchedId] = useState();
  const stringify = JSON.stringify(props.schedules);
  const { refs } = props;
  const [win, setWindow] = useState();
  // console.log(refs);
  let [refArray, setRefArray] = useState([]);
  // const ref = React.createRef();
  const [render, setRender] = useState();
  const [filter, setFilter] = useState();
  const [fullFilter, setFullFilter] = useState();
  useEffect(() => {
    console.log('ran');
    // setId(props.id);
    props.getSchedules(props.id);
    monthPendingCheck();
    startEndId(start, end, schedId);
    window.addEventListener('resize', windowResize);
    return () => {
      window.removeEventListener('resize', windowResize);
    };
  }, [stringify, start, props.selectedDay, props.id, win, props.selectedMonth]);

  const monthPendingCheck = () => {
    const diffMonth = props.appointments.filter(a => {
      const isSameMonth = dateFns.isSameMonth(a.startTime, props.selectedMonth);
      if (!isSameMonth) {
        return a;
      }
    });
    const before = diffMonth.filter(a => {
      return dateFns.isBefore(a.startTime, props.selectedMonth);
    });
    const after = diffMonth.filter(a => {
      return dateFns.isAfter(a.startTime, props.selectedMonth);
    });

    if (before.length > 0) {
      setBehind(true);
    } else {
      setBehind(null);
    }
    if (after.length > 0) {
      setAhead(true);
    } else {
      setAhead(null);
    }
  };

  const windowResize = () => {
    if (
      window.innerWidth !== props.win.width ||
      window.innerHeight !== props.win.height
    ) {
      setWindow({ w: window.innerWidth, h: window.innerHeight });
    }
  };

  const refCallback = el => {
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
            // console.log(finalRefs);
            refArray = finalRefs;
            if (el.parentElement.lastChild === el) {
              console.log('ran');
              props.setRefs(refArray);
            }
            // props.setRefs(finalRefs);
          }
        } else {
          const newSize = [...refArray];
          if (newSize.length > 0) {
            const xs = newSize.map(s => {
              return s.id;
            });
            let eOm = dateFns.endOfMonth(selectedMonth);
            eOm = dateFns.startOfDay(eOm);
            eOm = String(eOm);
            eOm = eOm.split(' ').join('');
            if (!xs.includes(ref.id)) {
              const modSize = [...newSize, ref];
              refArray = modSize;
              if (ref.id === eOm) {
                props.setRefs(refArray);
              }
            } else if (ref.id === eOm) {
              props.setRefs(refArray);
            }
          } else {
            refArray = [ref];
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
  };

  const startEndId = (start, end, id) => {
    setStart(start);
    setEnd(end);
    setSchedId(id);
  };

  const setPos = e => {
    const pos = refs.find(r => {
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
          <div
            className={`nav ${behind ? 'pend' : null}`}
            onClick={() => {
              setMonth(dateFns.subMonths(selectedMonth, 1));
              setRefArray([]);
            }}
          >
            &lt;
          </div>
        ) : null}
        <div className="nav-month">
          {dateFns.format(selectedMonth, 'MMMM YYYY')}
        </div>
        <div
          className={`nav ${ahead ? 'pend' : null}`}
          onClick={() => {
            setMonth(dateFns.addMonths(selectedMonth, 1));
            setRefArray([]);
          }}
        >
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

  const handleFilterClick = e => {
    setFullFilter(null);
    if (e.target.className.includes('pendingApp')) {
      setFilter(props.appointments);
    } else if (
      e.target.className.includes('openDays') ||
      e.target.className.includes('closedDays')
    ) {
      setFilter(props.schedules);
    }
  };

  const handleFullClick = e => {
    setFilter(null);
    setFullFilter(props.schedules);
  };

  const handleAllDays = e => {
    setFilter(null);
    setFullFilter(null);
  };

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
      let aIds = [];
      if (filter) {
        if (filter[0].scheduleId) {
          aIds = filter.map(a => {
            return a.id;
          });
        }
        if (filter[0].id) {
          aIds = filter.map(a => {
            return a.id;
          });
        }
      }
      let fFilterIds = [];
      if (fullFilter) {
        if (fullFilter[0].id) {
          fFilterIds = fullFilter.map(a => {
            return a.id;
          });
        }
      }

      const theSSched = daySched.filter(a => {
        return fFilterIds.includes(a.id);
      });

      const theApp = dayApp.filter(a => {
        return aIds.includes(a.id);
      });

      const theSched = daySched.filter(a => {
        return aIds.includes(a.id);
      });

      let pending = [];
      let open = [];
      let closed = [];
      if (theApp) {
        pending = theApp.filter(a => {
          return a.confirmed === null;
        });
      }
      if (theSched) {
        const theOpen = theSched.filter(s => {
          return s.open === true;
        });
        const pending = dayApp.filter(a => {
          return a.confirmed === null;
        });

        const pendingApp = theOpen.map(s => {
          return pending.filter(a => {
            return dateFns.isSameHour(a.startTime, s.startTime);
          });
        });

        pendingApp.forEach(arr => {
          if (arr.length === 0) {
            open = theOpen;
          }
        });
      }
      if (theSSched) {
        const theOpen = theSSched.filter(s => {
          return s.open === false;
        });

        if (theOpen.length === daySched.length) {
          closed = theOpen;
        }
      }

      days.push(
        <div
          key={temp}
          id={id}
          data-ref={render}
          ref={refCallback}
          className={`spacer ${
            isSameDay
              ? ' selected day'
              : pending.length > 0
              ? 'pend'
              : open.length > 0
              ? 'open'
              : closed.length > 0
              ? 'closed'
              : !dateFns.isSameMonth(temp, selectedMonth)
              ? 'disable'
              : ''
          }`}
          onClick={() => handleSelect(temp)}
        >
          <div className={`date ${dateFns.isToday(day) ? 'today' : null}`}>
            {dateFns.format(day, 'D')}
          </div>
          <div
            className={`add ${!isSameDay ? 'disabled' : null}`}
            data-day={id}
            onClick={setPos}
          >
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
          {daySched.length > 1 ||
          (daySched.length >= 1 && dayApp.length > 0) ? (
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
      // console.log(state.appointments);
    }

    return <div className="cel-container">{days}</div>;
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
    <>
      <TopNavbar />
      <NavBarContractor />
      <div className="main-body">
        <div className="filterButtons">
          <button className="fbutt pendingApp" onClick={handleFilterClick}>
            Pending Appointments
          </button>
          <button className="fbutt openDays" onClick={handleFilterClick}>
            Open Days
          </button>
          <button className="fbutt closedDays" onClick={handleFullClick}>
            Fully Booked Days
          </button>
          <button className="fbutt wholeCal" onClick={handleAllDays}>
            All Days
          </button>
        </div>
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
          {/* <ServiceForm /> */}
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
      </div>
    </>
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
