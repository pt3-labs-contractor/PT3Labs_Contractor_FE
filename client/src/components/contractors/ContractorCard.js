import React from 'react'

function ContractorCard(props) {
  const { name, phone_number, street_address, city, state_abbr, zip_code } = props.contractor;

  return (
    <div>
      <h3>{name}</h3>
      <address>
        <p>{phone_number}</p>
        <p>{street_address}</p>
        <p>{city}</p>
        <p>{state_abbr}</p>
        <p>{zip_code}</p>
      </address>
    </div>
  )
}

export default ContractorCard
