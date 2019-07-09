import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import NavBarUser from '../navbar/NavBarUser';
import './UserFeedback.css';
import { getFeedback, postFeedback, deleteFeedback } from '../../actions/index';

import TopNavbar from '../navbar/TopNavbar';
import dateFns from 'date-fns';
import Pagination from './Pagination';

function UserFeedback(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const { id } = props.user;
  const currentStar = 0;
  const [stars, setStars] = useState(currentStar);
  const [message, setMessage] = useState([]);
  const [contractorId, setContractorId] = useState('');

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

  useEffect(() => {
    props.getFeedback(); // props.getFeedback();
  }, []);

  // Get current post feebacks
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <TopNavbar />
      <NavBarUser />
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
                          key={contractor.id}
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

              <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
          </div>
        </div>

        <div>
          <h4 className="feedback-user-header">Your Feedback History</h4>
          <div>
            {props.loading ? <p>Loading...</p> : null}
            {props.error ? <p>{props.error}</p> : null}
            {props.feedback.map((feedback, id) => (
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
                        onClick={() => deleteFeedback(feedback)}
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
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={paginate}
            />
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
