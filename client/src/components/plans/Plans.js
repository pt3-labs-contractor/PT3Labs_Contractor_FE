import React from 'react';
import { Link } from 'react-router-dom';
import NavBarContractor from '../navbar/NavBarContractor';
import './Plans.css';

export default function Plans() {
  return (
    <>
      <NavBarContractor />
      <div className="main-body">
        <h1>Plans Page</h1>
        <div className="wrapper">
          <div className="single-price">
            <h2>Basic</h2>
            <div className="price">
              <h2>Free</h2>
            </div>
            <div className="deals">
              <h4>Up to 5 hrs</h4>
              <h4>Up to 5 hrs</h4>
              <h4>Up to 5 hrs</h4>
              <h4>Up to 5 hrs</h4>
              <h4>Up to 5 hrs</h4>
            </div>
            <Link>Select</Link>
          </div>

          <div className="single-price">
            <h2>Premium</h2>
            <div className="price">
              <h2>$19.99</h2>
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
