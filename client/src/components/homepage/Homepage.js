import React from 'react';

import Team from '../team/Team';
import Content from '../content/Content';
import './Homepage.css';
import LandingPage from '../landingpage/LandingPage';
import MainNavbar from '../navbar/MainNavbar';

export default function Homepage() {
  return (
    <div>
      <MainNavbar />
      <LandingPage />
      <Content />
      <Team />
    </div>
  );
}
