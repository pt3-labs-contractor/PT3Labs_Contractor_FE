import React from 'react';
import { connect } from 'react-redux';
import NavBarContractor from '../navbar/NavBarContractor';
import Rating from 'react-rating';

function ContractorFeedback(props) {

  return (
    <>
      <NavBarContractor />
      <div className="main-body">
        <h2>Contractor OWN Feedback Page</h2>
        {props.loading ? <p>Loading...</p> : null}
        {props.error ? <p>{props.error}</p> : null}
        
        {props.Feedback.map(feedback => (
          <div>
            By: {feedback.username}
            {'\n'}

            Rating: <Rating
                emptySymbol={<span className="icon-text">&#9734;</span>}
                fullSymbol={<span className="icon-text">&#9733;</span>}
                readonly
                placeholderRating={feedback.stars}
                stop={3}
                />
             {'\n'}

            Message: {feedback.message}
          </div>
        ))}
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
