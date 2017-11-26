import React from 'react';
import {Table} from 'reactstrap';
import WalletRow from './WalletRow';
import {Container} from 'reactstrap';
import AddWalletButton from "./AddWalletButton";
import { Link } from "react-router-dom";


export default class WalletList extends React.Component {

  render() {
    const holdings = this.props.holdings || {};
    const rows = this.props.list.map((row) => <WalletRow
        currency={this.props.currency}
        key={row.id}
        holdings={holdings[row.id]}
        coin={row}/>);

    return (
        <Container>
        <h3 className="text-center">Holdings</h3>
        <Table className="table table-bordered table-striped table-hover">
          <thead>
          <tr>
            <th><strong>Coin</strong></th>
            <th><strong>Current Value</strong></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><Link to={"/coin/new"} className="addAWallet">
                Add a new coin
              </Link></td>
            <td className="empty-state">$0.00</td>
            <td></td>
          </tr>
          {rows}
          </tbody>
        </Table>
        <AddWalletButton />
        </Container>
    );
  }
}
