import React from 'react';
import Rating from 'react-rating';

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
        stop={3}
        readonly
      />
    </>
  );
}

export default FeedbackCard;
