import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleSubscribe } from '../../actions';
import NavBarContractor from '../navbar/NavBarContractor';
import './Plans.css';
import TopNavbar from '../navbar/TopNavbar';

function Plans({ user, ...props }) {
  return (
    <>
      <TopNavbar />
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
            {user.subscriptionId ? null : (
              <StripeCheckout
                token={props.handleSubscribe}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST}
                currency="USD"
                billingAddress
                zipCode
                amount={1000}
                name="Contractor Scheduler"
                description="Expanded scheduling of clients."
                label="Select"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Plans.defaultProps = {
  user: {},
  error: null,
};

Plans.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleSubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  { handleSubscribe }
)(Plans);
