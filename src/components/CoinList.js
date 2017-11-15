import React from 'react';
import {Table} from 'reactstrap';
import CoinRow from './CoinRow';
import {tableMessage} from '../modules/message';


export default class CoinList extends React.Component {
  render() {

    const holdings = this.props.holdings || {};
    const rows = this.props.list.map((row) => <CoinRow
        currency={this.props.currency}
        key={row.id}
        holdings={holdings[row.id]}
        coin={row}/>);
    return (
        <Table>
          <thead>
          <tr>
            <th></th>
            <th>{tableMessage.asset}</th>
            <th>{tableMessage.price}</th>
            <th>{tableMessage.marketCap}</th>
            <th>{tableMessage.change}</th>
            <th>{tableMessage.holdings}</th>
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </Table>
    );
  }
}
