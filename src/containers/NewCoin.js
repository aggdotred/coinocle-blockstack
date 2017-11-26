import React from 'react';
import {Container} from 'reactstrap';
import TabsTwo from '../components/TabsTwo';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeCurrency, loadCoinList} from '../modules/coin';
import {
  holdingsList,
  portfolioValue,
  porfolioValueChange,
  signinSuccess,
  loadHoldings
} from '../modules/account';
import {
        buttons
} from '../modules/message';

class NewCoin extends React.Component {
  static PropTypes = {}

  signin() {
    const blockstack = window.blockstack
    blockstack.redirectToSignIn()
  }

  onCurrencyChange(currency) {
    this.props.changeCurrency(currency);
    this.props.loadCoinList(currency);
  }

  renderContent() {
    const signInButton = (
        <a className="social-button" id="blockstack-connect" onClick={this.signin}>{buttons.signInButton}</a>
    )

    switch(!!this.props.user) {
      case null:
      return;
      case false:
      return (
        <div>
            <div className="text-center welcome-text">
              <h2>Welcome!</h2>
              <h2>Log in with Blockstack.</h2>
            </div>
            <div className="login-box">
        			{signInButton}
    		    </div>
          </div>
      );
      default:
       return (
         <Container>
            <TabsTwo
                user={this.props.user}
                currency={this.props.currency}
                list={this.props.list}
                holdingsList={this.props.holdingsList}
                holdings={this.props.holdings}
                signin={this.signin}
            />
          </Container>
      );
    }

  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.coin.list,
  holdingsList: holdingsList(state),
  holdings: state.account.holdings,
  portfolioValue: portfolioValue(state),
  porfolioValueChange: porfolioValueChange(state),
  currency: state.coin.currency,
  user: state.account.user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changeCurrency,
  loadCoinList,
  signinSuccess,
  loadHoldings,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewCoin)
