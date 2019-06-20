import React from 'react';
import { Link } from 'react-router-dom';
import NavBarContractor from '../navbar/NavBarContractor';
import './Plans.css';
import TopNavbar from '../navbar/TopNavbar';

export default function Plans() {
  return (
    <>
      <TopNavbar />
      <NavBarContractor />
      <div className="main-body">
        <div className="main-header">
          <h2 className="main-header-title">Pricing</h2>
          <p>
            Please choose a plan that best fits your need. Here at Digital
            Calendar we are always looking to provide the best value to our
            customers.
          </p>
        </div>
        <div className="wrapper">
          <div className="single-price">
            <h2>Basic</h2>
            <div className="price">
              <h3>Free</h3>
            </div>
            <div className="deals">
              <h4>Up to 5 hrs</h4>
              <h4>Up to 5 hrs</h4>
              <h4>Up to 5 hrs</h4>
              <h4>Up to 5 hrs</h4>
              <h4>Up to 5 hrs</h4>
            </div>
            <Link>Free</Link>
          </div>

          <div className="single-price">
            <h2>Premium</h2>
            <div className="price">
              <h3>$19.99</h3>
            </div>
            <div className="deals">
              <h4>Unlimted Everything!</h4>
              <h4>Unlimted Everything!</h4>
              <h4>Unlimted Everything!</h4>
              <h4>Unlimted Everything!</h4>
              <h4>Unlimted Everything!</h4>
            </div>
            <Link className="plan-link">Select</Link>
          </div>
        </div>
      </div>
    </>
  );
}
