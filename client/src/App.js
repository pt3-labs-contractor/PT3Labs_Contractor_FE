import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './App.css';

import { fetchAccts } from './actions/index';
import Homepage from './components/homepage/Homepage';
import Users from './components/users/Users';
import ContractorList from './components/contractors/ContractorList';
import Contractor from './components/contractors/Contractor';
import Login from './components/login/Login';
import Redirect from './components/login/Redirect';
import Register from './components/register/Register';
import Calendar from './components/calendar/Calendar';
import ContCalendar from './components/calendar/Cal.js';
import MainNavbar from './components/navbar/MainNavbar';
import NavBarUser from './components/navbar/NavBarUser';
import NavBarContractor from './components/navbar/NavBarContractor';
import Settings from './components/settings/Settings';
import ContractorFeedback from './components/feedback/ContractorFeedback';
import UserFeedback from './components/feedback/UserFeedback';
import EScheduler from './components/editForm.jsx';

function App(props) {
  useEffect(() => {
    props.fetchAccts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <main className="main-content">
        {/* <NavBarUser />
        <NavBarContractor /> */}
        {/* <Switch> */}
        <Route exact path="/" component={Homepage} />
        <Route path="/users" component={Users} />
        <Route exact path="/contractors" component={ContractorList} />
        <Route path="/contractors/:id" component={Contractor} />
        <Route exact path="/" component={Homepage} />
        {props.user !== {} ? (
          <Route
            path="/app"
            component={props.user.contractorId ? NavBarContractor : NavBarUser}
          />
        ) : null}
        <Route path="/users" component={Users} />
        <Route exact path="/app/contractors" component={ContractorList} />
        <Route path="/app/contractors/:id" component={Contractor} />
        <Route path="/login" component={Login} />
        <Route path="/redirect" component={Redirect} />
        <Route exact path="/register" component={Register} />
        <Route
          path="/register/oauth"
          render={props => <Register {...props} oauth />}
        />
        <Route
          path="/calendar"
          render={props => <Calendar {...props} contractor={{}} />}
        />
        <Route
          path="/contractorCalendar"
          render={props => <ContCalendar {...props} contractor={{}} />}
        />
        <Route path="/settings" component={Settings} />
        <Route path="/contractorFeedback" component={ContractorFeedback} />
        <Route path="/userFeedback" component={UserFeedback} />
        {/* </Switch> */}
      </main>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchAccts }
  )(App)
);
