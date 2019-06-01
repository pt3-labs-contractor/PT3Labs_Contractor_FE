import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import dateFns from 'date-fns';

function AppointmentList(props) {
  const [appointment, setAppointment] = useState([]);
  const {selectedDay, schedule} = props;

  useEffect(() => {
    const date = schedule.filter(item => dateFns.isSameDay(item, selectedDay));
    setAppointment(date);
    // eslint-disable-next-line
  }, [selectedDay])

  return (
    <div>
      {appointment.map(item => (
        <>
        {dateFns.format(item, "HH:mm ")}
        </>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    schedule: state.schedule
  }
}

export default connect(mapStateToProps)(AppointmentList);
