import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import Portfolio from './Portfolio';
import CoinChart from './CoinChart';
import NewCoin from "./NewCoin";
import AddTransaction from "./AddTransaction";
import './App.css';
import {
  Navbar,
  NavbarBrand,
  Container
} from 'reactstrap';
import {signinSuccess, signout, loadHoldings, updateHoldings} from '../modules/account';
import {loadCoinList} from '../modules/coin';
import {buttons} from '../modules/message';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Chart from "./Chart";
import AddCoin from "./AddCoin";
import EditCoin from "./EditCoin";
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
          <img className="circle" src={this.props.user.avatarUrl()} alt="profile" width="64" height="64" />
      ) : null;

    return (
        <div className="App">
          <Navbar color="faded">
            <Container>
              <NavbarBrand ><a href="/"><img src={logo} alt={"logo"} /></a></NavbarBrand>
                <ul className="nav navbar-nav navbar-right">
                  <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{image} <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li className="droplink"><a href="http://coinocle.com">About</a></li>
                      <li className="droplink"><a href="http://coinocle.com">Contact Us</a></li>
                      <li>{signoutButton}</li>
                    </ul>
                  </li>
                </ul>
            </Container>

          </Navbar>
          <main>
            <Route exact path="/" component={Portfolio}/>
            <Route path="/add/:coin" component={AddCoin}/>
            <Route path="/edit/:coin" component={EditCoin}/>
            <Route path="/chart/:coin" component={CoinChart}/>
            <Route exact path="/coin/new" component={NewCoin}/>
            <Route exact path="/chart" component={Chart}/>
            <Route exact path="/transaction/new" component={AddTransaction}/>
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
