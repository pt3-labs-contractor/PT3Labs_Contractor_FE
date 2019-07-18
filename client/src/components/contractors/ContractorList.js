import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import { sortByDistance } from './searchFunctions';
import './ContractorList.css';

import ContractorCard from './ContractorCard';
// import NavBarUser from './components/navbar/NavBarUser';

import { setPosition } from '../../actions/index';

function ContractorList({
  error,
  loading,
  contractors,
  sortedContractors,
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

  console.log(list);

  const paginate = arr => {
    const length = arr.length + 1;
    const limit = userLanding ? 5 : 25;
    const dividedContractors = [];
    for (let x = 1; x <= Math.ceil(length / limit); x += 1) {
      const temp = [];
      const pageItems = length / (limit * x) > 1 ? limit : (length % limit) - 1;
      for (let y = 0; y < pageItems; y += 1) {
        temp.push(arr[(x - 1) * limit + y]);
      }
      dividedContractors.push(temp);
    }
    setContractors(dividedContractors);
    setPageNum(0);
  };

  useEffect(() => {
    if (userLanding) return paginate(sortedContractors);
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
    sortByDistance(zip, contractors)
      .then(arr => {
        setZip('');
        setPageNum(1);
        if (!arr) {
          paginate(contractors);
          throw new Error('Invalid Zip Code');
        }
        paginate(arr);
      })
      .catch(err => console.log(err));
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

// ContractorList.propTypes = {
//   contractors: PropTypes.arrayOf(PropTypes.object),
//   loading: PropTypes.bool,
//   error: PropTypes.string,
//   user: PropTypes.shape({
//     id: PropTypes.string,
//     googleId: PropTypes.string,
//     email: PropTypes.string,
//     phoneNumber: PropTypes.string,
//     contractorId: PropTypes.string,
//     city: PropTypes.string,
//   }),
//   userLanding: PropTypes.bool,
//   setPosition: PropTypes.func,
//   selectContractor: PropTypes.func,
// };

// city: "Test City"
// contractorId: "aec1f8d3-a534-48e5-8be1-9fc4197acccd"
// createdAt: "2019-06-25T01:28:58.426Z"
// email: "testContractor@email.com"
// googleId: null
// id: "aec1f8d3-a534-48e5-8be1-9fc4197acccd"
// latitude: "40.6042"
// longitude: "-74.2825"
// name: "Test Contractor"
// phoneNumber: "(555)867-5309"
// services: (3) [{…}, {…}, {…}]
// stateAbbr: "TE"
// streetAddress: "1 Test St."
// username: "Test Contractor"
// zipCode: "07065"

const mapStateToProps = state => {
  return {
    contractors: state.contractors,
    sortedContractors: state.sortedContractors,
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
