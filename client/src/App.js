import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './App.css';

import { fetchAccts } from './actions/index';
import Users from './components/users/Users';
import ContractorList from './components/contractors/ContractorList';
import Contractor from './components/contractors/Contractor';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Calendar from './components/calendar/Calendar';

function App(props) {

  useEffect(() => {
    props.fetchAccts();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <Route path="/users" component={Users} />
      <Route exact path="/contractors" component={ContractorList} />
      <Route path="/contractors/:id" component={Contractor} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/calendar" component={Calendar} />
    </div>
  );
}

export default withRouter(connect(null, { fetchAccts })(App));
