import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchAccts, postNewService } from '../actions/index.js';

const ServiceForm = props => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState();
  const { contractorId } = props.user;

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
    user: state.user,
  };
};

export default connect(
  mstp,
  { fetchAccts, postNewService }
)(ServiceForm);
