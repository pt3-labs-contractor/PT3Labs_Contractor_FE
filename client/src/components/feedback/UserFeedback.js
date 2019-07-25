import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import NavBarUser from '../navbar/NavBarUser';
import './UserFeedback.css';
import { getFeedback, postFeedback, deleteFeedback } from '../../actions/index';

import TopNavbar from '../navbar/TopNavbar';
import dateFns from 'date-fns';
import Pagination from './Pagination';
import DeleteModal from './DeleteModal';

function UserFeedback(props) {
  const { id } = props.user;
  const currentStar = 0;
  const [stars, setStars] = useState(currentStar);
  const [message, setMessage] = useState([]);
  const [contractorId, setContractorId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [toggle, setToggle] = useState(false);

  const stringify = JSON.stringify(props.feedback);
  useEffect(() => {
    props.getFeedback();
  }, [stringify]);

  useEffect(() => {
    setClicked(!clicked);
  }, []);

  function deleteFeedback(feedback) {
    props.deleteFeedback(feedback.id);
  }
  function handleChange(contrID) {
    setContractorId(contrID);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.postFeedback({
      contractorId,
      id,
      stars,
      message,
    });
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts;
  let feedback = [];
  if (props.feedback) {
    currentPosts = props.feedback.slice(indexOfFirstPost, indexOfLastPost);
    feedback = props.feedback;
  }

  // Change page
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const myToggle = () => {
    setToggle(!toggle);
  };

  function mySort() {
    const newOne = createdArray.sort((a, b) => {
      return b - a;
    });
    console.log(newOne);
  }

  const createdArray = feedback.map(user => user.contractorName);

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
                      Poor
                    </li>
                    <li>
                      {<span className="icon-text fullstar">&#9733;</span>}
                      {<span className="icon-text fullstar">&#9733;</span>}=
                      Fair
                    </li>
                    <li>
                      {<span className="icon-text fullstar">&#9733;</span>}
                      {<span className="icon-text fullstar">&#9733;</span>}
                      {<span className="icon-text fullstar">&#9733;</span>}=
                      Good
                    </li>
                    <li>
                      {<span className="icon-text fullstar">&#9733;</span>}
                      {<span className="icon-text fullstar">&#9733;</span>}
                      {<span className="icon-text fullstar">&#9733;</span>}
                      {<span className="icon-text fullstar">&#9733;</span>}=
                      Very Good
                    </li>
                    <li>
                      {<span className="icon-text fullstar">&#9733;</span>}
                      {<span className="icon-text fullstar">&#9733;</span>}
                      {<span className="icon-text fullstar">&#9733;</span>}
                      {<span className="icon-text fullstar">&#9733;</span>}
                      {<span className="icon-text fullstar">&#9733;</span>}=
                      Excellent
                    </li>
                    <li />
                  </ul>
                </div>
                <div className="form-box box-2">
                  <h6 className="feedback-h6">Who was your Contractor?</h6>
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
                    <h6 className="feedback-h6">Overall Rating</h6>
                    <Rating
                      emptySymbol={<span className="icon-text">&#9734;</span>}
                      fullSymbol={
                        <span className="icon-text fullstar">&#9733;</span>
                      }
                      stop={5}
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
                required
              />

              <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
          </div>
        </div>

        <button onClick={mySort}>click</button>

        {clicked ? <DeleteModal toggle={toggle} myToggle={myToggle} /> : null}

        <div className="feeback-form-container">
          <h4 className="feedback-user-header">Your Feedback History</h4>

          <div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={feedback.length}
              paginate={paginate}
              currentPosts={currentPosts}
              createdAt={currentPosts ? currentPosts.createdAt : null}
            />

            {props.error ? (
              <p>{props.error}</p>
            ) : currentPosts ? (
              currentPosts.map(feedback => {
                return (
                  <div key={feedback.id} className="user-feedback-container">
                    <p>
                      <span className="bold">Contractor:</span>{' '}
                      {feedback.contractorName}
                    </p>
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
                      <div className="posted-user">
                        <div>
                          <span className="bold">Posted: </span>{' '}
                          {dateFns.format(feedback.createdAt, 'MMM DD YYYY')}
                        </div>
                        <div>
                          <i
                            className="fas fa-trash userTrash"
                            onClick={() => {
                              localStorage.setItem('id', feedback.id);
                              myToggle();
                            }}
                          >
                            <span className="helper-tool">Delete Feedback</span>
                          </i>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : props.loading ? (
              <p>...Loading</p>
            ) : null}
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
    services: state.services,
  };
};

export default connect(
  mapStateToProps,
  { getFeedback, postFeedback, deleteFeedback }
)(UserFeedback);
