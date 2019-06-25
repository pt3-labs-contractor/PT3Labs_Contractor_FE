import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './ContractorList.css';

import ContractorCard from './ContractorCard';
// import NavBarUser from './components/navbar/NavBarUser';

import { setPosition } from '../../actions/index';

function ContractorList(props) {
  const [pageNum, setPageNum] = useState(0);
  const [contractorList, setContractors] = useState([]);
  const [list, setList] = useState([]);
  const [select, setSelect] = useState({});
  const contractorRef = useRef({});

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
    setList(contractorList[pageNum] || []);
  }, [pageNum, contractorList]);

  const selectElement = id => {
    if (select !== id) {
      setSelect(id);
      new Promise((resolve, reject) => {
        contractorRef.current[id] = React.createRef();
        resolve(contractorRef.current[id]);
      }).then(element => {
        // console.log(element.current.getBoundingClientRect());
        props.setPosition(element.current.getBoundingClientRect());
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
            className="btn"
            onClick={() => pageChange(-1)}
            disabled={pageNum <= 0}
          >
            Page
            <br />
            down
          </button>
          <button
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
        {props.loading ? <p>Loading...</p> : null}
        {props.error ? <p>{props.error}</p> : null}
        {list.map(contractor =>
          props.userLanding ? (
            <div
              key={contractor.id}
              ref={contractorRef.current[contractor.id]}
              className={
                'contractor-card-container' +
                `${select === contractor.id ? ' selected' : ''}`
              }
              onClick={() => {
                props.selectContractor(contractor);
                selectElement(contractor.id);
              }}
            >
              <ContractorCard contractor={contractor} />
            </div>
          ) : (
            <Link to={`/app/contractors/${contractor.id}`} key={contractor.id}>
              <ContractorCard contractor={contractor} />
            </Link>
          )
        )}
      </div>
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

export default connect(
  mapStateToProps,
  { setPosition }
)(ContractorList);
