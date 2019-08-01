import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainNavbar from '../navbar/MainNavbar';
import {
  fetchAccts,
  getFeedback,
  startManualLoad,
  endManualLoad,
} from '../../actions/index';

import './Login.css';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (props.user.contractorId) {
      props.history.push('/contractorcalendar');
    } else if (props.user.username) {
      props.history.push('/app');
    }
  }, [props.user]);

  function handleSubmit(e) {
    e.preventDefault();
    const bearer = `Bearer ${localStorage.getItem('jwt')}`;
    const headers = { authorization: bearer };
    const credentials = { username, password };
    props.startManualLoad();
    axios
      .post(
        'https://fierce-plains-47590.herokuapp.com/api/auth/login',
        credentials,
        {
          headers,
        }
      )
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        props.fetchAccts();
        props.getFeedback();
      })
      .catch(err => {
        props.endManualLoad();
        switch (err.response.status) {
          case 400:
          case 401:
            return setError('Invalid username or password');
          default:
            return setError('System failure.');
        }
      });
  }

  return (
    <>
      <MainNavbar />
      <div className="form-container">
        <h1 className="text-primary">Log In</h1>
        <p className="lead">
          <i className="fas fa-user" /> Sign in with:
        </p>
        <div className="social-container google-oauth">
          <a href="https://fierce-plains-47590.herokuapp.com/api/auth/google">
            Google Oauth <i className="fab fa-google-plus-g" />
          </a>
        </div>
        <p>or use your own account</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            value={username}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
          />
          <input type="submit" value="Sign In" className="btn btn-primary" />
        </form>
        {error.length > 0 && <p style={{ color: 'red' }}>{error}</p>}
        <p>
          Don&apos;t have an account?
          <NavLink to="/register" className="form-links">
            Sign Up
          </NavLink>
        </p>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

Login.defaultProps = {
  user: null,
  fetchAccts: null,
  getFeedback: null,
  startManualLoad: null,
};

export default connect(
  mapStateToProps,
  { fetchAccts, getFeedback, startManualLoad, endManualLoad }
)(Login);

Login.defaultProps = {
  user: {},
};

Login.propTypes = {
  user: PropTypes.object,
  fetchAccts: PropTypes.func.isRequired,
  getFeedback: PropTypes.func.isRequired,
  startManualLoad: PropTypes.func.isRequired,
  endManualLoad: PropTypes.func.isRequired,
};
