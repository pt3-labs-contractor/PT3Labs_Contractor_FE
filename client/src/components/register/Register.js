import React, { useState } from 'react';
import axios from 'axios';

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
    const bearer = 'Bearer ' + localStorage.getItem('jwt');
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
    <div>
      <button onClick={() => setContractor(true)}>Contractor</button>
      <button onClick={() => setContractor(false)}>User </button>
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
          </>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
