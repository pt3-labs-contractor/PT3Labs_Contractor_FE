import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { IoIosTrash } from 'react-icons/io'
// import { IoMdCreate } from 'react-icons/io'
import './Settings.css';
import NavBarUser from '../navbar/NavBarUser';
import { editUserSettings } from '../../actions/index';
import TopNavbar from '../navbar/TopNavbar';
import UploadImage from './UploadImage.js';

function UserSetting(props) {
  const [username, setUsername] = useState(props.User.username);
  const [phoneNumber, setPhoneNumber] = useState(props.User.phoneNumber);
  const [email, setEmail] = useState(props.User.email);

  // console.log(props)
  useEffect(() => {
    setUsername(props.User.username);
    setPhoneNumber(props.User.phoneNumber);
    setEmail(props.User.email);
  }, [props.User.username, props.User.phoneNumber, props.User.email]);

  function handleUpdate(e) {
    e.preventDefault();
    props.editUserSettings({ email, username, phoneNumber });
  }

  return (
    <>
      <TopNavbar />
      <NavBarUser />
      <div className="main-container">
        <div className="settings-container">
          <Link to="/uploadimage">
            <p>Upload Image</p>
          </Link>
          <h2 className="title">{props.User.username} Settings</h2>
          {'\n'}
          <form onSubmit={handleUpdate}>
            <div className="email-div">
              Email
              <input
                className="email-input"
                value={email}
                type="text"
                name="userEmail"
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="username-div">
              Username
              <input
                value={username}
                type="text"
                name="userUsername"
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            {/* Old Password
            <input />

            New Passowrd
            <input /> */}
            <div className="phonenumber-div">
              Phone Number
              <input
                value={phoneNumber}
                type="text"
                name="userphoneNumber"
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="box">
              <button className="btn btn-three">Save</button>
            </div>
          </form>
          <UploadImage />
          {/* <form>
            Add Service <input placeholder="Service" />
            <input placeholder="Price" />
          </form> */}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  // console.log(state)
  return {
    User: state.user,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  { editUserSettings }
)(UserSetting);
