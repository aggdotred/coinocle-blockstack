import React from 'react';
import {Row, Col, Container} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CoinHoldingBox from '../components/CoinHoldingBox';
import {updateHoldings} from '../modules/account';
import {coinPage, hourlyChanges} from '../modules/message';
import {loadCoin, loadCoinChartData, clearChart, loadOrderBook} from '../modules/coin';
import {updateHoldingInput} from '../modules/ui';
import numeral from 'numeral';
import CoinChartSection from '../components/CoinChartSection';
import {formatMoney} from '../utils';

class Chart extends React.Component {
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
        <Container>
          <Row className="mt-3">
            <Col>
              <Link to="/">{coinPage.back}</Link>
            </Col>
          </Row>
          <Row className="mt-3 mb-3">
            <Col>

              <h2>{coin.name}</h2>
            </Col>
          </Row>
          <Row>
            <Col xs="6" sm="8" md="4">
              <CoinHoldingBox
                  coin={coin}
                  value={amount}
                  holdingInput={this.props.holdingInput}
                  updateHoldingInput={this.props.updateHoldingInput}
                  onSave={this.props.updateHoldings}
                  user={this.props.user}
                  signin={this.signin}
              />
            </Col>
            <Col>
              <h4>{formatMoney(currency, value_in_currency)}
                <small className="text-muted"><br/>{coinPage.holdings}</small>
              </h4>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h5>
                {coinPage.price}<br/>
                <small className="text-muted">{formatMoney(currency, price)}</small>
              </h5>
            </Col>
            <Col>
              <h5>
                {coinPage.marketCap}<br/>
                <small className="text-muted">{market_cap} {currency}</small>
              </h5>
            </Col>
            <Col>
              <h5>
                {coinPage.volume}<br/>
                <small className="text-muted">{volume} {currency}</small>
              </h5>
            </Col>
            <Col>
              <div className={change_1h < 0 ? "text-danger" : "text-success"}>
                {hourlyChanges.one} {change_1h}%
              </div>
              <div className={change_24h < 0 ? "text-danger" : "text-success"}>
                {hourlyChanges.twentyFour} {change_24h}%
              </div>
              <div className={change_7d < 0 ? "text-danger" : "text-success"}>
                {hourlyChanges.sevenDays} {change_7d}%
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <CoinChartSection
                  coinChartData={this.props.coinChartData}
                  coin={this.props.coin}
                  loadCoinChartData={this.props.loadCoinChartData}
                  clearChart={this.props.clearChart}
                  orderBookData={this.props.orderBookData}
                  loadOrderBook={this.props.loadOrderBook}
                  priceChartError={this.props.priceChartError}
              />
            </Col>
          </Row>
        </Container>
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
)(Chart)
