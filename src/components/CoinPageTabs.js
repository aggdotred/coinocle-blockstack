import React from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button} from 'reactstrap';
import classnames from 'classnames';
import PriceChart from './PriceChart';
import OrderBook from './OrderBook';
import OrderBookTable from './OrderBookTable'
import {orderBook} from '../modules/message';

export default class CoinPageTabs extends React.Component {
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
        <div className="container">
          <Nav tabs>
            <NavItem>
              <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => {
                    this.toggle('1');
                  }}
              >
                {orderBook.price}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => {
                    this.toggle('2');
                  }}
              >
                {orderBook.orderbook}
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <PriceChart
                      coin={this.props.coin}
                      data={this.props.coinChartData}
                      loadCoinChartData={this.props.loadCoinChartData}
                      clearChart={this.props.clearChart}
                      priceChartError={this.props.priceChartError}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <Col>
                    <OrderBook coin={this.props.coin} data={this.props.orderBookData}/>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col><hr/></Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <h5>{orderBook.bids}</h5>
                  <OrderBookTable data={this.props.orderBookData.bids}/>
                </Col>
                <Col>
                  <h5>{orderBook.asks}</h5>
                  <OrderBookTable data={this.props.orderBookData.asks}/>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
    );
  }
}
