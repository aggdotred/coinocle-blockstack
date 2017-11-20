import React from 'react';
import {Row, Col, Container} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import TransactionFileAdd from '../components/TransactionFileAdd';
import {updateTransactions} from '../modules/account';
import {coinPage, hourlyChanges} from '../modules/message';
import {loadCoin, loadCoinChartData, clearChart, loadOrderBook} from '../modules/coin';
import {updateTransactionInput} from '../modules/ui';
import numeral from 'numeral';
import {formatMoney} from '../utils';

class AddTransaction extends React.Component {
  static PropTypes = {}

  componentDidMount() {
    // this.props.loadCoin(this.props.match.params.coin, this.props.currency);
  }

  signin() {
    const blockstack = window.blockstack;
    blockstack.redirectToSignIn();
  }

  render() {

    const props = this.props;
    const date = props.date;
    const transactions = props.transactions;

    // const currency = this.props.currency;
    // const price = coin['price_' + currency.toLowerCase()];
    // const value_in_currency = !!amount ? amount * price : 0;
    // const market_cap = numeral(coin['market_cap_' + currency.toLowerCase()]).format('0.0a');
    // const volume = numeral(coin['24h_volume_' + currency.toLowerCase()]).format('0.0a');
    // const change_1h = numeral(coin['percent_change_1h']).value();
    // const change_24h = numeral(coin['percent_change_24h']).value();
    // const change_7d = numeral(coin['percent_change_7d']).value();

    return (
        <div>
        <h3>Enter Date and Transaction Details</h3>
        <TransactionFileAdd
            date={date}
            value="something"
            transactionInput={this.props.transactionInput}
            updateTransactionInput={this.props.updateTransactionInput}
            onSave={this.props.updateTransactions}
            user={this.props.user}
            signin={this.signin}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  transactions: state.account.transactions,
  transactionInput: state.ui.transactionInput,
  user: state.account.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTransactions,
  updateTransactionInput
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTransaction)
