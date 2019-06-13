import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { IoIosTrash } from 'react-icons/io'
// import { IoMdCreate } from 'react-icons/io'
import './Settings.css';
import NavBarUser from '../navbar/NavBarUser';
import { selectSingleContractorSetting } from '../../actions/index';

function UserSetting(props) {
  const [username, setUsername] = useState(props.User.username)
  const [phoneNumber, setPhoneNumber] = useState(props.User.phoneNumber)
  const [email, setEmail] = useState(props.User.email)
  // const [password, setPassword] = useState({props.User.})
  // const { id } = props.match.params;
  // console.log(props);
  // useEffect(() => {
  //   props.selectSingleContractorSetting(id)
  // })

  console.log(props)
  return (
    <>
      <NavBarUser />
      <div className="settings-container">
        <h2>User Setting Page</h2>
        {'\n'}
        <form>
          User Email
          <input 
            value={email}
            type="text"
            name="email"
            onChange={e => setEmail(e.target.value)} 
          />

          User Name
          <input 
            value={username} 
            type="text"
            name="username"
            onChange={e => setUsername(e.target.value)} 
          />
          {/* Old Password
          <input />

          New Passowrd
          <input /> */}

          Phone Number
          <input
            value={phoneNumber}  
            type="text"
            name="phoneNumber"
            onChange={e => setPhoneNumber(e.target.value)}         
          /> 

          <button>Save</button>
        </form>
        {/* <form>
          Add Service <input placeholder="Service" />
          <input placeholder="Price" />
        </form> */}
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

export default connect(mapStateToProps, {selectSingleContractorSetting})(UserSetting);
