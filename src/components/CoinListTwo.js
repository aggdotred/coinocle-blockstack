import React from 'react';
import CoinRowTwo from './CoinRowTwo';
import {Container} from 'reactstrap';


export default class CoinListTwo extends React.Component {
  render() {
    const holdings = this.props.holdings || {};
    const rows = this.props.list.map((row) => <CoinRowTwo
        currency={this.props.currency}
        key={row.id}
        holdings={holdings[row.id]}
        coin={row}/>);

    return (
      <Container className="coin-grid">
        {rows}
      </Container>
    );
  }
}
// <Table className="table table-bordered table-striped table-hover">
//   <thead>
//   <tr>
//     <th>{tableMessage.asset}</th>
//     <th>{tableMessage.price}</th>
//     <th>{tableMessage.marketCap}</th>
//   </tr>
//   </thead>
//   <tbody>
//   {rows}
//   </tbody>
// </Table>
