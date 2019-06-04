import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import NavBarContractor from '../navbar/NavBarContractor';

function ContractorFeedback(props) {
  return (
    <>
      <NavBarContractor />
      <div>
        <h2>Contractor OWN Feedback Page</h2>
        {props.loading ? <p>Loading...</p> : null}
        {props.error ? <p>{props.error}</p> : null}
        {/* {props.feedback.map(contractor => (
          <div>
            Username: {props.feedback.users.username}

            Rating: <Rating
                emptySymbol={<span className="icon-text">&#9734;</span>}
                fullSymbol={<span className="icon-text">&#9733;</span>}
                readonly
                placeholderRating={props.feedback.stars}
                stop={3}
                />
            Message: {props.feedback.message}
          </div>
        ))} */}
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
