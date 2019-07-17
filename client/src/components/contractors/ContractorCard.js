import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import PropTypes from 'prop-types';

function ContractorCard({ contractor, service, full }) {
  const [localService, setService] = useState({});
  const {
    name,
    phoneNumber,
    streetAddress,
    city,
    stateAbbr,
    zipCode,
    userScore,
  } = contractor;

  useEffect(() => {
    if (contractor.id) {
      const filtered = contractor.services.filter(entry => {
        return entry.name === service;
      });
      console.log(filtered);
      console.log(contractor.services);
      console.log(service);
      setService(filtered[0]);
    }
  }, [service]);
  let display = null;
  if (full)
    display = (
      <>
        <p>{streetAddress}</p>
        <p>
          {city} {stateAbbr}
        </p>
        <p>{zipCode}</p>
      </>
    );
  else if (localService)
    display = (
      <>
        <p>
          {localService.name}: {localService.price}
        </p>
      </>
    );
  return (
    <div>
      <h3>{name}</h3>
      <address>
        <p>{phoneNumber}</p>
        {full ? (
          <>
            <p>{streetAddress}</p>
            <p>
              {city} {stateAbbr}
            </p>
            <p>{zipCode}</p>
          </>
        ) : service ? (
          <>
            <p className="service-title">
              {service.name}: {service.price}
            </p>
          </>
        ) : null}
      </address>
      <Rating
        className="contractor-card-star-container"
        fullSymbol={
          <span className="contractor-card-star fullstar">&#9733;</span>
        }
        emptySymbol={
          <span className="contractor-card-star emptystar">&#9734;</span>
        }
        initialRating={1.6}
        fractions={4}
        stop={3}
        readonly
      />
    </div>
  );
}

export default ContractorCard;
