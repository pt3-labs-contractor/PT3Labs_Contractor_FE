import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import MainNavbar from '../navbar/MainNavbar';

import './Login.css';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const bearer = `Bearer ${localStorage.getItem('jwt')}`;
    const headers = { authorization: bearer };
    const credentials = { username, password };

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
        props.history.push('/contractors');
      })
      .catch(err => {
        console.log(err);
      });
  }
  // state = {
  //   username: ''
  // }

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
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <input type="submit" value="Sign In" className="btn btn-primary" />
        </form>
        <p>
          Don't have an account?
          <NavLink to="/register" className="form-links">
            Sign Up
          </NavLink>
        </p>
      </div>
    </>
  );
}

export default Login;
