import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Calendar from '../calendar/Calendar';
import ContractorCard from './ContractorCard';

import { selectContractor } from '../../actions/index';
import NavBarContractor from '../navbar/NavBarContractor';

function Contractor(props) {
  useEffect(() => {
    props.selectContractor(props.match.params.id, props.list); // replace with get request
    // eslint-disable-next-line
  }, [props.contractor]);

  return (
    <div>
      <NavBarContractor />
      <ContractorCard contractor={props.contractor} />
      <Calendar contractor={props.contractor} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    list: state.contractors,
    contractor: state.thisContractor,
    selectedDay: state.thisDay,
    schedule: state.schedule,
  };
};

export default connect(
  mapStateToProps,
  { selectContractor }
)(Contractor);
