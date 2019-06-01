import React, { useEffect } from 'react';

function Redirect(props) {
  useEffect(() => {
    const { token } = props.match.params;
    localStorage.setItem('jwt', token);
    props.history.push('/register/oauth');
  }, [props.history, props.match.params]);

  return <div />;
}

export default Redirect;
