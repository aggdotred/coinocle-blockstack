import React from 'react';
import {Link} from 'react-router-dom';
import {formatMoney} from '../utils';


export default class WalletRow extends React.Component {
  render() {
    const { coin, currency, holdings }= this.props;

    const currLow = currency.toLowerCase();
    const price = coin[`price_${currLow}`];

    const value_in_currency = !!holdings && holdings > 0 ? holdings * price : 0;
    const valueElem = value_in_currency > 0 ? (
            <span>{formatMoney(currency, value_in_currency)}</span>) : null;

    return (
        <tr>
          <td><Link className="coin-link" to={`/chart/${coin.id}`}>{coin.id.charAt(0).toUpperCase() + coin.id.slice(1)}<span className="glyphicon glyphicon-stats"></span></Link></td>
          <td>
            {valueElem}
          </td>
          <td>
            <Link to={`/edit/${coin.id}`}><span className="glyphicon glyphicon-edit"></span></Link>
          </td>
        </tr>
    )
  }
}
