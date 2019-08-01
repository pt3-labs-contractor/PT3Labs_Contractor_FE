import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import './ContractorList.css';

import ContractorCard from './ContractorCard';
// import NavBarUser from './components/navbar/NavBarUser';

import { setPosition, sortContractorsByLocation } from '../../actions/index';

function ContractorList({
  error,
  loading,
  contractors,
  sortedContractors,
  locationSortContractors,
  user,
  userLanding,
  ...handlers
}) {
  const [pageNum, setPageNum] = useState(0);
  const [contractorList, setContractors] = useState([]);
  const [list, setList] = useState([]);
  const [select, setSelect] = useState({});
  const contractorRef = useRef({});
  const [zip, setZip] = useState('');
  const [query, setQuery] = useState('');

  const paginate = arr => {
    const limit = userLanding ? 5 : 25;
    const dividedContractors = [];
    for (let i = 0; i < arr.length; i += limit) {
      const current = arr.slice(i, i + limit);
      if (current.length) dividedContractors.push(current);
    }
    setContractors(dividedContractors);
    setPageNum(0);
  };

  useEffect(() => {
    if (userLanding) return paginate(sortedContractors);
    if (locationSortContractors) return paginate(locationSortContractors);
    return paginate(contractors);
    // eslint-disable-next-line
  }, [sortedContractors]);

  useEffect(() => {
    setList(contractorList[pageNum] || []);
  }, [pageNum, contractorList]);

  // Possible removal of this function as the position isn't needed
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

  function handleSearch(ev) {
    ev.preventDefault();
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      minMatchCharLength: 2,
      keys: [
        {
          name: 'name',
          weight: '0.5',
        },
        {
          name: 'city',
          weight: '0.3',
        },
        {
          name: 'stateAbbr',
          weight: query.length === 2 ? '0.7' : '0.1',
        },
        {
          name: 'zipCode',
          weight: '0.1',
        },
      ],
    };
    const fuse = new Fuse(contractors, options);
    setPageNum(1);
    paginate(query.length > 1 ? fuse.search(query) : contractors);
    setQuery('');
  }
  function handleZipSort(ev) {
    ev.preventDefault();
    if (!zip || zip.length < 5) return;
    handlers.sortContractorsByDistance(contractors, zip);
  }

  return (
    <div className="contractor-list container">
      <div className="list-header">
        <h3 className="contractor-list-title">Contractors:</h3>
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
        {userLanding ? null : (
          <div className="contractor-list-form-container">
            <form onSubmit={handleZipSort}>
              <input
                placeholder="Sort By Distance"
                type="text"
                onChange={ev => setZip(ev.target.value)}
                value={zip}
              />
              <button type="submit">Search</button>
            </form>
            <form onSubmit={handleSearch}>
              <input
                placeholder="Search"
                type="text"
                onChange={ev => setQuery(ev.target.value)}
                value={query}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        )}
      </div>
      <div className={userLanding ? 'contractor-list' : 'contractor-display'}>
        {loading ? <p>Loading...</p> : null}
        {error ? <p>{error}</p> : null}
        {list.map(contractor =>
          userLanding ? (
            <button
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
            </button>
          ) : (
            <Link to={`/app/contractors/${contractor.id}`} key={contractor.id}>
              <ContractorCard mainList contractor={contractor} />
            </Link>
          )
        )}
      </div>
    </div>
  );
}

ContractorList.defaultProps = {
  contractors: [],
  loading: false,
  error: null,
  user: {},
  userLanding: undefined,
  setPosition: undefined,
  selectContractor: undefined,
};

const mapStateToProps = state => {
  return {
    contractors: state.contractors,
    sortedContractors: state.sortedContractors,
    locationSortContractors: state.locationSortContractors,
    user: state.user,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  { setPosition, sortContractorsByLocation }
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
