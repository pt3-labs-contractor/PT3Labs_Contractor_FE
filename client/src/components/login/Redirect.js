import React, { useEffect } from 'react';
import queryString from 'query-string';

function Redirect(props) {
  useEffect(() => {
    const { token, registrationComplete } = queryString.parse(
      props.location.search
    );
    console.log(token, registrationComplete);
    localStorage.setItem('jwt', token);
    if (!registrationComplete) {
      props.history.push(`/register/oauth`);
    } else {
      props.history.push('/app');
    }
  }, [props]);

  return <div />;
}

export default Redirect;
