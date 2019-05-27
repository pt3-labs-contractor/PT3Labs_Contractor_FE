import React from 'react';
import { NavLink } from 'react-router-dom';

import Team from '../team/Team';
import Content from '../content/Content';
import './Homepage.css';

export default function Homepage() {
  return (
    <div>
      <section className="homepage-section">
        <div className="homepage-image-wrapper">
          <img
            src="images/woman-contractor-1.png"
            alt="homepage-img"
            className="homepage-image"
          />
        </div>
        <div className="call-to-action">
          <h1 className="homepage-title">Easy, Stress-Free Scheduling</h1>
          <p className="homepage-paragraph">
            Find and schedule the perfect contractor that fits your time as easy
            as one click.
          </p>
          <NavLink to="/register">
            <button className="main-button">Join Now</button>
          </NavLink>
        </div>
      </section>
      <div className="homepage-square-1" />
      <div className="homepage-square-2" />
      <div className="homepage-square-3" />

      <Content />
      <Team />
    </div>
  );
}
