import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleSubscribe, retrieveSubscription } from '../../actions';
import NavBarContractor from '../navbar/NavBarContractor';
import './Plans.css';
import TopNavbar from '../navbar/TopNavbar';
import { isObject } from 'util';

function Plans({ user, subscription, ...props }) {
  useEffect(() => {
    if (user.subscriptionId) props.retrieveSubscription();
  }, [user]);
  const endDate = subscription
    ? new Date(subscription.current_period_end * 1000)
    : null;
  return (
    <>
      <TopNavbar />
      <NavBarContractor />
      <div className="main-body">
        {subscription ? (
          <div className="wrapper">
            <div className="single-price">
              <h2 className="plan-attribute">Current Month Ends</h2>
              <div className="plan-wrapper">
                <p>{endDate.toUTCString()}</p>
              </div>
              <div>
                <h2 className="plan-attribute">Current Payment Method</h2>
                <div className="plan-wrapper">
                  <h3 className="plan-attribute">Type: </h3>{' '}
                  {subscription.paymentMethod.card.brand}
                  <h3 className="plan-attribute">Last 4 Digits: </h3>
                  {subscription.paymentMethod.card.last4}
                  <h3 className="plan-attribute">Expiration Date: </h3>
                  {subscription.paymentMethod.card.exp_month}/
                  {subscription.paymentMethod.card.exp_year}
                </div>
              </div>
            </div>
          </div>
        ) : (
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
        )}
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
  subscription: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleSubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.user,
    subscription: state.subscription,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  { handleSubscribe, retrieveSubscription }
)(Plans);
