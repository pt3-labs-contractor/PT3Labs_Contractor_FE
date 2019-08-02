import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { fetchAccts } from '../../actions/index';

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
      props.fetchAccts();
      props.history.push('/login');
    }
  }, [props]);

  return <div />;
}

export default connect(
  null,
  { fetchAccts }
)(Redirect);
