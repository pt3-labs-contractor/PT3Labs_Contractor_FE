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
  };

  function renderDaysOfMonth() {
    const startMonth = dateFns.startOfMonth(selectedMonth);
    const endMonth = dateFns.endOfMonth(selectedMonth);
    const startCalendar = dateFns.startOfWeek(startMonth);
    const endCalendar = dateFns.endOfWeek(endMonth);

    let day = startCalendar;
    let days = [];

    while(day <= endCalendar) {
      days.push(
        <div>{dateFns.format(day, 'D')}</div>
      )
      day = dateFns.addDays(day, 1);
    }

    return <div>{days}</div>
  }

  return (
    <div>
      {renderDaysOfWeek()}
      {renderDaysOfMonth()}
    </div>
  )
}

export default Calendar
