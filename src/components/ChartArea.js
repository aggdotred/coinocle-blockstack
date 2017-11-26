import React from 'react';
import PriceChart from './PriceChart';
import OrderBook from './OrderBook';
import OrderBookTable from './OrderBookTable'

export default class ChartArea extends React.Component {
  constructor(props) {
    super(props)
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
        <div className="main-data row">
        <div className="charts-card col-md-12">
        <h3 className="text-center">Historical Price</h3>
        <PriceChart
            coin={this.props.coin}
            data={this.props.coinChartData}
            loadCoinChartData={this.props.loadCoinChartData}
            clearChart={this.props.clearChart}
            priceChartError={this.props.priceChartError}
        />
        </div>
        <div className="charts-card col-md-12">
          <h3 className="text-center">Order Book</h3>
          <OrderBook coin={this.props.coin} data={this.props.orderBookData}/>
        </div>
        <div className="charts-card col-md-6">
          <h4 className="text-center">Bids</h4>
          <OrderBookTable data={this.props.orderBookData.bids}/>
        </div>
        <div className="charts-card col-md-6">
          <h4 className="text-center">Asks</h4>
          <OrderBookTable data={this.props.orderBookData.asks}/>
        </div>
        </div>
    );
  }
}
