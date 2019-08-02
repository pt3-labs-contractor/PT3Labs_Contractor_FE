import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './MainNavbar.css';

function Navbar({ user }) {
  function logout(ev) {
    localStorage.removeItem('jwt');
    window.location.reload();
  }
  return (
    <div>
      <nav className="navbar bg-dark">
        <NavLink to="/" className="main-title">
          <i className="far fa-calendar-alt main-title-icon" />
          <h1>Inquiry</h1>
        </NavLink>
        <ul>
          {user.username ? (
            <li className="mainnav-link">
              <button
                type="button"
                onClick={logout}
                className="homepage-logout"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="mainnav-link">
                <NavLink to="/register">Register</NavLink>
              </li>
              <li className="mainnav-link">
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

Navbar.defaultProps = {
  user: {},
};

Navbar.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  {}
)(Navbar);
