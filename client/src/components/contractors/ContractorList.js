import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ContractorCard from './ContractorCard';
// import NavBarUser from './components/navbar/NavBarUser';


function ContractorList(props) {
  console.log(props.user)
  // <NavBarUser/>
  // props.history.push('/')
  return (
    <div>
      <h3>Contractors:</h3>
      {props.loading ? <p>Loading...</p> : null}
      {props.error ? <p>{props.error}</p> : null}
      {props.contractors.map(contractor => (
        <Link to={`/contractors/${contractor.id}`} key={contractor.id}>
          <ContractorCard contractor={contractor} />
        </Link>
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    contractors: state.contractors,
    user: state.user,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(mapStateToProps)(ContractorList);
