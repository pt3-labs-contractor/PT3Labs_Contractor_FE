import React, { useEffect } from 'react';
import queryString from 'query-string';

function Redirect(props) {
  useEffect(() => {
    // const { token } = props.match.params;
    const { token, registrationComplete } = queryString.parse(
      props.location.search
    );
    console.log(token, registrationComplete);
    localStorage.setItem('jwt', token);
    if (!registrationComplete) {
      props.history.push(`/register/oauth`);
    } else {
      props.history.push('/');
    }
  }, [props]);

  return <div />;
}

export default Redirect;
