import React, { useEffect } from 'react'

function Redirect(props) {
  useEffect(() => {
    const { token } = props.match.params;
    localStorage.setItem('jwt', token);
    props.history.push('/');
  }, [props.history, props.match.params]) 

  return (
    <div>
      
    </div>
  )
}

export default Redirect
