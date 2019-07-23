import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import {
  handleSubscribe,
  retrieveSubscription,
  cancelDefault,
  cancelImmediate,
} from '../../actions';
import NavBarContractor from '../navbar/NavBarContractor';
import './Plans.css';
import TopNavbar from '../navbar/TopNavbar';

function Plans({ user, subscription, ...props }) {
  const [updateForm, setUpdateForm] = useState(false);
  const [cancelType, setCancelType] = useState('default');
  useEffect(() => {
    if (user.subscriptionId) props.retrieveSubscription();
  }, [user]);
  const handleCancellation = ev => {
    ev.preventDefault();
    if (cancelType === 'immediate') return props.cancelImmediate();
    return props.cancelDefault();
  };
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
            <div className="single-price active-sub">
              <h2 className="plan-attribute">Current Month Ends</h2>
              <div className="plan-wrapper">
                <p>{endDate.toUTCString()}</p>
              </div>
              <h2 className="plan-attribute">Current Payment Method</h2>
              <div className="plan-wrapper">
                <h3 className="plan-attribute">Type: </h3>{' '}
                {subscription.paymentMethod.card.brand}
                <h3 className="plan-attribute">Last 4 Digits: </h3>
                {subscription.paymentMethod.card.last4}
                <h3 className="plan-attribute">Expiration Date: </h3>
                {subscription.paymentMethod.card.exp_month}/
                {subscription.paymentMethod.card.exp_year}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setUpdateForm(true)}
                >
                  Update
                </button>
              </div>
              <h2 className="plan-attribute">Cancel Subscription</h2>
              {subscription.cancel_at_period_end ? (
                <div className="pending-cancel">
                  <h3>Subscription will cancel at end of current period.</h3>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={props.cancelImmediate}
                  >
                    Cancel Now
                  </button>
                </div>
              ) : (
                <form className="cancel-form" onSubmit={handleCancellation}>
                  <label htmlFor="default-sub">
                    Cancel at the end of subscription period, do not renew:
                    <input
                      defaultChecked
                      type="radio"
                      name="cancel"
                      value="default"
                      id="default-sub"
                      onChange={() => setCancelType('default')}
                    />
                  </label>
                  <label htmlFor="immediate-sub">
                    Cancel immediately:
                    <input
                      type="radio"
                      name="cancel"
                      value="immediate"
                      id="immediate-sub"
                      onChange={() => setCancelType('immediate')}
                    />
                  </label>
                  <button className="cancel-btn" type="submit">
                    Cancel
                  </button>
                </form>
              )}
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
  { handleSubscribe, retrieveSubscription, cancelDefault, cancelImmediate }
)(Plans);
