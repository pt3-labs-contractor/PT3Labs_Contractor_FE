import React, { useState } from 'react'
import dateFns from 'date-fns';

import './Calendar.css';

function Calendar() {
  const [ selectedMonth, setMonth ] = useState(new Date());
  const [ selectedDay, setDay ] = useState(new Date());

  function CalendarNav() {
    return (
      <div class="calendar-nav">
        { !dateFns.isThisMonth(selectedMonth) 
          ? <div onClick={() => setMonth(dateFns.subMonths(selectedMonth, 1))}>&lt;</div> 
          : null }
        <div>{dateFns.format(selectedMonth, "MMMM YYYY")}</div>
        <div onClick={() => setMonth(dateFns.addMonths(selectedMonth, 1))}>&gt;</div>
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
    return <div class="day-container">{days}</div>
  };

  function DaysOfMonth() {
    const startMonth = dateFns.startOfMonth(selectedMonth);
    const endMonth = dateFns.endOfMonth(selectedMonth);
    const startCalendar = dateFns.startOfWeek(startMonth);
    const endCalendar = dateFns.endOfWeek(endMonth);

    let day = startCalendar;
    let days = [];

    while(day <= endCalendar) {
      const temp = day
      days.push(
        <div 
          class={`cell ${
            dateFns.isSameDay(temp, selectedDay) 
              ? " selected" 
              : !dateFns.isSameMonth(temp, selectedMonth) 
                ? "disable" : ""}`}
          onClick={
            dateFns.isSameMonth(temp, selectedMonth) 
              ? () => setDay(temp) 
              : () => {
                setMonth(temp); 
                setDay(temp)
              }}
        >
          {dateFns.format(day, 'D')}
        </div>
      )
      day = dateFns.addDays(day, 1);
    }

    return <div class="cell-container">{days}</div>
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
