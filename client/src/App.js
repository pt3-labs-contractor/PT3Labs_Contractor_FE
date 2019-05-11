import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './App.css';

import { fetchUsers } from './actions/index';
import Users from './components/users/Users';

function App(props) {

  useEffect(() => {
    props.fetchUsers();
  }, [])

  return (
    <div className="App">
      <Route path="/" component={Users} />
    </div>
  );
}

export default withRouter(connect(null, { fetchUsers })(App));
