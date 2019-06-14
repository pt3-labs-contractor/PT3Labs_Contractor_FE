import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { IoIosTrash } from 'react-icons/io'
// import { IoMdCreate } from 'react-icons/io'
import './Settings.css';

import NavBarContractor from '../navbar/NavBarContractor';
// import ContractorCard from './ContractorCard';

import { selectSingleContractorSetting } from '../../actions/index';

function ContractorSetting(props) {
  // const [username, setUsername] = useState(props.User.username)
  // const [phoneNumber, setPhoneNumber] = useState(props.User.phoneNumber)
  // const [email, setEmail] = useState(props.User.email)
  
  console.log(props)
  // useEffect(() => {
  //   setUsername(props.User.username)
  //   setPhoneNumber(props.User.phoneNumber)
  //   setEmail(props.User.email)
    
  // }, [
  //   props.User.username,
  //   props.User.phoneNumber,
  //   props.User.email
  // ])

  function handleUpdate (e) {
    e.preventDefault();
    // props.editUserSettings({email, username, phoneNumber})
    
  }
  return (
    <>
      <NavBarContractor />
      <div className="settings-container">
        <h2>Contractor Setting Page</h2>
        {'\n'}
        <form>
          Email
          <input
            // value="contractor Email"
            type="text"
            name="contEmail"
            value={props.User.email}
          />
          Contractor Phone
          <input
            // value="contractor phonenumber"
            value={props.User.phoneNumber}
          />
          {/* Old Password
          <input />
          New Passowrd
          <input /> */}
          <button>Save</button>
        </form>
        <form>
          Add Service <input placeholder="Service" />
          <input placeholder="Price" />
        </form>
        <ul>
          LIST OF SERVICES
          {/* <li>Service1<button><IoMdCreate/></button> <button><IoIosTrash/></button></li>
          <li>Service2<button><IoMdCreate/></button> <button><IoIosTrash/></button></li>
          <li>Service3<button><IoMdCreate/></button> <button><IoIosTrash/></button></li>
          <li>Service4<button><IoMdCreate/></button> <button><IoIosTrash/></button></li> */}
        </ul>
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


export default connect(mapStateToProps, selectSingleContractorSetting)(ContractorSetting);
