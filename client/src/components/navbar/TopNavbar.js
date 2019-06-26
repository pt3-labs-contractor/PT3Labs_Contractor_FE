import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAccts, logoutUser } from '../../actions/index';
import './TopNavbar.css';
import { Link } from 'react-router-dom';

function TopNavbar(props) {
  const logout = () => {
    localStorage.removeItem('jwt');
    props.logoutUser();
  };

  const stringify = JSON.stringify(props.user);
  useEffect(() => {
    props.fetchAccts();
  }, [stringify]);
  return (
    <div className="topnav">
      <nav className="topnav-style">
        <div className="topnav-link">
          <Link to="/usersettings">
            <p className="username">Hello, {props.user.username}</p>
          </Link>
        </div>
        <div className="topnav-link">
          <Link to="/">
            <p onClick={logout}>Log Out</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  { fetchAccts, logoutUser }
)(React.memo(TopNavbar));
