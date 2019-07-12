import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { resetFailure } from '../../../actions/index.js';

const ErrorBox = props => {
  return (
    <div className="errorNot">
      <div className="error">{props.error}</div>
      <button
        className="ok"
        onClick={e => {
          props.resetFailure();
        }}
      >
        Ok
      </button>
      <button
        className="plans"
        onClick={e => {
          props.history.push('/plans');
        }}
      >
        Upgrade Plan
      </button>
    </div>
  );
};

export default connect(
  null,
  { resetFailure }
)(ErrorBox);
