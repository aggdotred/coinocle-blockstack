import React from 'react';
import {Row, Col, Container, Button} from 'reactstrap';
import Tabs from '../components/Tabs';
import CurrencySelector from '../components/CurrencySelector';
import CurrencySearch from '../components/CryptoCurrencySearch'; // Import Currency Search Bar for easier access.
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import axios from "axios";
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

class Chart extends React.Component {
  constructor() {
    super();
    this.state = {
      btc: "",
      ltc: "",
      eth: "",
      bch: "",
      bcc: "",
      etc: "",
      dash: "",
      xmr: "",
      zec: "",
      xrp: "",
      neo: "",
      miota: "",
      xem: "",
      lsk: "",
      qtum: "",
      hsr: "",
      eos: "",
      omg: "",
      ada: "",
      usdt: ""
    };
  }


  componentWillMount() {
    this.getData = () => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,BCC,BCH,ETH,ETC,LTC,DASH,XMR,ZEC,XRP,NEO,MIOTA,XEM,LSK,QTUM,HSR,EOS,OMG,ADA,USDT&tsyms=USD,EUR,JPY,GBP,CHF,CAD,AUD,NZD,ZAR,CNY"
      )
      .then(res => {
        this.setState({ btc: res.data.BTC.USD });
        this.setState({ eth: res.data.ETH.USD });
        this.setState({ bch: res.data.BCH.USD });
        this.setState({ ltc: res.data.LTC.USD });
        this.setState({ bcc: res.data.BCC.USD });
        this.setState({ etc: res.data.ETC.USD });
        this.setState({ dash: res.data.DASH.USD });
        this.setState({ xmr: res.data.XMR.USD });
        this.setState({ zec: res.data.ZEC.USD });
        this.setState({ xrp: res.data.XRP.USD });
        this.setState({ neo: res.data.NEO.USD });
        this.setState({ miota: res.data.IOTA.USD });
        this.setState({ xem: res.data.XEM.USD });
        this.setState({ lsk: res.data.LSK.USD });
        this.setState({ qtum: res.data.QTUM.USD });
        this.setState({ hsr: res.data.HSR.USD });
        this.setState({ eos: res.data.EOS.USD });
        this.setState({ omg: res.data.OMG.USD });
        this.setState({ ada: res.data.ADA.USD });
        this.setState({ usdt: res.data.USDT.USD });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

  static PropTypes = {}


  signin() {
    const blockstack = window.blockstack
    blockstack.redirectToSignIn()
  }

  onCurrencyChange(currency) {
    this.props.changeCurrency(currency);
    this.props.loadCoinList(currency);
  }

  componentDidMount() {
    this.getData();
    this.refresh = setInterval(() => this.getData(), 5000);
  }

  renderContent() {
    
    const port = this.props.holdingsList;
    const names = port.map(function(item) {
      return item.name;
    });
    const transactionData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Fees',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [2.18, 1.27, 3.89, 1.04, 5.23, 0.98, 3.83]
        }
      ]
    }

    const price = "";
    const bitcoin = parseFloat(this.props.holdings.bitcoin) * this.state.btc;
    const ethereum = parseFloat(this.props.holdings.ethereum) * this.state.eth;
    const bitcash = parseFloat(this.props.holdings["bitcoin-cash"]) * this.state.bcc;
    const iota = parseFloat(this.props.holdings.iota) * this.state.iota;
    const litecoin = parseFloat(this.props.holdings.litecoin) * this.state.ltc;
    const etc = parseFloat(this.props.holdings["ethereum-classic"]) * this.state.etc;
    const dash = parseFloat(this.props.holdings.dash) * this.state.dash;
    const xmr = parseFloat(this.props.holdings.monero) * this.state.xmr;
    const zec = parseFloat(this.props.holdings.zcash) * this.state.zec;
    const ripple = parseFloat(this.props.holdings.ripple) * this.state.xrp;
    const neo = parseFloat(this.props.holdings.neo) * this.state.neo;
    const nem = parseFloat(this.props.holdings.nem) * this.state.xem;
    const lisk = parseFloat(this.props.holdings.lisk) * this.state.lsk;
    const qtum = parseFloat(this.props.holdings.qtum) * this.state.qtum;
    const hshare = parseFloat(this.props.holdings.hshare) * this.state.hsr;
    const eos = parseFloat(this.props.holdings.eos) * this.state.eos;
    const omg = parseFloat(this.props.holdings.omisego) * this.state.omg;
    const ada = parseFloat(this.props.holdings.cardano) * this.state.ada;
    const usdt = parseFloat(this.props.holdings.usdt) * this.state.usdt;

    const portfolio = [
      bitcoin, ethereum, bitcash, iota, litecoin, etc, dash, xmr, zec, ripple, neo, nem, lisk, qtum, hshare, eos, omg, ada, usdt
    ]
    const newData = {
      labels: names,
      datasets: [
        {
          data: portfolio,
          backgroundColor: ["#F2A900", "#3C3C3D", "#88CBF5", 'rgba(75,192,192,0.4)'],
          hoverBackgroundColor: ["#00cc66", "#00cc66", "#00cc66"]
        }
      ]
    };


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
          <div className="row">
            <div className=" card-1 col-md-6">
              <h2 className="text-center">Portolio Value</h2>
              <Doughnut data={newData} />
            </div>
            <div className=" card-1 col-md-6">
              <h2 className="text-center">Fees Over Time</h2>
              <Line data={transactionData} />
            </div>
          </div>
         </Container>
      );
    }

  }

  render() {

    return (
      <div>
      <Container>
      <h2 className="text-center">Recent Transactions</h2>
      <table className="table table-bordered table-striped table-hover">
        <thead>
        <tr>
          <td>Date</td>
          <td>Buy/Sell</td>
          <td>Coin</td>
          <td>Amount</td>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td>08/12/2017</td>
            <td>Buy</td>
            <td>Bitcoin</td>
            <td>0.003</td>
          </tr>
          <tr>
            <td>08/30/2017</td>
            <td>Buy</td>
            <td>Ethereum</td>
            <td>0.06</td>
          </tr>
          <tr>
            <td>09/05/2017</td>
            <td>Sell</td>
            <td>DASH</td>
            <td>4.1</td>
          </tr>
          <tr>
            <td>09/20/2017</td>
            <td>Buy</td>
            <td>Ripple</td>
            <td>200.52</td>
          </tr>
        </tbody>
      </table>
      </Container>
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
)(Chart)
