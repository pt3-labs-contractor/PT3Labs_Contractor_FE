import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import './Register.css';

function Register(props) {
  const [contractor, setContractor] = useState(false);
  const [values, setValues] = useState({});
  const { oauth } = props;

  function handleChange(event) {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const bearer = `Bearer ${localStorage.getItem('jwt')}`;
    const headers = { authorization: bearer };
    // var { email, phoneNumber } = values;

    if (!oauth) {
      axios
        .post(
          'https://fierce-plains-47590.herokuapp.com/api/auth/register',
          values,
          { headers }
        )
        .then(res => {
          localStorage.setItem('jwt', res.data.token);
          props.history.push('/');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const userUpdate = {};
      userUpdate.email = values.email;
      userUpdate.phoneNumber = values.phoneNumber;

      const { email, ...contractorUpdate } = values;

      if (contractor) {
        axios
          .all([
            axios.post(
              'https://fierce-plains-47590.herokuapp.com/api/contractors',
              contractorUpdate,
              { headers }
            ),
            axios.put(
              'https://fierce-plains-47590.herokuapp.com/api/users',
              userUpdate,
              { headers }
            ),
          ])
          .then(res => {
            props.history.push('/');
          })
          .catch(err => {
            console.log(err);
          });
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
    <div className="form-container">
      <h1 className="text-primary">Register</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create your account:
      </p>
      <button className="btn btn-light" onClick={() => setContractor(true)}>
        Contractor
      </button>
      <button className="btn btn-light" onClick={() => setContractor(false)}>
        User{' '}
      </button>
      <form onSubmit={handleSubmit}>
        {!oauth && (
          <>
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </>
        )}
        <input name="email" placeholder="E-mail" onChange={handleChange} />
        <input
          name="phoneNumber"
          placeholder="Phone#"
          onChange={handleChange}
        />
        {contractor && (
          <>
            <input
              name="contractorName"
              placeholder="Name"
              onChange={handleChange}
            />
            <input
              name="streetAddress"
              placeholder="Street Address"
              onChange={handleChange}
            />
            <input name="city" placeholder="City" onChange={handleChange} />
            <input
              name="stateAbbr"
              placeholder="State"
              onChange={handleChange}
            />
            <input
              name="zipCode"
              placeholder="Zip Code"
              onChange={handleChange}
            />
            <input type="submit" value="Log In" className="btn btn-primary" />
          </>
        )}
        <p>
          Already have an account?{' '}
          <NavLink to="/login" className="form-links">
            Sign In
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Register;
