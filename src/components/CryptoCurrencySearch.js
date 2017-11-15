// Search for a specific Crypto Currency
// This File Still Does Not Work with the Main Application and is Broken for Now.
import React from 'react';
import numeral from 'numeral';
import { FormGroup, Input } from 'reactstrap';
import { coinSearch } from '../modules/message';
import { loadCoin } from '../modules/coin'; // Import loadCoinList 3rd Party API to use for Coin Search.

export default class CurrencySearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''}
		this.update = this.update.bind(this);
	}

	componentDidMount() {
		{/* Add loadCoin functionality and figure out why it continuously breaks the app. */}
	}

	update(event) {
		this.setState({
			value: event.target.value,
		})
	}

	render() {
    const props = this.props;
    const coin = props.coin;
    const holdings = props.holdings;
    const currency = this.props.currency;
    const amount = !!coin && coin.id && holdings && holdings[coin.id] ? holdings[coin.id] : 0;

		return (
			<div>
				<SearchBox txt={this.state.value}
					update={this.update}/>
				<SearchResults result={this.state.results}/>
			</div>
		)
	}
}

const SearchBox = (props) => {
	return (
		<div id="searchbox">
		<input type="text" onChange={props.update} />
		</div>
	);
}

const SearchResults = (props) => {
	return (
		<div id="results">
			<p className="center">{coinSearch.search}</p>
		</div>
	)
}
