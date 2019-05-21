import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function ContractorList(props) {
  return (
    <div>
        <h2>Contractor Setting Page</h2>
    </div>
  )
}

const mapStateToProps = state => {
    console.log(state)
  return {
    // contractors: state.accounts.contractors,
    loading: state.loading,
    error: state.error
  }
}

export default connect(mapStateToProps)(ContractorList);
