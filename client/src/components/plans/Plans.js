import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import {
  handleSubscribe,
  retrieveSubscription,
  cancelDefault,
  cancelImmediate,
  changePaymentMethod,
} from '../../actions';
import NavBarContractor from '../navbar/NavBarContractor';
import './Plans.css';
import TopNavbar from '../navbar/TopNavbar';
import { Link } from 'react-router-dom';

function Plans({ user, subscription, ...props }) {
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
  let content = (
    <div className="wrapper">
      <div className="free-plan single-price">
        <h3>Basic</h3>
        <div className="price">
          <h4>Free</h4>
        </div>
        <div className="deals">
          <p>
            <i className="fas fa-check checked" />4 appoinments per month
          </p>
          <p>
            <i className="fas fa-check checked" />5 hour appoinment window
          </p>
          <p>
            <i className="fas fa-check checked" />
            24 hr helpdesk
          </p>
          <p>
            <i className="fas fa-check checked" />
            Access to feedback
          </p>
          <Link className="basic-btn" to="contractorcalendar">
            Start
          </Link>
        </div>
      </div>

      <div className="premium-plan single-price">
        <h3>Premium</h3>
        <div className="price">
          <h4>$20/month</h4>
        </div>
        <div className="deals">
          <p>
            <i className="fas fa-check checked" />
            Unlimted number of appoinments!
          </p>
          <p>
            <i className="fas fa-check checked" />
            24 hr appointment window!
          </p>
          <p>
            <i className="fas fa-check checked" />
            24 hr helpdesk
          </p>
          <p>
            <i className="fas fa-check checked" />
            Access to feedback
          </p>
          <StripeCheckout
            style={{
              overflow: '',
              display: 'inline-block',
              background: '',
              border: 'none',
              padding: '0.5rem 1rem',
              textDecoration: '',
              borderRadius: '5%',
              boxShadow: 'none',
              cursor: 'pointer',
              visibility: '',
              userSelect: '',
            }}
            textStyle={{
              backgroundImage: '',
              fontFamily: '',
              fontSize: '1.2rem',
              position: '',
              padding: '',
              display: '',
              height: '',
              lineHeight: '',
              color: '',
              fontWeight: 'bold',
              boxShadow: 'none',
              textShadow: '',
              borderRadius: '',
            }}
            token={props.handleSubscribe}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST}
            currency="USD"
            billingAddress
            zipCode
            amount={1000}
            name="Contractor Scheduler"
            description="Expanded scheduling of clients."
            label="SELECT"
          />
        </div>
      </div>
    </div>
  );
  if (subscription)
    content = (
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
            <StripeCheckout
              style={{
                overflow: '',
                display: 'inline-block',
                background: '',
                border: 'none',
                padding: '0.5rem 1rem',
                textDecoration: '',
                borderRadius: '5%',
                boxShadow: 'none',
                cursor: 'pointer',
                visibility: '',
                userSelect: '',
              }}
              textStyle={{
                backgroundImage: '',
                fontFamily: '',
                fontSize: '1.2rem',
                position: '',
                padding: '',
                display: '',
                height: '',
                lineHeight: '',
                color: '',
                fontWeight: 'bold',
                boxShadow: 'none',
                textShadow: '',
                borderRadius: '',
              }}
              token={props.changePaymentMethod}
              stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST}
              currency="USD"
              billingAddress
              zipCode
              name="Contractor Scheduler"
              description="Expanded scheduling of clients."
              label="UPDATE"
            />
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
    );
  return (
    <>
      <TopNavbar />
      <NavBarContractor />
      <div className="main-body plans-body">{content}</div>
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
  {
    handleSubscribe,
    retrieveSubscription,
    cancelDefault,
    cancelImmediate,
    changePaymentMethod,
  }
)(Plans);
