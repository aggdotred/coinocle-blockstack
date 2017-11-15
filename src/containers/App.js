import React from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import Wallets from './Wallets';
import HomePage from './HomePage';
import CoinPage from './CoinPage';
import NewWallet from "./NewWallet";
import './App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Button
} from 'reactstrap';
import {message} from '../modules/message';
import {signinSuccess, signout, loadHoldings, updateHoldings} from '../modules/account';
import {loadCoinList} from '../modules/coin';
import {buttons} from '../modules/message';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import logo from "./logoWhite.png";


window.blockstack = require('blockstack');
window.blockstackStorage = require('blockstack-storage');
window.axios = require('axios');


class App extends React.Component {

  componentDidMount() {
    let userData, user;
    const blockstack = window.blockstack;
    //
    if (blockstack.isUserSignedIn()) {
      userData = blockstack.loadUserData();
      user = new blockstack.Person(userData.profile);
      this.props.signinSuccess(user);
      this.props.loadHoldings();
      // Check to make sure the users avatar is still available from whatever storage they are using.
      console.log(user.avatarUrl());

    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn()
          .then((userData) => {
            console.log(userData);
            window.location = window.location.origin;
          })
    }
    this.props.loadCoinList();
  }

  render() {

    const user = this.props.user;

    // Signout functionality
    const signoutButton = user ? (
            <button className="not-btn" type="submit" onClick={() => this.props.signout()}>{buttons.signOutButton}</button>
        ) : null;

    // Load Blockstack Identity Image.
    const image = user ? (
          <img className="circle" src={this.props.user.avatarUrl()} width="64" height="64" />
      ) : null;

    return (
        <div className="App">
          <Navbar color="faded">
            <Container>
              <NavbarBrand ><img src={logo} alt="Coinocle logo" /></NavbarBrand>
                <ul className="nav navbar-nav navbar-right">
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{image} <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li className="droplink">Profile</li>
                      <li className="droplink">Contact Us</li>
                      <li>{signoutButton}</li>
                    </ul>
                  </li>
                </ul>
            </Container>

          </Navbar>
          <main>
            <Route exact path="/" component={HomePage}/>
            <Route path="/coin/:coin" component={CoinPage}/>
            <Route exact path="/wallets" component={Wallets}/>
            <Route exact path="/wallet/new" component={NewWallet}/>
          </main>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.account.user,
  signedIn: state.account.signedIn,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  signinSuccess,
  loadHoldings,
  updateHoldings,
  signout,
  loadCoinList,
}, dispatch)

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))
