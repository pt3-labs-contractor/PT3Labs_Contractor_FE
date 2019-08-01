import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FeedbackCard from './FeedbackCard';

function FeedbackList({ feedback, tempFeedback, temp }) {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    if (temp) {
      setFeedbackList(tempFeedback);
    } else {
      setFeedbackList(feedback);
    }
  }, [feedback, tempFeedback]);

  return (
    <div className="feedback-list">
      {feedbackList.length > 0 && (
        <>
          <h2>User Feedback:</h2> <hr />
        </>
      )}
      {feedbackList.map(item => (
        <div className="feedback-card" key={item.id}>
          <FeedbackCard feedback={item} />
          <br />
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    feedback: state.feedback,
    tempFeedback: state.tempFeedback,
  };
};

FeedbackList.defaultProps = {
  feedback: null,
  tempFeedback: null,
  temp: null,
};

export default connect(mapStateToProps)(FeedbackList);

FeedbackList.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      contractorName: PropTypes.string,
      username: PropTypes.string,
      message: PropTypes.string,
      contractorId: PropTypes.string,
      userId: PropTypes.string,
      stars: PropTypes.number,
      createdAt: PropTypes.string,
    })
  ),
  tempFeedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      contractorName: PropTypes.string,
      username: PropTypes.string,
      message: PropTypes.string,
      contractorId: PropTypes.string,
      userId: PropTypes.string,
      stars: PropTypes.number,
      createdAt: PropTypes.string,
    })
  ),
  temp: PropTypes.bool,
};
