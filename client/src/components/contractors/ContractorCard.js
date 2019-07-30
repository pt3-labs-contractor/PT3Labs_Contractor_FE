import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import PropTypes from 'prop-types';

function ContractorCard({ contractor, service, full, mainList = false }) {
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
      setService(filtered[0]);
    }
    // eslint-disable-next-line
  }, [service]);

  return (
    <div className={mainList ? 'contractor-card-full' : 'contractor-card'}>
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
        ) : !mainList && localService ? (
          <>
            <p className="service-title">
              {localService.name}: {localService.price}
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
        initialRating={userScore}
        fractions={4}
        stop={5}
        readonly
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    service: state.serviceFilter,
  };
};

export default connect(mapStateToProps)(ContractorCard);

ContractorCard.propTypes = {
  contractor: PropTypes.shape({
    city: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    stateAbbr: PropTypes.string,
    streetAddress: PropTypes.string,
    zipCode: PropTypes.string,
    services: PropTypes.arrayOf(
      PropTypes.shape({
        contractorId: PropTypes.string,
        createdAt: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.string,
      })
    ),
  }),
  service: PropTypes.string,
  full: PropTypes.bool,
  mainList: PropTypes.bool,
};

ContractorCard.defaultProps = {
  contractor: null,
  service: null,
  full: false,
  mainList: false,
};
