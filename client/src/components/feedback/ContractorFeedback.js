import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBarContractor from '../navbar/NavBarContractor';
// import Rating from 'react-rating';
import { getContractorFeedback } from '../../actions/index';

function ContractorFeedback(props) {
  const { id } = props.match.params;
  // console.log(id)
  useEffect(() => {
    Promise.all([
      props.getContractorFeedback(id)
    ])
  })
  console.log(props);
  return (
    <>
      <NavBarContractor />
      <div className="main-body">
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
  // console.log(state)
  return {
    feedback: state.feedback,
    loading: state.loading,
    error: state.error,
  };
};


export default connect(mapStateToProps, getContractorFeedback)(ContractorFeedback);
