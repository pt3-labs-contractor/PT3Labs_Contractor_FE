import React from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
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
            <div className="button">
              <NavLink to="/signup" className="btn btn-primary">
                Sign Up
              </NavLink>
              <NavLink to="/login" className="btn btn-light">
                Log In
              </NavLink>
            </div>
            <div className="arrow">
              <i className="far fa-arrow-alt-circle-down arrow-pulse" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
