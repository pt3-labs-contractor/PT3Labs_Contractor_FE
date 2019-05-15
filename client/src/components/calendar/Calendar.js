import React, { useState } from 'react'
import dateFns from 'date-fns';

function Calendar() {
  const [ selectedMonth, setMonth ] = useState(new Date());
  const [ selectedDay, setDay ] = useState(new Date());

  function CalendarNav() {
    return (
      <div>
        <div onClick={() => setMonth(dateFns.subMonths(selectedMonth, 1))}>***</div>
        <div>{dateFns.format(selectedMonth, "MMMM YYYY")}</div>
        <div onClick={() => setMonth(dateFns.addMonths(selectedMonth, 1))}>***</div>
      </div>
    )
  }

  function DaysOfWeek() {
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

  function DaysOfMonth() {
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
      <CalendarNav/>
      <DaysOfWeek/>
      <DaysOfMonth/>
    </div>
  )
}

export default Calendar
