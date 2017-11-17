import React from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button} from 'reactstrap';
import classnames from 'classnames';
import CoinListTwo from './CoinListTwo';
import NewsList from './NewsList';
import Loading from './Loading';
import {message, tabs} from '../modules/message';

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
            <CoinListTwo
                holdings={this.props.holdings}
                currency={this.props.currency}
                list={this.props.holdingsList}
            />) : emptyState;
    const holdingsTabLoading = !this.props.user || this.props.holdingsList.length > 0 ? null :
        <Loading />
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
