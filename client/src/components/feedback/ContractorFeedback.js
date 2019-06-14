import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import NavBarContractor from '../navbar/NavBarContractor';
import './ContractorFeedback.css';

function ContractorFeedback(props) {
  return (
    <>
      <NavBarContractor />
      <div className="main-body feedback-body">
        <h2>Contractor OWN Feedback Page</h2>
        {/* {props.loading ? <p>Loading...</p> : null}
        {props.error ? <p>{props.error}</p> : null}
        {props.feedback.map(contractor => (
          <div>
            Username: {props.feedback.users.username}
            Rating:{' '}
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              readonly
              placeholderRating={props.feedback.stars}
              stop={3}
            />
            Message: {props.feedback.message}
          </div>
        ))} */}
        <form className="contractor-feedback-container">
          <h2>Feedback Form</h2>
          <div className="feedback-card">
            <div className="feedback-header">
              <div>
                <h4>Client: Cindy</h4>
                <h4>Overall Rating</h4>
                <Rating
                  emptySymbol={<span className="icon-text">&#9734;</span>}
                  fullSymbol={<span className="icon-text">&#9733;</span>}
                  stop={3}
                />
              </div>
              <div>
                <i className="fas fa-pencil-alt" />
                <i className="far fa-trash-alt" />
              </div>
            </div>
          </div>
          <div className="contractor-feedback-context">
            <p>Client reviews of the contractor:</p>
          </div>
          <div>date:</div>
        </form>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    // contractors: state.accounts.contractors,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(mapStateToProps)(ContractorFeedback);
