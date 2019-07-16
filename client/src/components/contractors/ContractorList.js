import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './ContractorList.css';

import ContractorCard from './ContractorCard';
// import NavBarUser from './components/navbar/NavBarUser';

import { setPosition } from '../../actions/index';

function ContractorList({
  error,
  loading,
  contractors,
  user,
  userLanding,
  ...handlers
}) {
  const [pageNum, setPageNum] = useState(0);
  const [contractorList, setContractors] = useState([]);
  const [list, setList] = useState([]);
  const [select, setSelect] = useState({});
  const contractorRef = useRef({});

  useEffect(() => {
    const length = contractors.length + 1;
    const limit = userLanding ? 5 : 25;
    const dividedContractors = [];
    for (let x = 1; x <= Math.ceil(length / limit); x += 1) {
      const temp = [];
      const pageItems = length / (limit * x) > 1 ? limit : (length % limit) - 1;
      for (let y = 0; y < pageItems; y += 1) {
        temp.push(contractors[(x - 1) * limit + y]);
      }
      dividedContractors.push(temp);
    }
    setContractors(dividedContractors);
    setPageNum(0);
    // eslint-disable-next-line
  }, [contractors]);

  useEffect(() => {
    setList(contractorList[pageNum] || []);
  }, [pageNum, contractorList]);

  const selectElement = id => {
    if (select !== id) {
      setSelect(id);
      new Promise(resolve => {
        contractorRef.current[id] = React.createRef();
        resolve(contractorRef.current[id]);
      }).then(element => {
        // console.log(element.current.getBoundingClientRect());
        handlers.setPosition(element.current.getBoundingClientRect());
      });
    }
  };

  const pageChange = dir => {
    setPageNum(pageNum + dir);
  };

  return (
    <div className="contractor-list container">
      <div className="list-header">
        <h3>Contractors:</h3>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => pageChange(-1)}
            disabled={pageNum <= 0}
          >
            Page
            <br />
            down
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => pageChange(1)}
            disabled={pageNum >= contractorList.length - 1}
          >
            Page
            <br />
            up
          </button>
        </div>
      </div>
      <div className="contractor-list-container">
        {loading ? <p>Loading...</p> : null}
        {error ? <p>{error}</p> : null}
        {list.map(contractor =>
          userLanding ? (
            <div
              type="button"
              key={contractor.id}
              ref={contractorRef.current[contractor.id]}
              className={
                'contractor-card-container' +
                `${select === contractor.id ? ' selected' : ''}`
              }
              onClick={() => {
                handlers.selectContractor(contractor);
                selectElement(contractor.id);
              }}
            >
              <ContractorCard contractor={contractor} />
            </div>
          ) : (
            <Link to={`/app/contractors/${contractor.id}`} key={contractor.id}>
              <ContractorCard full contractor={contractor} />
            </Link>
          )
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    contractors: state.contractors,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(mapStateToProps, {setPosition})(ContractorList);
