import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './ContractorList.css';

import ContractorCard from './ContractorCard';

function ContractorList(props) {
  const [pageNum, setPageNum] = useState(0);
  const [contractors, setContractors] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const { contractors } = props;
    const length = contractors.length + 1;
    const limit = props.userLanding ? 5 : 25;
    const dividedContractors = [];
    for (let x = 1; x <= Math.ceil(length / limit); x++) {
      const temp = [];
      const pageItems = length / (limit * x) > 1 ? limit : (length % limit) - 1;
      for (let y = 0; y < pageItems; y++) {
        temp.push(contractors[(x - 1) * limit + y]);
      }
      dividedContractors.push(temp);
    }
    setContractors(dividedContractors);
    setPageNum(0);
    // eslint-disable-next-line
  }, [props.contractors]);

  useEffect(() => {
    setList(contractors[pageNum] || []);
  }, [pageNum, contractors]);

  const pageChange = dir => {
    setPageNum(pageNum + dir);
  };

  return (
    <div className="contractor-list-container">
      <h3>Contractors:</h3>
      <button onClick={() => pageChange(-1)} disabled={pageNum <= 0}>
        Page down
      </button>
      <button
        onClick={() => pageChange(1)}
        disabled={pageNum >= contractors.length - 1}
      >
        Page up
      </button>
      {props.loading ? <p>Loading...</p> : null}
      {props.error ? <p>{props.error}</p> : null}
      {list.map(contractor =>
        props.userLanding ? (
          <div key={contractor.id}>
            {contractor.services.map(service => (
              <button
                key={service.id}
                onClick={() => props.selectService(service)}
              >
                {service.name}
              </button>
            ))}
            <div onClick={() => props.selectContractor(contractor)}>
              <ContractorCard contractor={contractor} />
            </div>
          </div>
        ) : (
          <Link to={`/app/contractors/${contractor.id}`} key={contractor.id}>
            <ContractorCard contractor={contractor} />
          </Link>
        )
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    contractors: state.sortedContractors,
    user: state.user,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(mapStateToProps)(ContractorList);
