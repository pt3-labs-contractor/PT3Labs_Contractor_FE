import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainNavbar from '../navbar/MainNavbar';
import { startManualLoad, endManualLoad, setError } from '../../actions';

import './Register.css';

function Register(props) {
  const [contractor, setContractor] = useState(false);
  const [values, setValues] = useState({});
  const { oauth } = props;

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const bearer = `Bearer ${localStorage.getItem('jwt')}`;
    const headers = { authorization: bearer };

    if (!oauth) {
      props.startManualLoad();
      axios
        .post(
          'https://fierce-plains-47590.herokuapp.com/api/auth/register',
          values,
          { headers }
        )
        .then(res => {
          localStorage.setItem('jwt', res.data.token);
          props.endManualLoad();
          if (contractor) {
            props.history.push('/contractorCalendar');
          } else {
            props.history.push('/app');
          }
        })
        .catch(err => {
          props.endManualLoad();
          props.setError(err.response.data.error);
        });
    } else {
      const userUpdate = {};
      userUpdate.username = values.username;
      userUpdate.email = values.email;
      userUpdate.phoneNumber = values.phoneNumber;

      const { email, ...contractorUpdate } = values;

      if (contractor) {
        axios
          .post(
            'https://fierce-plains-47590.herokuapp.com/api/contractors',
            contractorUpdate,
            { headers }
          )
          .then(res => {
            userUpdate.contractorId = res.data.id;
            console.log(userUpdate);
            axios.put(
              'https://fierce-plains-47590.herokuapp.com/api/users',
              userUpdate,
              { headers }
            );
          })
          .then(() => {
            props.history.push('/contractorCalendar');
          });

        // axios
        //   .all([
        //     axios.post(
        //       'https://fierce-plains-47590.herokuapp.com/api/contractors',
        //       contractorUpdate,
        //       { headers }
        //     ),
        //     axios.put(
        //       'https://fierce-plains-47590.herokuapp.com/api/users',
        //       userUpdate,
        //       { headers }
        //     ),
        //   ])
        //   .then(res => {
        //     console.log('Register after oauth', res);
        //     props.history.push('/contractorCalendar');
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      } else {
        axios
          .put(
            'https://fierce-plains-47590.herokuapp.com/api/users',
            userUpdate,
            { headers }
          )
          .then(res => {
            props.history.push('/');
          })
          .catch(err => {
            console.log(err.response.data.message);
          });
      }
    }
  }

  return (
    <>
      <MainNavbar />
      <div className="form-container">
        <h1 className="text-primary">Register</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create your account:
        </p>
        <button
          type="button"
          className={`btn btn-register ${contractor && 'selected'}`}
          onClick={() => setContractor(true)}
        >
          Contractor
        </button>
        <button
          type="button"
          className={`btn btn-register ${!contractor && 'selected'}`}
          onClick={() => setContractor(false)}
        >
          User{' '}
        </button>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          {!oauth && (
            <>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            onChange={handleChange}
            required
          />
          <input
            name="phoneNumber"
            type="number"
            placeholder="Phone#"
            onChange={handleChange}
            required
          />
          {contractor && (
            <>
              <input
                name="contractorName"
                placeholder="Company or Contractor Name"
                onChange={handleChange}
                required
              />
              <input
                name="streetAddress"
                placeholder="Street Address"
                onChange={handleChange}
                required
              />
              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                required
              />
              <input
                name="stateAbbr"
                placeholder="State"
                onChange={handleChange}
                required
              />
              <input
                name="zipCode"
                placeholder="Zip Code"
                onChange={handleChange}
                required
              />
            </>
          )}
          <button
            type="submit"
            // value="Create Account"
            className="btn btn-primary"
          >
            Create Account
          </button>

          {/* <button
            type="submit"
            value="Create Account"
            className="btn btn-primary"
            onClick={handleSubmit}

          /> */}

          <p>
            Already have an account?{' '}
            <NavLink to="/login" className="form-links">
              Sign In
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
}

Register.propTypes = {
  oauth: PropTypes.bool,
};
export default connect(
  null,
  { startManualLoad, endManualLoad, setError }
)(Register);
