import React from 'react';
import { connect } from 'react-redux';

import FeedbackCard from './FeedbackCard';

function FeedbackList({ feedback }) {
  return (
    <div className="feedback-list">
      {feedback.length > 0 && <h2>User Feedback:</h2>}
      {feedback.map(item => (
        <div key={item.id}>
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
