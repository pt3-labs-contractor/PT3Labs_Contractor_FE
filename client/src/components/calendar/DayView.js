import React from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';

function DayView(props) {

  function WorkHours() {
    let date = new Date().setHours(6, 0);
    let times = []

    for(let i = 0; i < 14; i++) {
      times.push(
        <div>
          {dateFns.format(dateFns.addHours(date, i), "hh:mm")}
        </div>
      )
    }
    return <div>{times}</div>
  }

  return (
    <div>
      {dateFns.format(props.today, 'ddd MMM Do')}
      <WorkHours />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    today: state.thisDay
  }
}

export default connect(mapStateToProps)(DayView);
