import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';

function AvailabilityList(props) {
  const [availability, setAvailability] = useState([]);
  const { selectedDay, schedule, setAppointment } = props;

  useEffect(() => {
    const date = schedule.filter(item => {
      return dateFns.isSameDay(item.startTime, selectedDay);
    });
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
        <button
          type="button"
          key={item.id}
          onClick={() => setAppointment(item)}
        >
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
  };
};

export default connect(mapStateToProps)(AvailabilityList);

AvailabilityList.propTypes = {
  schedule: PropTypes.arrayOf(
    PropTypes.shape({
      contractorId: PropTypes.string,
      id: PropTypes.string,
      startTime: PropTypes.string,
      duration: PropTypes.shape({
        hours: PropTypes.number,
      }),
      open: PropTypes.bool,
      createAt: PropTypes.string,
    })
  ),
  selectedDay: PropTypes.instanceOf(Date),
  setAppointment: PropTypes.func,
};

AvailabilityList.defaultProps = {
  schedule: null,
  selectedDay: null,
  setAppointment: null,
};
