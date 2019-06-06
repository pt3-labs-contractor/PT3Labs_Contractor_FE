import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAccts, postNewService } from '../actions/index.js';

const ServiceForm = props => {
  // const [service, setService] = useState({
  //   name: '',
  //   price: '',
  //   contractorId: '',
  // });
  const [name, setName] = useState('');
  const [amount, setAmount] = useState();
  const { contractorId } = props.user;
  console.log(contractorId);

  const onChange = e => {
    e.target.id === 'name'
      ? setName(e.target.value)
      : setAmount(e.target.value);
  };

  const submit = e => {
    e.preventDefault();
    const newService = {
      name,
      price: amount,
      contractorId,
    };
    console.log(newService);
    props.postNewService(newService);
  };

  return (
    <div className="formCont">
      <form className="sForm" onSubmit={submit}>
        <div className="nameCont">
          <label className="name" htmlFor="name">
            Name:{' '}
          </label>
          <input id="name" type="text" onChange={onChange} />
        </div>
        <div className="priceCont">
          <label className="price" htmlFor="price">
            Amount:{' '}
          </label>
          <input
            id="price"
            type="number"
            min="0.01"
            step="0.01"
            onChange={onChange}
          />
        </div>
        <button className="subm">Submit</button>
      </form>
    </div>
  );
};

const mstp = state => {
  return {
    user: state.accounts.users,
  };
};

export default connect(
  mstp,
  { fetchAccts, postNewService }
)(ServiceForm);
