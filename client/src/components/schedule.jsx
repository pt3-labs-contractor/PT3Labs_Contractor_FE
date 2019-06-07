import React, { useState } from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { deleteSchedule } from '../actions/index';
import EScheduler from './editForm';

const Schedule = props => {
  const [hidden, setHidden] = useState(true);
  const { id, start, duration } = props;
  const modifiedStart = dateFns.format(start, 'HH:mm A');
  let end = start;
  if (duration.hours) {
    end = dateFns.addHours(start, duration.hours);
  }
  if (duration.minutes) {
    end = dateFns.addMinutes(end, duration.minutes);
  }
  if (duration.seconds) {
    end = dateFns.addSeconds(end, duration.seconds);
  }
  if (duration.milliseconds) {
    end = dateFns.addMilliseconds(end, duration.milliseconds);
  }

  const deleteSched = () => {
    props.deleteSchedule(id);
  };

  const unhide = () => {
    hidden === true ? setHidden(false) : setHidden(true);
  };

  const modifiedEnd = dateFns.format(end, 'HH:mm A');
  return (
    <div className="schedCont">
      <div className="delete" onClick={deleteSched}>
        {' '}
        X{' '}
      </div>
      {/* <div className="edit" onClick={unhide}> */}
      {/*   Edit */}
      {/* </div> */}
      <Link to="/shc/edit">Edit</Link>
      <p className="timeSlot">
        {modifiedStart} - {modifiedEnd}{' '}
      </p>
      <Route path="/shc/edit" component={EScheduler} />
    </div>
  );
};

export default connect(
  null,
  { deleteSchedule }
)(Schedule);
