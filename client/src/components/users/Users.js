import React from 'react';
import { connect } from 'react-redux';
import NavBarUser from '../navbar/NavBarUser';

function Users(props) {
  console.log(props.users);
  return (
    <div>
      <NavBarUser />
      <h3>Users:</h3>
      {props.loading ? <p>Loading...</p> : null}
      {props.error ? <p>{props.error}</p> : null}
      <p key={props.users.id}>{props.users.username}</p>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    users: state.accounts.users,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(mapStateToProps)(Users);
