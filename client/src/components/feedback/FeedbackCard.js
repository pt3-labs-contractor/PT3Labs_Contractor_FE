import React from 'react';
import Rating from 'react-rating';
import PropTypes from 'prop-types';

function FeedbackCard({ feedback }) {
  const { username, message, stars } = feedback;
  return (
    <>
      <h3>{username}</h3>
      <p>{message}</p>
      <Rating
        className=""
        fullSymbol={<span className="">&#9733;</span>}
        emptySymbol={<span className="">&#9734;</span>}
        initialRating={stars}
        fractions={4}
        stop={5}
        readonly
      />
    </>
  );
}

export default FeedbackCard;

FeedbackCard.propTypes = {
  feedback: PropTypes.shape({
    id: PropTypes.string,
    contractorName: PropTypes.string,
    username: PropTypes.string,
    message: PropTypes.string,
    contractorId: PropTypes.string,
    userId: PropTypes.string,
    stars: PropTypes.number,
    createdAt: PropTypes.string,
  }),
};
