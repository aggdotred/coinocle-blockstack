import React from 'react';
import {Link} from 'react-router-dom';
import {formatMoney} from '../utils';


export default class CoinRowTwo extends React.Component {
  render() {
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

    // TODO: reused this across all pages. currently duplicated
    const value_in_currency = !!holdings && holdings > 0 ? holdings * price : 0;
    const valueElem = value_in_currency > 0 ? (
            <span>{formatMoney(currency, value_in_currency)}</span>) : null;
    console.log(coin.id);
    return (
      <Link to={`/add/${coin.id}`}>
        <div className="col-md-2 card" value={coin.id}>
        <div className="new-coin">
          <div>{icon}</div>
          <div>{coin.symbol}</div>
          <div>{coin.id.charAt(0).toUpperCase() + coin.id.slice(1)}</div>
          <div>${price}</div>
        </div>
        </div>
      </Link>
    )
  }
}
