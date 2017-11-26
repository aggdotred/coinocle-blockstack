import React from 'react';
import {Link} from 'react-router-dom';

export default class CoinRowTwo extends React.Component {
  render() {
    const { coin, currency }= this.props;

    const currLow = currency.toLowerCase();
    const price = coin[`price_${currLow}`];

    const icon = (
        <img src={`https://files.coinmarketcap.com/static/img/coins/32x32/${coin.id}.png`} alt="coin type"/>)


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
