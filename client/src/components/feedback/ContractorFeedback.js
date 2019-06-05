import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
<<<<<<< HEAD
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
=======
// import Rating from 'react-rating';

function ContractorFeedback(props) {
  return (
    <div>
      <h2>Contractor OWN Feedback Page</h2>
      {props.loading ? <p>Loading...</p> : null}
      {props.error ? <p>{props.error}</p> : null}
      {/* {props.feedback.map(contractor => (
>>>>>>> 5f9194abc78c77a5100f4514654b489635b9b9df
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
<<<<<<< HEAD
      </div>
    </>
=======
    </div>
>>>>>>> 5f9194abc78c77a5100f4514654b489635b9b9df
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
