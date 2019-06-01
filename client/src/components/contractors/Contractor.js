import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Calendar from '../calendar/Calendar';
import ContractorCard from './ContractorCard';

import { selectContractor, fetchSchedule } from '../../actions/index';

function Contractor(props) {
  useEffect(() => {
    const { id } = props.match.params;
    props.selectContractor(id, props.list);
    props.fetchSchedule(id);
    // eslint-disable-next-line
  }, [props.contractor]);

  return (
    <div>
      <ContractorCard contractor={props.contractor} />
      <Calendar contractor={props.contractor} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    list: state.accounts.contractors,
    contractor: state.thisContractor,
    selectedDay: state.thisDay,
    schedule: state.schedule,
  };
};

export default connect(
  mapStateToProps,
  { selectContractor, fetchSchedule }
)(Contractor);
