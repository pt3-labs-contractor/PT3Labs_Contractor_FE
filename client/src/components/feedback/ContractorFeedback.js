import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function ContractorFeedback(props) {
  return (
    <div>
        <h2>Contractor OWN Feedback Page</h2>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    // contractors: state.accounts.contractors,
    loading: state.loading,
    error: state.error
  }
}

export default connect(mapStateToProps)(ContractorFeedback);
