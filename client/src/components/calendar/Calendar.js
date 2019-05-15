import React, { useState } from 'react'
import dateFns from 'date-fns';

function Calendar() {
  const [ selectedMonth, setMonth ] = useState(new Date());
  const [ selectedDay, setDay ] = useState(new Date());

  function renderDaysOfWeek() {
    let days = [];

    let start = dateFns.startOfWeek(selectedMonth);

    for(let i = 0; i < 7; i++) {
      days.push(
        <div>
          {dateFns.format(dateFns.addDays(start, i), 'dddd')}
        </div>
      )
    }
    return <div>{days}</div>
  }

  return (
    <div>
      {renderDaysOfWeek()}
    </div>
  )
}

export default Calendar
