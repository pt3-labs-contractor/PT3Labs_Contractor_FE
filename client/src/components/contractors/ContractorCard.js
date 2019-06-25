import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function ContractorCard(props) {
  const [service, setService] = useState({});
  const {
    name,
    phoneNumber,
    // streetAddress,
    // city,
    // stateAbbr,
    // zipCode,
  } = props.contractor;

  useEffect(() => {
    const filtered = props.contractor.services.filter(service => {
      return service.name === props.service;
    });
    setService(filtered[0]);
  }, [props.service]);

  return (
    <div>
      <h3>{name}</h3>
      <address>
        <p>{phoneNumber}</p>
        {service ? (
          <>
            <p>
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
