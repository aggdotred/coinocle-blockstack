import React from 'react';
import {Row, Col, Container, Button} from 'reactstrap';
import Tabs from '../components/Tabs';
import CurrencySelector from '../components/CurrencySelector';
import CurrencySearch from '../components/CryptoCurrencySearch'; // Import Currency Search Bar for easier access.
import {bindActionCreators} from 'redux';
import {Table} from 'reactstrap';
import WalletRow from '../components/WalletRow';
import {tableMessage} from '../modules/message';
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
import { Link } from "react-router-dom";
import {formatMoney} from '../utils';
import {message,
        buttons
} from '../modules/message';

class NewWallet extends React.Component {
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

    const { coin, currency, holdings }= this.props;

    const currLow = currency.toLowerCase();
    const price = coin[`price_${currLow}`];
    const formatted_price = formatMoney(currency, price);
    const marketCap = formatMoney(currency, coin[`market_cap_${currLow}`], '0.0a');


    const changeColor = +coin.percent_change_24h > 0 ? "text-success" : "text-danger";
    const coinPerc = +coin.percent_change_24h > 0 ? "+" + coin.percent_change_24h : coin.percent_change_24h;

    const holdingElem = holdings && holdings > 0 ? (<span>{holdings} {coin.symbol}</span>) : (
            <span>-</span>);
    const icon = (
        <img src={`https://files.coinmarketcap.com/static/img/coins/32x32/${coin.id}.png`}/>)

    const rows = this.props.list.map((row) => <WalletRow
        currency={this.props.currency}
        key={row.id}
        coin={row}/>);

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
            <h2>Add a new Wallet</h2>
            <h3>Select Currency</h3>
            <Table className="table table-bordered table-striped table-hover">
              <thead>
              <tr>
                <th></th>
                <th>{tableMessage.asset}</th>
              </tr>
              </thead>
              <tbody>
              <td>{icon}</td>
              <td><Link to={`/coin/${coin.id}`}><h4>{coin.symbol}</h4></Link></td>
              </tbody>
            </Table>
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
)(NewWallet)
