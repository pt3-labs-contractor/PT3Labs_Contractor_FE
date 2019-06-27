import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

function AuthRouter({ user, ...props }) {
  useEffect(() => {
    props.fetchAccts();
    props.getFeedback();
    if (!Object.keys(user).length) return;
    const { token, registrationComplete } = queryString.parse(
      props.location.search
    );
    if (token) localStorage.setItem('jwt', token);

    // Local login/register, user
    // Local login/register, contractor
    // OAUth login/register, user, complete
    // OAuth login/register, user, incomplete
    // OAuth login/register, contractor, complete
    // OAuth login/register, contractor, incomplete
  }, [user]);
  return <div />;
}

export default AuthRouter;
