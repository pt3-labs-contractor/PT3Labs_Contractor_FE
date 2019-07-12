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
    setServices(props.User.services);
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
        <form onSubmit={handleAddServiceSubmit}>
          Add Service
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
          <input
            placeholder="Price"
            name="price"
            value={addPrice}
            onChange={e => handleAddPriceChange(e.target.value)}
          />
          <button onClick={handleAddServiceSubmit}>Add Service</button>
        </form>
        LIST OF SERVICES
        <p>Services:</p>
        <div>
          {props.services
            ? props.services.map(service => (
                <>
                  <p className="service-title">{service.name}</p>
                  <p>{service.price}</p>
                  <button onClick={e => handleServeDelete(service)}>
                    <IoIosTrash />
                  </button>
                </>
              ))
            : null}
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
