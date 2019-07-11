import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ContractorCard(props) {
  const [service, setService] = useState({});
  const {
    name,
    phoneNumber,
    streetAddress,
    city,
    stateAbbr,
    zipCode,
  } = props.contractor;

  useEffect(() => {
    if (props.contractor.id) {
      const filtered = props.contractor.services.filter(service => {
        return service.name === props.service;
      });
      setService(filtered[0]);
    }
  }, [props.service]);
  return (
    <div className="contractor-card">
      <h3>{name}</h3>
      <address>
        <p>{phoneNumber}</p>
        {props.full ? (
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
