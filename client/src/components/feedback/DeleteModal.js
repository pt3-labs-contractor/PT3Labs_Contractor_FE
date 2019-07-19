import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getFeedback, deleteFeedback } from '../../actions/index';

import './DeleteModal.css';

function DeleteModal(props) {
  const stringify = JSON.stringify(props.feedback);

  useEffect(() => {
    props.getFeedback();
  }, [stringify]);

  function deleteFeedback(feedback) {
    console.log(feedback);
    props.deleteFeedback(localStorage.id);
    props.myToggle(true);
  }

  // const backToFeedback = () => {
  //   props.history.push(`/userfeedback`);
  // };

  return (
    <div className={`delete-modal ${props.toggle ? 'active' : 'disabled'}`}>
      <div className="delete-heading">
        <h1>Are you sure you want to delete this feedback?</h1>
      </div>
      <div>
        <button
          onClick={() => {
            deleteFeedback(props.id);
          }}
          className="btn btn-danger"
        >
          Yes
        </button>
        <button
          onClick={() => props.myToggle(false)}
          className="btn btn-secondary"
        >
          No
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    feedback: state.feedback,
    user: state.user,
    loading: state.loading,
    error: state.error,
    contractor: state.contractors,
  };
};

export default connect(
  mapStateToProps,
  { getFeedback, deleteFeedback }
)(DeleteModal);
