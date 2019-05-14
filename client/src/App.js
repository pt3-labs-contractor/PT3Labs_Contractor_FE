import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './App.css';

import { fetchAccts } from './actions/index';
import Users from './components/users/Users';
import ContractorList from './components/contractors/ContractorList';

function App(props) {

  useEffect(() => {
    props.fetchAccts();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <Route path="/users" component={Users} />
      <Route path="/contractors" component={ContractorList} />
    </div>
  );
}

export default withRouter(connect(null, { fetchAccts })(App));
