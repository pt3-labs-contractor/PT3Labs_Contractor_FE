import React from 'react';
import { connect } from 'react-redux';

function Users(props) {
  return (
    <div>
      <h3>Users:</h3>
      {props.loading ? <p>Loading...</p> : null}
      {props.users.map(user => (
        <p>{user.username}</p>
      ))}
    </div>
  )
};

const mapStateToProps = state => {
  return {
    users: state.users,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(Users)
