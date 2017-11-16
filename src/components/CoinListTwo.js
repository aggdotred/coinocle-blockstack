import React from 'react';
import {Table} from 'reactstrap';
import CoinRowTwo from './CoinRowTwo';
import {tableMessage} from '../modules/message';
import { Link } from "react-router-dom";
import {Row, Col, Container, Button} from 'reactstrap';


export default class CoinListTwo extends React.Component {
  render() {
    const holdings = this.props.holdings || {};
    const rows = this.props.list.map((row) => <CoinRowTwo
        currency={this.props.currency}
        key={row.id}
        holdings={holdings[row.id]}
        coin={row}/>);

    return (
      <Container>
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
