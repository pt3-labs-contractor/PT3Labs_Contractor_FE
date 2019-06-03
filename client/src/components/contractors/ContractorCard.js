import React from 'react';

function ContractorCard(props) {
  const {
    name,
    phoneNumber,
    streetAddress,
    city,
    stateAbbr,
    zipCode,
  } = props.contractor;

  return (
    <div>
      <h3>{name}</h3>
      <address>
        <p>{phoneNumber}</p>
        <p>{streetAddress}</p>
        <p>{`${city} ${stateAbbr}`}</p>
        <p>{zipCode}</p>
      </address>
    </div>
  );
}

export default ContractorCard;
