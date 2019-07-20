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
  const [postsPerPage, setPostsPerPage] = useState(3);

  useEffect(() => {
    props.getFeedback();
  }, []);

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
        <h2 className="main-header-feedback">Reviews</h2>
        <div className="feedback-pages">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={props.feedback.length}
            paginate={paginate}
            currentPosts={currentPosts}
          />
          {currentPosts.map(feedback => (
            <div key={feedback.id} className="feedback-container">
              Client: {feedback.username}
              {'\n'}
              <div>
                Rating:{' '}
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
                  Posted: {dateFns.format(feedback.createdAt, 'MMM DD YYYY')}
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
