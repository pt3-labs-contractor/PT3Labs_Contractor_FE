import React, { useState } from 'react'
import axios from 'axios';
import { GoogleLogin } from 'react-google-login'

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    axios.post()
      .then(res => {
        props.history.push('/contractors');
      })
      .catch(err => {
        console.log(err)
      })
  }

  function googleRedirect() {
    axios.get('https://fierce-plains-47590.herokuapp.com/api/auth/google')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const responseGoogle = response => {
    console.log(response);
  }

  return (
    <>
      <GoogleLogin
        clientId="946449224744-vhunkfv7b299chrqqr2sjsvmajrua9c7.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <form onSubmit={handleSubmit}>
        <button onClick={googleRedirect}>Google</button>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        >
        </input>
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        >
        </input>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default Login;
