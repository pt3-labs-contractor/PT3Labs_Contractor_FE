import React, { useEffect } from 'react';
import queryString from 'query-string';

function Redirect(props) {
  useEffect(() => {
    // const { token } = props.match.params;
    const { token, registrationComplete } = queryString.parse(
      window.location.search
    );
    localStorage.setItem('jwt', token);
    if (!registrationComplete) {
      props.history.push('/register');
    } else {
      props.history.push('/');
    }
  }, [props.history, props.match.params]);

  return <div />;
}

export default Redirect;
