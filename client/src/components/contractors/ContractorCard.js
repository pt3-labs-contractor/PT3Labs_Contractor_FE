import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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
  } = contractor;

  useEffect(() => {
    if (contractor.id) {
      const filtered = contractor.services.filter(entry => {
        return entry.name === service;
      });
      setService(filtered[0]);
    }
  }, [service]);
  console.log('service', service);
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
    <div className="contractor-card">
      <h3>{name}</h3>
      <address>
        <p>{phoneNumber}</p>
        {display}
      </address>
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
};
