import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import NavBarContractor from '../navbar/NavBarContractor';
import './ContractorFeedback.css';
import TopNavbar from '../navbar/TopNavbar';
import dateFns from 'date-fns';
import { getFeedback } from '../../actions/index';
import Pagination from './Pagination';

function ContractorFeedback(props) {
  // console.log(props);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [totalPosts, settotalPosts] = useState('');
  const [postStarAvg, setPostStarAvg] = useState('');

  console.log(props.feedback);
  console.log(props.feedback.length);
  console.log(props.feedback.stars);

  useEffect(() => {
    props.getFeedback();
  }, []);

  useEffect(() => {
    settotalPosts(props.feedback.length);
  });

  useEffect(() => {
    // const totalStars = totalPosts * 5;
    const starsArray = props.feedback.map(item => item.stars);
    const starsAvg = starsArray.map(item => item / 5);
    const starsAvgTotal = starsAvg.reduce((a, b) => a + b, 0);
    const newStarsAvg = (starsAvgTotal / props.feedback.length) * 5;
    // console.log(starsAvg);
    // console.log(totalStars);
    // console.log(starsAvgTotal);
    // console.log(newStarsAvg);
    setPostStarAvg(newStarsAvg);
  });

  // console.log(totalPosts);
  // console.log(postStarAvg);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.feedback.slice(indexOfFirstPost, indexOfLastPost);

  // Chage page
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <TopNavbar />
      <NavBarContractor />
      <div className="main-body">
        <h2 className="main-header-feedback">My Feedback</h2>
        <div className="average-rating">
          <h3>
            Average Rating:
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text fullstar">&#9733;</span>}
              readonly
              initialRating={postStarAvg}
              stop={5}
            />
          </h3>
        </div>
        <div className="feedback-pages">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={props.feedback.length}
            paginate={paginate}
            currentPosts={currentPosts}
          />
          {currentPosts.map(feedback => (
            <div key={feedback.id} className="feedback-container">
              <p className="feedback-contractor-name">
                <span className="bold">Client: </span>
                {feedback.username}
              </p>

              {'\n'}
              <div>
                <span className="bold">Rating:</span>{' '}
                <Rating
                  emptySymbol={<span className="icon-text">&#9734;</span>}
                  fullSymbol={
                    <span className="icon-text fullstar">&#9733;</span>
                  }
                  readonly
                  initialRating={feedback.stars}
                  stop={5}
                />
                {'\n'}
                <div className="feedback-context">
                  <p>
                    <span className="quotes">"</span>
                    {feedback.message}
                    <span className="quotes">"</span>
                  </p>
                </div>
                <div className="posted">
                  <span className="bold">Posted: </span>{' '}
                  {dateFns.format(feedback.createdAt, 'MMM DD YYYY')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    feedback: state.feedback,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  { getFeedback }
)(ContractorFeedback);
