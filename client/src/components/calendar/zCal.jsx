import React, { useState, useEffect } from 'react';
import 'tui-calendar/dist/tui-calendar.css';
import Calendar from '@toast-ui/react-calendar';
import Cpop from './creationPop.jsx';
import OnClickPop from './onClickPop.jsx';
import './zCal.css';

const MyComponent = props => {
  const [readOnly, setReadOnly] = useState(false);
  let [start, setStart] = useState(new Date());
  let [end, setEnd] = useState(new Date());
  const [mount, setMount] = useState(false);
  // const [title, setTitle] = useState();
  // const [location, setLocation] = useState();
  const [hidden, setHidden] = useState(true);
  const [hiddenTwo, setHiddenTwo] = useState(true);
  let [schedule, setSchedule] = useState({});
  let [schedules, setSchedules] = useState([]);
  let [delSchedules, setDelSchedules] = useState([]);
  let [create, setCreate] = useState(true);
  const today = new Date();
  const getDate = (type, start, value, operator) => {
    start = new Date(start);
    type = type.charAt(0).toUpperCase() + type.slice(1);

    if (operator === '+') {
      start[`set${type}`](start[`get${type}`]() + value);
    } else {
      start[`set${type}`](start[`get${type}`]() - value);
    }

    return start;
  };

  const calRef = React.createRef();
  const change = e => {
    const cRef = calRef.current.getInstance();
    switch (true) {
      case e.target.id === 'next':
        cRef.next();
        break;
      case e.target.id === 'prev':
        cRef.prev();
        break;
      case e.target.id === 'day':
        cRef.changeView('day', true);
        break;
      case e.target.id === 'week':
        cRef.changeView('week', true);
        break;
    }
  };

  const getSchedules = () => {
    console.log(schedules);
    return schedules;
  };

  const editSch = (e, sch) => {
    const schedule = e.schedule;
    const startTime = e.start;
    const endTime = e.end;
    const title = schedule.title;
    const location = schedule.location;
    const newSched = {
      start: startTime,
      end: endTime,
      title: title,
      location: location,
    };
    schedules = [...schedules, { ...schedule }];
    let selected = schedules.find(s => {
      return s.id === schedule.id;
    });
    let dSched = schedules.filter(s => {
      return s.id !== schedule.id;
    });
    selected = {
      ...selected,
      start: startTime,
      end: endTime,
      title: title,
      location: location,
    };
    schedules = [...dSched, selected];
    setSchedules([...dSched, selected]);
    console.log('test');
  };

  const greatestId = () => {
    const ids = schedules.map(s => {
      return s.id;
    });
    let newId;
    if (ids.length > 0) {
      newId = Math.max(...ids) + 1;
    } else {
      newId = 1;
    }
    return newId;
  };

  const clear = () => {
    const cRef = calRef.current.getInstance();
    cRef.clear();
  };

  const createSch = e => {
    console.log(schedules);
    if (create === true) {
      setHidden(false);
      const startTime = e.start;
      const endTime = e.end;
      const title = e.title;
      const location = e.location;
      const schedule = {
        id: String(greatestId()),
        calendarId: '0',
        title: title,
        category: 'time',
        dueDateClass: '',
        start: e.start,
        end: e.end,
        location: location,
        isReadOnly: false,
      };
      start = new Date(e.start);
      end = new Date(e.end);
      schedules.push(schedule);
      setMount(false);
      setReadOnly(true);
      setSchedules(schedules);
    } else {
      schedules = schedules.filter(s => {
        return s.id !== schedule.id;
      });
    }
  };
  // console.log(schedules);

  const lastSch = e => {
    const cRef = calRef.current.getInstance();
    const ids = schedules.map(s => {
      return s.id;
    });
    const lastId = ids[ids.length - 1];
    const lastS = cRef.getSchedule(String(lastId), '0');
    return lastS;
  };

  const credForm = sch => {
    // const cRef = calRef.current.getInstance();
    let sched;
    if (schedule.id) {
      sched = schedule;
    } else {
      sched = schedules[schedules.length - 1];
    }
    const start = sched.start;
    const end = sched.end;
    const title = sch.title;
    const location = sch.location;
    schedules = schedules.map(s => {
      if (s.id === sched.id) {
        s.title = sch.title;
        s.location = sch.location;
      }
      return s;
    });
    setHidden(true);
    setReadOnly(false);
    setSchedules(schedules);
    setSchedule({});
  };

  const setCre = () => {
    create = false;
    setCreate(false);
  };

  const delSch = () => {
    const sched = schedule;
    schedules = schedules.filter(s => {
      return s.id !== sched.id;
    });
    console.log(schedules);
    setSchedules(schedules);
    setHiddenTwo(true);
    setCre(true);
  };

  const schBox = e => {
    setHiddenTwo(false);
    setMount(false);
    let schedule = e.schedule;
    console.log(e.schedule);
    schedule.start = new Date(schedule.start);
    schedule.end = new Date(schedule.end);
    setSchedule(schedule);
    setMount(true);
  };

  const editClick = () => {
    setHidden(false);
    setHiddenTwo(true);
    setMount(false);
  };

  return (
    <div className="calComp">
      <Cpop
        cred={credForm}
        edit={editSch}
        klass={hidden}
        title={schedule.title}
        location={schedule.location}
        data={schedule}
        mount={mount}
      />
      <OnClickPop
        klass={hiddenTwo}
        title={schedule.title || ''}
        location={schedule.location || ''}
        start={String(schedule.start)}
        end={String(schedule.end)}
        editClick={editClick}
        delSch={delSch}
        setCre={setCre}
        createSch={createSch}
      />
      <Calendar
        schedules={schedules}
        onBeforeUpdateSchedule={editSch}
        onBeforeCreateSchedule={createSch}
        onBeforeDeleteSchedule={createSch}
        onClickSchedule={schBox}
        height="100%"
        ref={calRef}
        calendars={[
          {
            id: '0',
            name: 'Private',
            bgColor: '#9e5fff',
            borderColor: '#9e5fff',
          },
          {
            id: '1',
            name: 'Company',
            bgColor: '#00a9ff',
            borderColor: '#00a9ff',
          },
        ]}
        disableDblClick={true}
        isReadOnly={readOnly}
        scheduleView
        taskView={false}
        template={{
          milestone(schedule) {
            return `<span style="color:#fff;background-color: ${
              schedule.bgColor
            };">${schedule.title}</span>`;
          },
          milestoneTitle() {
            return 'Milestone';
          },
          allday(schedule) {
            return `${schedule.title}<i class="fa fa-refresh"></i>`;
          },
          alldayTitle() {
            return 'All Day';
          },
        }}
        // timezones={[
        //   {
        //     timezoneOffset: 540,
        //     displayLabel: "GMT+09:00",
        //     tooltip: "Seoul"
        //   },
        //   {
        //     timezoneOffset: -420,
        //     displayLabel: "GMT-08:00",
        //     tooltip: "Los Angeles"
        //   }
        // ]}
        // useDetailPopup
        // useCreationPopup
        week={{
          hourStart: 7,
          hourEnd: 18,
        }}
      />
      <button id="next" onClick={change}>
        Next
      </button>
      <button id="prev" onClick={change}>
        Prev
      </button>
      <button id="day" onClick={change}>
        Day
      </button>
      <button id="week" onClick={change}>
        Week
      </button>
    </div>
  );
};

export default MyComponent;
