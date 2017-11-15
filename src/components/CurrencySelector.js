import React from 'react';
import {FormGroup, Input} from 'reactstrap';

export default class CurrencySelector extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const currencies = [
      "USD",
      "BTC",
      "AUD",
      "BRL",
      "CAD",
      "CHF",
      "CLP",
      "CNY",
      "CZK",
      "DKK",
      "EUR",
      "GBP",
      "HKD",
      "HUF",
      "IDR",
      "ILS",
      "INR",
      "JPY",
      "KRW",
      "MXN",
      "MYR",
      "NOK",
      "NZD",
      "PHP",
      "PKR",
      "PLN",
      "RUB",
      "SEK",
      "SGD",
      "THB",
      "TRY",
      "TWD",
      "ZAR"
    ];

    const options = currencies.map((curr) => (<option key={curr} value={curr}>{curr}</option>))
    return (
        <FormGroup>
          <Input value={this.props.currency} type="select" name="select" id="currency"
                 onChange={(e) => this.props.onChange(e.target.value)}>
            {options}
          </Input>
        </FormGroup>

    )
  }
}
