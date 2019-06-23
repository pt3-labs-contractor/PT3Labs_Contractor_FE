import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import NavBarUser from '../navbar/NavBarUser';
import './UserFeedback.css';
import { getFeedback, postFeedback, deleteFeedback } from '../../actions/index';

import TopNavbar from '../navbar/TopNavbar';
import dateFns from 'date-fns';

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
        <div className="appointment-info">
          <div className="appointment-heading">
            <h4>Appointment Info</h4>
          </div>
          <div className="appointment-body">
            <div className="appointment-item">
              <h4>Contractor</h4>
            </div>
            <div className="appointment-item">
              <h4>Service</h4>
            </div>
            <div className="appointment-item">
              <h4>Date</h4>
            </div>
            <div className="appointment-item">
              <h4>Time</h4>
            </div>
          </div>
        </div>

        <h2>Appointment Info</h2>

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
              placeholderSymbol={<span className="icon-text">&#9734;</span>}
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
      <div className="main-body">
        <div className="feedback-body-user">
          <h2 className="main-header-title">Feedback</h2>

          <div>
            <form onSubmit={handleSubmit} className="feedback-form-container">
              <h3 className="feedback-form-header">
                Tell us about your experience
              </h3>
              <div className="form-boxes">
                <div className="form-box box-1">
                  <ul className="legend">
                    <li>
                      {<span className="icon-text fullstar">&#9733;</span>}=
                      Needs Improvement
                    </li>
                    <li>
                      {<span className="icon-text fullstar">&#9733;</span>}
                      {<span className="icon-text fullstar">&#9733;</span>}=
                      Fair Service
                    </li>
                    <li>
                      {<span className="icon-text fullstar">&#9733;</span>}
                      {<span className="icon-text fullstar">&#9733;</span>}
                      {<span className="icon-text fullstar">&#9733;</span>}=
                      Great Service
                    </li>
                    <li />
                  </ul>
                </div>
                <div className="form-box box-2">
                  <p>Who was your Contractor?</p>
                  <div>
                    <select
                      className="select"
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
                    <p>Overall Rating</p>
                    <Rating
                      emptySymbol={<span className="icon-text">&#9734;</span>}
                      fullSymbol={
                        <span className="icon-text fullstar">&#9733;</span>
                      }
                      stop={3}
                      initialRating={stars}
                      onChange={e => setStars(e)}
                    />
                  </div>
                </div>
              </div>
              <textarea
                className="form-textarea"
                placeholder="Leave a comment"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />

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
          </div>
        </div>

        <div>
          <h4 className="feedback-user-header">Your Feedback History</h4>
          <div>
            {props.loading ? <p>Loading...</p> : null}
            {props.error ? <p>{props.error}</p> : null}
            {props.feedback.map(feedback => (
<<<<<<< HEAD
              <div>
                <h2>{feedback.contractorName}</h2>
                <Rating
                  emptySymbol={<span className="icon-text">&#9734;</span>}
                  fullSymbol={<span className="icon-text">&#9733;</span>}
                  readonly
                  placeholderRating={feedback.stars}
                  stop={3}
                />
                <p>{feedback.message}</p>
                <button onClick={e => deleteFeedback(feedback)}>
                  Delete Feedback
                </button>
=======
              <div key={feedback.id} className="user-feedback-container">
                <p>Contractor: {feedback.contractorName}</p>
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
                  <div className="posted-user">
                    <div>
                      <button
                        className="btn delete-btn"
                        onClick={e => deleteFeedback(feedback)}
                      >
                        Delete Feedback
                      </button>
                    </div>
                    <div>
                      Posted:{' '}
                      {dateFns.format(feedback.createdAt, 'MMM DD YYYY')}
                    </div>
                  </div>
                </div>
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
