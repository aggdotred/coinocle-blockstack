import React from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button} from 'reactstrap';
import classnames from 'classnames';
import CoinList from './CoinList';
import NewsList from './NewsList';
import Loading from './Loading';
import {message, tabs} from '../modules/message';

export default class Tabs extends React.Component {
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

    const emptyState = (
        <div className="text-center mt-4">
          <p>{message.holdingMessage}</p>
        </div>
    );

    const emptyNews = (
      <div className="text-center mt-4">
        <p>{message.newsMessage}</p>
      </div>
    );

    const newsList = this.props.holdingsList.length > 0 ? (
      <NewsList />
    ) : emptyNews;


    const holdingContent = this.props.holdingsList.length > 0 ? (
            <CoinList
                holdings={this.props.holdings}
                currency={this.props.currency}
                list={this.props.holdingsList}
            />) : emptyState;
    const holdingsTabLoading = !this.props.user || this.props.holdingsList.length > 0 ? null :
        <Loading />
    return (
        <div className="container">
          <Nav tabs className="nav-pills">
            <NavItem>
              {/* Coins/Cryptoassets Tab */}
              <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => {
                    this.toggle('1');
                  }}
              >
                {tabs.cryptoAssets}
              </NavLink>
            </NavItem>
            <NavItem>
              {/* Personal Crypto Portfolio */}
              <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => {
                    this.toggle('2');
                  }}
              >
                {tabs.holdings} {holdingsTabLoading}
              </NavLink>
            </NavItem>
            <NavItem>
              {/* News Tab */}
              <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => {
                    this.toggle('3');
                  }}
              >
                {tabs.news}
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <CoinList
                      holdings={this.props.holdings}
                      currency={this.props.currency}
                      list={this.props.list}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  {holdingContent}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  {newsList}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
    );
  }
}
