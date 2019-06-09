import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';

function AvailabilityList(props) {
  const [availability, setAvailability] = useState([]);
  const { selectedDay, schedule } = props;

  useEffect(() => {
    const date = schedule.filter(item =>
      dateFns.isSameDay(item.startTime, selectedDay)
    );
    setAvailability(date);
    // eslint-disable-next-line
  }, [selectedDay, schedule]);

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
        <div
          key={item.id}
          onClick={props.contractor ? () => props.setAppointment(item) : null}
        >
          {`${dateFns.format(start, 'HH:mm')} - ${dateFns.format(
            end,
            'HH:mm'
          )}`}
        </div>
      );
    });
    return <>{times}</>;
  };

  return (
    <div>
      <RenderTimes />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    schedule: state.schedule,
  };
};

export default connect(mapStateToProps)(AvailabilityList);
