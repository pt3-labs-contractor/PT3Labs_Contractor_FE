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
import NavBarUser from './components/navbar/NavBarUser';
import NavBarContractor from './components/navbar/NavBarContractor';
import Settings from './components/settings/Settings';
import ContractorFeedback from './components/feedback/ContractorFeedback'
import UserFeedback from './components/feedback/UserFeedback'

function App(props) {

  useEffect(() => {
    props.fetchAccts();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <NavBarUser/>
      <NavBarContractor/>
      <Route path="/users" component={Users} />
      <Route exact path="/contractors" component={ContractorList} />
      <Route path="/contractors/:id" component={Contractor} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/settings" component={Settings}/>
      <Route path="/contractorFeedback" component={ContractorFeedback} />
      <Route path="/userFeedback" component={UserFeedback} />

    </div>
  );
}

export default withRouter(connect(null, { fetchAccts })(App));
