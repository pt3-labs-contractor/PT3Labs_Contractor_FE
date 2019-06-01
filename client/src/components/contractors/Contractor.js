import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Calendar from '../calendar/Calendar';
import ContractorCard from './ContractorCard';
import AvailabilityList from '../appointments/AvailabilityList';

import { selectContractor, fetchSchedule } from '../../actions/index';

function Contractor(props) {
  useEffect(() => {
    const { id } = props.match.params;
    props.selectContractor(id, props.list);
    props.fetchSchedule(id);
    // eslint-disable-next-line
  }, [props.selectedDay]);

  return (
    <div>
      <ContractorCard contractor={props.contractor} />
      <Calendar contractor={props.contractor} />
      <AvailabilityList selectedDay={props.selectedDay} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    list: state.accounts.contractors,
    contractor: state.thisContractor,
    selectedDay: state.thisDay,
    schedule: state.schedule,
    error: state.errorSchedule,
  };
};

export default connect(
  mapStateToProps,
  { selectContractor, fetchSchedule }
)(Contractor);