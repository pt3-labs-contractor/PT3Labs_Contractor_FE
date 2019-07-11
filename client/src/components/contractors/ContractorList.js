import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
  const limit = props.userLanding ? 5 : 25;
  const { contractors } = props;

  useEffect(() => {
    const dividedContractors = contractors.slice(
      pageNum * limit,
      pageNum * limit + limit
    );
    setContractors(dividedContractors);
    setPageNum(0);
    // eslint-disable-next-line
  }, [props.contractors]);

  useEffect(() => {
    setList(contractorList || []);
  }, [pageNum, contractorList]);

  const selectElement = id => {
    if (select !== id) {
      setSelect(id);
      new Promise((resolve, reject) => {
        contractorRef.current[id] = React.createRef();
        resolve(contractorRef.current[id]);
      }).then(element => {
        props.setPosition(element.current.getBoundingClientRect());
      });
    }
  };

  const pageChange = dir => {
    const newPage = pageNum + dir;
    const dividedContractors = contractors.slice(
      newPage * limit,
      newPage * limit + limit
    );
    setContractors(dividedContractors);
    setPageNum(newPage);
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

ContractorList.propTypes = {
  contractors: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  error: PropTypes.string,
  loading: PropTypes.bool,
  selectContractor: PropTypes.func,
  setPosition: PropTypes.func,
  userLanding: PropTypes.bool,
};
