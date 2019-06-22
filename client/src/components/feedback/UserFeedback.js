import React, { useState } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import NavBarUser from '../navbar/NavBarUser';
import './UserFeedback.css';
import { getFeedback, postFeedback, deleteFeedback } from '../../actions/index';

import TopNavbar from '../navbar/TopNavbar';

function UserFeedback(props) {
  const { id } = props.user;
  const currentStar = 0;
  const [stars, setStars] = useState(currentStar);
  const [message, setMessage] = useState('');
  const [contractorId, setContractorId] = useState('');
  // console.log(props)

  function deleteFeedback(feedback) {
    // feedback.preventDefault();
    // e.preventDefault();
    // console.log(feedback)
    props.deleteFeedback(feedback.id);
  }
  function handleChange(contrID) {
    // e.preventDefault();
    setContractorId(contrID);
    // console.log(contrID)
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(contractorId)

    props.postFeedback({ contractorId, id, stars, message });
    // console.log({stars, message, contractorId, id})

    // console.log(props)
  }

  return (
    <>
      <TopNavbar />
      <NavBarUser />
      <div className="main-body feedback-body">
        <h2>User giving Feedback Page</h2>

        <form onSubmit={handleSubmit} className="feedback-container">
          <h4>Feedback Form</h4>
          <h4>Which Contractor?</h4>
          <div>
            <select
              value={contractorId}
              onChange={e => handleChange(e.target.value)}
            >
              {props.contractor.map(contractor => (
                <option
                  value={contractor.id}
                  onChange={e => handleChange(e.target.value)}
                >
                  {contractor.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h4>Overall Rating</h4>
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
              initialRating={stars}
              onChange={e => setStars(e)}
            />
            {/* <input
              placeholder="Details"
              type="text"
              name="overallFeedback"
              value={overall}
              onChange={e => setOverall(e.target.value)}
            /> */}
          </div>
          <div>
            {/* 
              <div>
              <h4>Consultation?</h4>
              <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
              value={consultationStars}
              />
              <input
              placeholder="Details"
              type="text"
              name="consulation"
              value={consultation}
              onChange={e => setConsultation(e.target.value)}
              />
            </div> */}
            {/* 
              <div>
              <h4>Punctual?</h4>
              <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
              value={punctualStars}
              />
              <input
              placeholder="punctual"
              type="text"
              name="punctual"
              value={punctual}
              onChange={e => setPunctual(e.target.value)}
              />
            </div> */}

            {/* <div>
            <h4>Customer Service?</h4>
            <Rating
            emptySymbol={<span className="icon-text">&#9734;</span>}
            fullSymbol={<span className="icon-text">&#9733;</span>}
            stop={3}
            value={customerServiceStars}
            />
            <input
            placeholder="Details"
            type="text"
            name="CS"
            value={customerService}
            onChange={e => setCustormerService(e.target.value)}
            />
          </div> */}
          </div>
          <textarea
            className="form-textarea"
            placeholder="Leave a comment"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />

          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
        <div>
          <h4>The Feedbacks You've given</h4>
          <div>
            {props.loading ? <p>Loading...</p> : null}
            {props.error ? <p>{props.error}</p> : null}
            {props.feedback.map(feedback => (
              <div key={feedback.id}>
                <h2>{feedback.contractorName}</h2>
                <Rating
                  emptySymbol={<span className="icon-text">&#9734;</span>}
                  fullSymbol={
                    <span className="icon-text fullstar">&#9733;</span>
                  }
                  readonly
                  initialRating={feedback.stars}
                  stop={3}
                />
                <p>{feedback.message}</p>
                <button onClick={e => deleteFeedback(feedback)}>
                  Delete Feedback
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
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
  { getFeedback, postFeedback, deleteFeedback }
)(UserFeedback);
