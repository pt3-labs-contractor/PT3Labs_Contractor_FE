import React from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import NavBarUser from '../navbar/NavBarUser';
import './UserFeedback.css';

function UserFeedback(props) {
  return (
    <>
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
        <form className="feedback-container">
          <h2>Feedback Form</h2>
          <div>
            <h4>Overall Rating</h4>
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
            />
          </div>
          <div>
            <h4>Consultation?</h4>
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
            />
          </div>
          <div>
            <h4>Punctual?</h4>
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
            />
          </div>
          <div>
            <h4>Customer Service?</h4>
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
            />
          </div>
          <textarea className="form-textarea" placeholder="Leave a comment" />
          <input type="submit" value="Submit" className="btn btn-primary" />
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

export default connect(mapStateToProps)(UserFeedback);
