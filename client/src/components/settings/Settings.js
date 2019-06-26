import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosTrash } from 'react-icons/io'
import { IoMdCreate } from 'react-icons/io'
import './Settings.css';

import NavBarContractor from '../navbar/NavBarContractor';
// import ContractorCard from './ContractorCard';
import { editUserSettings } from '../../actions/index';
import TopNavbar from '../navbar/TopNavbar';

function ContractorSetting(props) {
  // console.log(props.User)
  const [username, setUsername] = useState(props.User.username)
  const [phoneNumber, setPhoneNumber] = useState(props.User.phoneNumber)
  const [email, setEmail] = useState(props.User.email)
  const [services, setServices] = useState(props.User.services)
  
  useEffect(() => {
    setUsername(props.User.username);
    setPhoneNumber(props.User.phoneNumber);
    setEmail(props.User.email);
    setServices(props.User.services)
  }, [
    props.User.username, 
    props.User.phoneNumber, 
    props.User.email, 
    props.User.services
  ]);


  
  function handleUpdate(e) {
    e.preventDefault();
    props.editUserSettings({ email, username, phoneNumber });
  }
  return (
    <>
      <TopNavbar />
      <NavBarContractor />
      <div className="settings-container">
        <h2>Contractor Setting Page</h2>
        {'\n'}
        <form onSubmit={handleUpdate}>
          Username
          <input
            type="text"
            name="contUN"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          Email
          <input
            // value="contractor Email"
            type="text"
            name="contEmail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          Contractor Phone
          <input
            // value="contractor phonenumber"
            type="text"
            name="contPN"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
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
  
          LIST OF SERVICES 
          {/* <li>{props.User.services.name}
              <button><IoMdCreate/></button> 
              <button><IoIosTrash/></button>
          </li> */}
          {/* 
          <li>Service2<button><IoMdCreate/></button> <button><IoIosTrash/></button></li>
          <li>Service3<button><IoMdCreate/></button> <button><IoIosTrash/></button></li>
           <li>Service4<button><IoMdCreate/></button> <button><IoIosTrash/></button></li>  */}
        <div>
          {services ? services.map(service => (
            <div>
              <p>{service.name}</p>
              <p>{service.price}</p>
              <button><IoIosTrash/></button>
            </div>
          )): null}
        </div>

      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    User: state.user,
    services: state.services,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  { editUserSettings }
)(ContractorSetting);
