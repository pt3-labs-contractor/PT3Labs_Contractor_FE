import React, { useState } from 'react';
import axios from 'axios';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const bearer = 'Bearer ' + localStorage.getItem('jwt');
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
        props.history.push('/contractors');
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
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
        <button type="submit">Submit</button>
      </form>
      <a href="https://fierce-plains-47590.herokuapp.com/api/auth/google">
        Google Oauth
      </a>
    </>
  );
}

export default Login;
