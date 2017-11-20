import React from 'react';
import {Row, Col, Container, Button} from 'reactstrap';
import Tabs from '../components/Tabs';
import CurrencySelector from '../components/CurrencySelector';
import CurrencySearch from '../components/CryptoCurrencySearch'; // Import Currency Search Bar for easier access.
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeCurrency, loadCoinList} from '../modules/coin';
import {
  holdingsList,
  portfolioValue,
  porfolioValueChange,
  signinSuccess,
  loadHoldings
} from '../modules/account';
import numeral from 'numeral';
import WalletList from "../components/WalletList";
import { Link } from "react-router-dom";
import {formatMoney} from '../utils';
import {message,
        buttons
} from '../modules/message';

class Portfolio extends React.Component {
  static PropTypes = {}


  signin() {
    const blockstack = window.blockstack
    blockstack.redirectToSignIn()
  }

  onCurrencyChange(currency) {
    this.props.changeCurrency(currency);
    this.props.loadCoinList(currency);
  }

  renderContent() {
    console.log(this.props);
    const signInButton = (
        <a className="social-button" id="blockstack-connect" onClick={this.signin}>{buttons.signInButton}</a>
    )

    const currencyChange = (
        <span className={this.props.porfolioValueChange > 0 ? 'text-success' : 'text-danger'}>
          {formatMoney(this.props.currency, this.props.porfolioValueChange)}
          {this.props.porfolioValueChange > 0 ? '↑' : '↓'}
        </span>);
    const currencyValue = (
        <h1 className="total-wallet-value">{formatMoney(this.props.currency, this.props.portfolioValue)}<br/>
          <small className="text-muted">{message.holdings}</small>
        </h1>
    )

    const currencyChangeEl = this.props.user ?  (
        <h4>
          {currencyChange}<br/>
          <small className="text-muted">Since yesterday</small>
        </h4>
    ): null;
    const header = !!this.props.user ? currencyValue : signInButton
    switch(!!this.props.user) {
      case null:
      return;
      case false:
      return (
        <div>
            <div className="text-center welcome-text">
              <h2>Welcome!</h2>
              <h2>Log in with Blockstack.</h2>
            </div>
            <div className="login-box">
        			{signInButton}
    		    </div>
          </div>
      );
      default:
       return (
         <Container>
         <div>

          <div className="container text-center">
            <h2>Dashboard</h2>
            <h4>Total Current Value</h4>
            <div>
              <Link to="/chart">
                <div>{header}</div>
              </Link>
              <div>{currencyChangeEl}</div>
            </div>
          </div>
          </div>
          <WalletList
              holdings={this.props.holdings}
              currency={this.props.currency}
              list={this.props.holdingsList}
          />
          </Container>
      );
    }

  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.coin.list,
  holdingsList: holdingsList(state),
  holdings: state.account.holdings,
  portfolioValue: portfolioValue(state),
  porfolioValueChange: porfolioValueChange(state),
  currency: state.coin.currency,
  user: state.account.user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changeCurrency,
  loadCoinList,
  signinSuccess,
  loadHoldings,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portfolio)
