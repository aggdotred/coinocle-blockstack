import React from 'react';
import {Table} from 'reactstrap';
import WalletRow from './WalletRow';
import {tableMessage} from '../modules/message';
import AddWalletButton from "./AddWalletButton";


export default class WalletList extends React.Component {
  render() {

    const holdings = this.props.holdings || {};
    const rows = this.props.list.map((row) => <WalletRow
        currency={this.props.currency}
        key={row.id}
        holdings={holdings[row.id]}
        coin={row}/>);
    return (
        <div>
        <Table className="table table-bordered table-striped table-hover">
          <thead>
          <tr>
            <th></th>
            <th>Wallet Name</th>
            <th>{tableMessage.asset}</th>
            <th>{tableMessage.holdings}</th>
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </Table>
        <AddWalletButton />
        </div>
    );
  }
}
