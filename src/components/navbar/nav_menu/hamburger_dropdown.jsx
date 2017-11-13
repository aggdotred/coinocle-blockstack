import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../../../actions/session_actions';
import $ from 'jquery';
import logo from "./logoWhite.png";

const close = e => {
  e.stopPropagation();
  $('#hamburger-dropdown-container').fadeOut();
};

const HamburgerDropdown = props => {
  return !props.currentUser ? (
  <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="glyphicon glyphicon-option-vertical" />
            </button>
            <Link
              to={"/"}
              className="navbar-brand"
            >
              <img src={logo} alt="Coinocle" />
            </Link>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav">

            </ul>
            <ul className="nav navbar-nav navbar-right">
            <li>

            </li>
            <li>
              <a
                href="http://www.coinocle.com/contact.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </li>
          </ul>
          </div>
        </div>
      </nav>

  ) : (

  <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="glyphicon glyphicon-option-vertical" />
            </button>
            <Link
              to={"/"}
              className="navbar-brand"
            >
              <img src={logo} alt="Coinocle" />
            </Link>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav">

            </ul>
            <ul className="nav navbar-nav navbar-right">

            <li>
              <a href="mailto:support@coinocle.com">Help</a>
            </li>
            <li>
              <a onClick={ props.signout }>Sign Out</a>
            </li>
          </ul>
          </div>
        </div>
      </nav>

  );
};

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
});

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(signout())
});

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerDropdown);
