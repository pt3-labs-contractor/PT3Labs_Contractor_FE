import React, { useState } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import NavBarUser from '../navbar/NavBarUser';
import './UserFeedback.css';
import { getFeedback } from '../../actions/index';


function UserFeedback(props) {
  const [overall, setOverall] = useState('')
  const [consultation, setConsultation] = useState('')
  const [punctual, setPunctual] = useState('')
  const [customerService, setCustormerService] = useState('')


  // const { id } = props.match.params;
  // useEffect(() => {
  //     props.getUserWrittenFeedback(id)
  // })

  function handleSubmit(e) {
    e.preventDefault();
    // useEffect(() => {
    //   props.postFeedback(event)
    // })
    console.log("I'm handling submitting")
  }

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

        <h2>Appointment Info</h2>

        <form onSubmit={handleSubmit}>
          <h4>Feedback Form</h4>
          <h4>Which Contractor?</h4>
          <div>
            <select>
              {props.contractor.map(contractor => (
                <option value={contractor.id}>{contractor.name}</option>
                ))}
            </select>
          </div>

          <div>
            <h4>Overall Rating</h4>
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
            />
            <input
              placeholder="Details" 
              type="text"
              name="overallFeedback"
              value={overall}
              onChange={e => setOverall(e.target.value)}
            />
          </div>

          <div>
            <h4>Consultation?</h4>
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
            />
            <input 
              placeholder="Details" 
              type="text"
              name="consulation"
              value={consultation}
              onChange={e => setConsultation(e.target.value)}
            />
          </div>

          <div>
            <h4>Punctual?</h4>
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
            />
            <input 
              placeholder="punctual" 
              type="text"
              name="punctual"
              value={punctual}
              onChange={e => setPunctual(e.target.value)}
            />
          </div>

          <div>
            <h4>Customer Service?</h4>
            <Rating
              emptySymbol={<span className="icon-text">&#9734;</span>}
              fullSymbol={<span className="icon-text">&#9733;</span>}
              stop={3}
            />
            <input 
              placeholder="Details" 
              type="text"
              name="CS"
              value={customerService}
              onChange={e => setCustormerService(e.target.value)}  
            />
          </div>
          <textarea className="form-textarea" placeholder="Leave a comment" />
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
        <div>
          <h4>The Feedbacks You've given</h4>

          {/* <div>
            {props.loading ? <p>Loading...</p> : null}
            {props.error ? <p>{props.error}</p> : null}
            {props.feedback.map(feedback => (
              <div>
                <h2>{feedback.contractorName}</h2>
                <p>{feedback.stars}</p>
                <p>{feedback.message}</p>
              </div>
            ))}
          </div> */}

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
    contractor: state.contractors
  };
};

export default connect(mapStateToProps, {getFeedback})(UserFeedback);
