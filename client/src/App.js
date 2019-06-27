import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './App.scss';

import { fetchAccts, getFeedback } from './actions/index';
import Homepage from './components/homepage/Homepage';
import ContractorList from './components/contractors/ContractorList';
import Contractor from './components/contractors/Contractor';
import Login from './components/login/Login';
import Redirect from './components/login/Redirect';
import Register from './components/register/Register';
import Calendar from './components/calendar/Calendar';
import ContCalendar from './components/calendar/Cal';
// import MainNavbar from './components/navbar/MainNavbar';
import UserLandingPage from './components/landingpage/UserLandingPage';
import NavBarUser from './components/navbar/NavBarUser';
import NavBarContractor from './components/navbar/NavBarContractor';
import Settings from './components/settings/Settings';
import ContractorFeedback from './components/feedback/ContractorFeedback';
import UserFeedback from './components/feedback/UserFeedback';
import MyBookings from './components/bookings/MyBookings';
import Plans from './components/plans/Plans';
import UserSettings from './components/settings/UserSettings';
import ContractorSchedule from './components/contractors/ContractorSchedule';

function App({ user, ...props }) {
  const [win, setWin] = useState();
  const string = JSON.stringify(win);
  useEffect(() => {
    props.fetchAccts();
    props.getFeedback();
    setWin({ width: window.innerWidth, height: window.innerHeight });
    // eslint-disable-next-line
  }, [string]);

  return (
    <div className="App">
      <main>
        <Route exact path="/" component={Homepage} />
        <Route
          path="/app"
          component={user.contractorId ? NavBarContractor : NavBarUser}
        />
        <Route path="/app" component={UserLandingPage} />
        <Route exact path="/app/contractors" component={ContractorList} />
        <Route path="/app/contractors/:id" component={Contractor} />
        <Route path="/login" component={Login} />
        <Route path="/redirect" component={Redirect} />
        <Route exact path="/register" component={Register} />
        <Route
          path="/register/oauth"
          render={routeProps => <Register {...routeProps} oauth />}
        />
        <Route
          path="/calendar"
          render={routeProps => <Calendar {...routeProps} contractor={{}} />}
        />
        <Route
          path="/contractorCalendar"
          render={routeProps => (
            <ContCalendar {...routeProps} contractor={{}} win={win} />
          )}
        />
        <Route path="/settings" component={Settings} />
        <Route path="/usersettings" component={UserSettings} />
        <Route path="/contractorfeedback" component={ContractorFeedback} />
        <Route path="/userfeedback" component={UserFeedback} />
        <Route path="/mybookings" component={MyBookings} />
        <Route path="/plans" component={Plans} />
        <Route path="/contractorschedule" component={ContractorSchedule} />
      </main>
    </div>
  );
}

App.defaultProps = {
  user: {},
  fetchAccts: undefined,
  getFeedback: undefined,
};

App.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  fetchAccts: PropTypes.func,
  getFeedback: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    user: state.user,
    feedback: state.feedback,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchAccts, getFeedback }
  )(App)
);
