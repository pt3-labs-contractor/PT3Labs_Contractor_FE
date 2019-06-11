import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import NavBarUser from '../navbar/NavBarUser';
import { getUserWrittenFeedback } from '../../actions/index';

function UserFeedback(props) {
  const { id } = props.match.params;
  useEffect(() => {
    Promise.all([
      props.getUserWrittenFeedback(id)
    ])
  })
  console.log(props)
  return (
    <>
      <NavBarUser />
      <div>
        <h2>User giving Feedback Page</h2>
        <div>
          <h2>Appointment Info</h2>
        </div>
      <div>
      {/** need to write up a card for the feedback to map through */}
        {/* {props.loading ? <p>Loading...</p> : null}
        {props.error ? <p>{props.error}</p> : null}
        {props.feedback.map(feedback => (
            <ContractorCard feedback={feedback} />
        ))} */}
      </div>
        <form>
          <h4>Feedback Form</h4>
          <div>
            <h4>Overall Rating</h4>
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
            />
            <input placeholder="Details" />
          </div>
          <div>
            <h4>Consultation?</h4>
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
            />
            <input placeholder="Details" />
          </div>
          <div>
            <h4>Punctual?</h4>
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
            />
            <input placeholder="Details" />
          </div>
          <div>
            <h4>Customer Service?</h4>
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
            />
            <input placeholder="Details" />
          </div>
        </form>

      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    feedback: state.feedback,
    // contractors: state.accounts.contractors,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(mapStateToProps, getUserWrittenFeedback)(UserFeedback);
