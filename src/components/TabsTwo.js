import React from 'react';
import CoinListTwo from './CoinListTwo';

export default class TabsTwo extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {

    return (
        <div className="container">
        <h3>Add a New Holding</h3>
        <h4>Select a Coin</h4>
          <CoinListTwo
              holdings={this.props.holdings}
              currency={this.props.currency}
              list={this.props.list}
          />
        </div>
    );
  }
}
