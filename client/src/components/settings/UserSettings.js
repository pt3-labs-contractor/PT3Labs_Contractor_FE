import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { IoIosTrash } from 'react-icons/io'
// import { IoMdCreate } from 'react-icons/io'
import './Settings.css';
import NavBarUser from '../navbar/NavBarUser';

function UserSetting(props) {
  // console.log(props);
  return (
    <>
      <NavBarUser />
      <div className="settings-container">
        <h2>User Setting Page</h2>
        {'\n'}
        <form>
          User Email
          <input value="User Email" />
          Old Password
          <input />
          New Passowrd
          <input />
          <button>Save</button>
        </form>
        <form>
          Add Service <input placeholder="Service" />
          <input placeholder="Price" />
        </form>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  // console.log(state)
  return {
    User: state.thisUser,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(mapStateToProps)(UserSetting);
