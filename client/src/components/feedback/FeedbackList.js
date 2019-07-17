import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FeedbackCard from './FeedbackCard';

function FeedbackList({ feedback }) {
  return (
    <div className="feedback-list">
      {feedback.length > 0 && (
        <>
          <h2>User Feedback:</h2> <hr />
        </>
      )}
      {feedback.map(item => (
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
  };
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
};
