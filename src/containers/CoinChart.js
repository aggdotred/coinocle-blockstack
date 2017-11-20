import React from 'react';
import {Row, Col, Container} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CoinHoldingBox from '../components/CoinHoldingBox';
import { Line } from "react-chartjs-2";
import {updateHoldings} from '../modules/account';
import {coinPage, hourlyChanges} from '../modules/message';
import {loadCoin, loadCoinChartData, clearChart, loadOrderBook} from '../modules/coin';
import {updateHoldingInput} from '../modules/ui';
import numeral from 'numeral';
import PriceChart from '../components/PriceChart';
import ChartArea from '../components/ChartArea';
import {formatMoney} from '../utils';
class CoinChart extends React.Component {
  static PropTypes = {}

  componentDidMount() {
    this.props.loadCoin(this.props.match.params.coin, this.props.currency);
  }

  signin() {
    const blockstack = window.blockstack;
    blockstack.redirectToSignIn();
  }

  render() {

    const props = this.props;
    const coin = props.coin;
    const holdings = props.holdings;
    const amount = !!coin && coin.id && holdings && holdings[coin.id] ? holdings[coin.id] : 0;
    const currency = this.props.currency;
    const price = coin['price_' + currency.toLowerCase()];
    const value_in_currency = !!amount ? amount * price : 0;
    const market_cap = numeral(coin['market_cap_' + currency.toLowerCase()]).format('0.0a');
    const volume = numeral(coin['24h_volume_' + currency.toLowerCase()]).format('0.0a');
    const change_1h = numeral(coin['percent_change_1h']).value();
    const change_24h = numeral(coin['percent_change_24h']).value();
    const change_7d = numeral(coin['percent_change_7d']).value();

    return (
          <div>
            <h1>{coin.name}</h1>

            <h3>{formatMoney(currency, value_in_currency)}
              <small className="text-muted"><br/>Portfolio Value</small>
            </h3>
            <h4>{this.props.value}</h4>
            <div className="marquee">
            <p id="ticker-span"><span className="ticker-span" className={change_1h < 0 ? "text-danger" : "text-success"}>Hourly Change: {change_1h}%</span>  <span className="ticker-span" className={change_24h < 0 ? "text-danger" : "text-success"}>Daily Change: {change_24h}%</span>  <span className="ticker-span" className={change_7d < 0 ? "text-danger" : "text-success"}>Weekly Change: {change_7d}%</span></p>
            </div>

          <div className="row coin-data">
            <div className="col-md-4">
              <h4>
                {coinPage.price}<br/>
                <small className="text-muted">{formatMoney(currency, price)}</small>
              </h4>
            </div>
            <div className="col-md-4">
              <h4>
                {coinPage.marketCap}<br/>
                <small className="text-muted">{market_cap} {currency}</small>
              </h4>
            </div>
            <div className="col-md-4">
              <h4>
                {coinPage.volume}<br/>
                <small className="text-muted">{volume} {currency}</small>
              </h4>
            </div>

          </div>

              <ChartArea
                  coinChartData={this.props.coinChartData}
                  coin={this.props.coin}
                  loadCoinChartData={this.props.loadCoinChartData}
                  clearChart={this.props.clearChart}
                  orderBookData={this.props.orderBookData}
                  loadOrderBook={this.props.loadOrderBook}
                  priceChartError={this.props.priceChartError}
              />

        </div>
    )
  }
}

const mapStateToProps = state => ({
  coin: state.coin.selected,
  holdings: state.account.holdings,
  holdingInput: state.ui.holdingInput,
  currency: state.coin.currency,
  user: state.account.user,
  coinChartData: state.coin.chartData,
  orderBookData: state.coin.orderBookData,
  priceChartError: state.coin.priceChartError,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadCoin,
  loadCoinChartData,
  loadOrderBook,
  updateHoldings,
  updateHoldingInput,
  clearChart,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoinChart)
