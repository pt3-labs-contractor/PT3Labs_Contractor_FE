import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import NavBarContractor from '../navbar/NavBarContractor';
import './ContractorFeedback.css';
import TopNavbar from '../navbar/TopNavbar';
import dateFns from 'date-fns';
import { getFeedback } from '../../actions/index';

function ContractorFeedback(props) {
  console.log(props);

  useEffect(() => {
    props.getFeedback();
  }, []);

  return (
    <>
      <TopNavbar />
      <NavBarContractor />
      <div className="main-body">
        <div className="feedback-body-contractor">
          <h2 className="main-header-title">Reviews</h2>
          {props.feedback.map(feedback => (
            <div key={feedback.id} className="feedback-container">
              Client: {feedback.username}
              {'\n'}
              <div>
                Rating:{' '}
                <Rating
                  emptySymbol={<span className="icon-text">&#9734;</span>}
                  fullSymbol={
                    <span className="icon-text fullstar">&#9733;</span>
                  }
                  readonly
                  initialRating={feedback.stars}
                  stop={3}
                />
                {'\n'}
                <div className="feedback-context">
                  <p>
                    <span className="quotes">"</span>
                    {feedback.message}
                    <span className="quotes">"</span>
                  </p>
                </div>
                <div className="posted">
                  Posted: {dateFns.format(feedback.createdAt, 'MMM DD YYYY')}
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
    feedback: state.feedback,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  { getFeedback }
)(ContractorFeedback);
