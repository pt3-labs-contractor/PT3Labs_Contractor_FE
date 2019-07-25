import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosTrash, IoMdCreate } from 'react-icons/io';

import './Settings.css';

import NavBarContractor from '../navbar/NavBarContractor';
// import ContractorCard from './ContractorCard';
import {
  editUserSettings,
  postNewService,
  deleteService,
} from '../../actions/index';
import TopNavbar from '../navbar/TopNavbar';

function ContractorSetting(props) {
  // console.log(props.User)
  const [username, setUsername] = useState(props.User.username);
  const [phoneNumber, setPhoneNumber] = useState(props.User.phoneNumber);
  const [email, setEmail] = useState(props.User.email);
  const [services, setServices] = useState(props.User.services);

  const [addService, setAddServices] = useState('');
  const [addPrice, setAddPrice] = useState('');

  const serviceList = [
    'Electrical',
    'Plumbing',
    'Carpentry',
    'Landscaping',
    'Masonry',
    'Health and Beauty',
    'Roofing and Siding',
  ];

  useEffect(() => {
    setUsername(props.User.username);
    setPhoneNumber(props.User.phoneNumber);
    setEmail(props.User.email);
    setServices(props.services);
  }, [
    props.User.username,
    props.User.phoneNumber,
    props.User.email,
    props.User.services,
    props.services,
  ]);

  // useEffect(() => {
  //   console.log('fired')
  // }, [
  //   props.services
  // ])

  function handleUpdate(e) {
    e.preventDefault();
    props.editUserSettings({ email, username, phoneNumber });
  }

  function handleAddServiceChange(e) {
    setAddServices(e);
  }

  function handleAddPriceChange(e) {
    setAddPrice(e);
  }

  function handleAddServiceSubmit(e) {
    e.preventDefault();
    props.postNewService({ name: addService, price: addPrice });
    // console.log({ name:addService,price:addPrice })
  }

  function handleServeDelete(service) {
    // e.preventDefault();
    props.deleteService(service);
    // console.log(service)
  }
  return (
    <>
      <TopNavbar />
      <NavBarContractor />
      <div className="main-container">
        <div className="settings-container">
          <h2 className="title">{props.User.username} Settings</h2>
          {'\n'}
          <form onSubmit={handleUpdate}>
            <div className="username-div">
              Username
              <input
                type="text"
                name="contUN"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className="email-div">
              Email
              <input
                // value="contractor Email"
                type="text"
                name="contEmail"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="phonenumber-div">
              Contractor Phone
              <input
                // value="contractor phonenumber"
                type="text"
                name="contPN"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>
            {/* Old Password
            <input />
            New Passowrd
          <input /> */}
            <div className="box">
              <button className="btn btn-three">Save</button>
            </div>
          </form>
          <form onSubmit={handleAddServiceSubmit}>
            Add Service
            <div className="add-service">
              <select
                className="select-service"
                value={addService}
                onChange={e => handleAddServiceChange(e.target.value)}
              >
                <option value="">Pick a service</option>
                {serviceList.map(service => (
                  <option key={service} value={service.toLowerCase()}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <input
              placeholder="Price"
              name="price"
              value={addPrice}
              onChange={e => handleAddPriceChange(e.target.value)}
            />
            <div className="box">
              <button
                onClick={handleAddServiceSubmit}
                className="btn btn-three"
              >
                Add Service
              </button>
            </div>
          </form>
          {props.User.username}'s Services
          {/* <p>Services:</p> */}
          <div className="services">
            <div>
              {props.services
                ? props.services.map(service => (
                    <div className="indi-services">
                      <p>{service.name}</p>
                      <p>{service.price}</p>
                      <button onClick={e => handleServeDelete(service)}>
                        <IoIosTrash />
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
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
  {
    editUserSettings,
    postNewService,
    deleteService,
  }
)(ContractorSetting);
