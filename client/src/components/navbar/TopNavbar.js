import React from 'react';
import { connect } from 'react-redux';
import { fetchAccts } from '../../actions/index';
import './TopNavbar.css';
import { Link } from 'react-router-dom';

function TopNavbar(props) {
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

const logout = () => {
  localStorage.removeItem('jwt');
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  { fetchAccts }
)(TopNavbar);
