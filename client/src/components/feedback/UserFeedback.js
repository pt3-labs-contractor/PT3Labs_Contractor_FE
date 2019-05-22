import React from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating'
function UserFeedback(props) {
  return (
    <div>
        <h2>User giving Feedback Page</h2>
        <div>
            <h2>Appointment Info</h2>
        </div>
        <form>
            <h4>Feedback Form</h4>
            <div>
                <h4>Overall Rating</h4>
                <Rating
                emptySymbol={<span className="icon-text">&#9734;</span>}
                fullSymbol={<span className="icon-text">&#9733;</span>}
                stop={3}
                />
                <input placeholder="Details"></input>
            </div>
            <div>
                <h4>Consultation?</h4>
                <Rating
                emptySymbol={<span className="icon-text">&#9734;</span>}
                fullSymbol={<span className="icon-text">&#9733;</span>}
                stop={3}
                />
                <input placeholder="Details"></input>
            </div>
            <div>
                <h4>Punctual?</h4>
                <Rating
                emptySymbol={<span className="icon-text">&#9734;</span>}
                fullSymbol={<span className="icon-text">&#9733;</span>}
                stop={3}
                />
                <input placeholder="Details"></input>
            </div>
            <div>
                <h4>Customer Service?</h4>
                <Rating
                emptySymbol={<span className="icon-text">&#9734;</span>}
                fullSymbol={<span className="icon-text">&#9733;</span>}
                stop={3}
                />
                <input placeholder="Details"></input>
            </div>
        </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    // contractors: state.accounts.contractors,
    loading: state.loading,
    error: state.error
  }
}

export default connect(mapStateToProps)(UserFeedback);
