import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './LandingPage.css';

function LandingPage({ user }) {
  return (
    <div className="container">
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1>Digital Calendar</h1>
            <p>
              Scheduling a contractor can be a pain. With Digital Calendar, we
              aim to eliminate the stress of finding and booking a contractor.
            </p>
            {user.username ? (
              <div className="button">
                <NavLink
                  to={user.contractorId ? '/contractorcalendar' : '/app'}
                  className="btn btn-primary"
                >
                  Enter
                </NavLink>
              </div>
            ) : (
              <div className="button">
                <NavLink to="/register" className="btn btn-primary landing-btn">
                  Sign Up
                </NavLink>
                <NavLink to="/login" className="btn btn-light landing-btn">
                  Log In
                </NavLink>
              </div>
            )}
            <div className="arrow">
              <i className="far fa-arrow-alt-circle-down arrow-bounce" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

LandingPage.defaultProps = {
  user: {},
};

LandingPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  {}
)(LandingPage);
