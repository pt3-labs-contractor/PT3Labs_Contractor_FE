import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';

function AvailabilityList(props) {
  const [availability, setAvailability] = useState([]);
  const [pos, setPos] = useState({});
  const { selectedDay, schedule, position } = props;
  const mql = window.matchMedia('(max-width: 600px)').matches;

  useEffect(() => {
    const date = schedule.filter(item => {
      return dateFns.isSameDay(item.startTime, selectedDay);
    });
    setAvailability(date);
    // eslint-disable-next-line
  }, [selectedDay, schedule]);

  useEffect(() => {
    if (!mql && !props.contractor) {
      const { top, right, height } = position;
      setPos({
        position: 'fixed',
        top,
        left: right,
        minHeight: height,
      });
    }
  }, [props.position]);

  const RenderTimes = () => {
    const times = availability.map(item => {
      const start = dateFns.startOfHour(item.startTime);
      // let end; dateFns.addHours(start, item.duration.hours);
      let end = start;
      if (item.duration.hours) {
        end = dateFns.addHours(start, item.duration.hours);
      }
      if (item.duration.minutes) {
        end = dateFns.addMinutes(end, item.duration.minutes);
      }
      if (item.duration.seconds) {
        end = dateFns.addSeconds(end, item.duration.seconds);
      }
      if (item.duration.milliseconds) {
        end = dateFns.addMilliseconds(end, item.duration.milliseconds);
      }
      return (
        <button key={item.id} onClick={() => props.setAppointment(item)}>
          {`${dateFns.format(start, 'HH:mm')} - ${dateFns.format(
            end,
            'HH:mm'
          )}`}
        </button>
      );
    });
    return <>{times}</>;
  };

  return (
    <div
      style={pos}
      className={`availability-list ${
        availability.length > 0 ? 'display' : ''
      }`}
    >
      <RenderTimes />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    schedule: state.schedule,
    selectedDay: state.thisDay,
    position: state.positionContractor,
  };
};

export default connect(mapStateToProps)(AvailabilityList);
