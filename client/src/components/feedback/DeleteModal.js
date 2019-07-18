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
      <h1>Are you sure you want to Delete this?</h1>
      <button
        onClick={() => {
          deleteFeedback(props.id);
        }}
      >
        delete
      </button>
      <button onClick={() => props.myToggle(false)}>No</button>
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
