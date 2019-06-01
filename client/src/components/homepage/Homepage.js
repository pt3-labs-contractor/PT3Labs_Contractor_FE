import React from 'react';

import Team from '../team/Team';
import Content from '../content/Content';
import './Homepage.css';
import LandingPage from '../landingpage/LandingPage';

export default function Homepage() {
  return (
    <div>
      <LandingPage />
      <Content />
      <Team />
    </div>
  );
}
