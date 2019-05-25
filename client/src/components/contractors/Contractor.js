import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import Calendar from '../calendar/Calendar';

import { selectContractor } from '../../actions/index';

function Contractor(props) {

  useEffect(() => {
    props.selectContractor(props.match.params.id, props.list) // replace with get request
    // eslint-disable-next-line
  }, [props.contractor])

  return (
    <div>
      <h3>{props.contractor.name}</h3>
      <Calendar contractor={props.contractor} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    list: state.accounts.contractors,
    contractor: state.thisContractor,
    selectedDay: state.thisDay,
    schedule: state.schedule
  }
}

export default connect(mapStateToProps, { selectContractor })(Contractor);
