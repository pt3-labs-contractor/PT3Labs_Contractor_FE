import React from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import NavBarContractor from '../navbar/NavBarContractor';
import './ContractorFeedback.css';
import TopNavbar from '../navbar/TopNavbar';

function ContractorFeedback(props) {
  return (
    <>
      <TopNavbar />
      <NavBarContractor />
      <div className="main-body">
        <div className="feedback-body-contractor">
          <h2 className="main-header-title">Reviews</h2>
          {props.Feedback.map(feedback => (
            <div className="contractor-feedback-container">
              By: {feedback.username}
              {'\n'}
              <div>
                Rating:{' '}
                <Rating
                  emptySymbol={<span className="icon-text">&#9734;</span>}
                  fullSymbol={<span className="icon-text">&#9733;</span>}
                  readonly
                  placeholderRating={feedback.stars}
                  stop={3}
                />
                {'\n'}
                <div className="contractor-feedback-context">
                  Message: {feedback.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    Feedback: state.feedback,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(mapStateToProps)(ContractorFeedback);
