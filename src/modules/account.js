import numeral from 'numeral';

export const SIGNIN_SUCCESS = 'account/SIGNIN_SUCCESS';
export const SIGNOUT = 'account/SIGNOUT';
export const LOAD_HOLDINGS = 'account/LOAD_HOLDINGS';
export const UPDATE_HOLDING = 'account/UPDATE_HOLDING'

export const STORAGE_FILE = 'portfo.json'

const initialState = {
  user: null,
  holdings: {},
  holdingsList: [],
  portfolioValue: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.user,
      }
    case SIGNOUT:
      return {
        ...state,
        user: null
      }
    case LOAD_HOLDINGS:
      return {
        ...state,
        holdings: action.holdings,
      }
    case UPDATE_HOLDING:
      return {
        ...state,
        holdings: action.holdings,
      }
    default:
      return state
  }
}

export const signinSuccess = (user) => {

  return dispatch => {
    dispatch({
      type: SIGNIN_SUCCESS,
      user: user
    });
  }
}

export const signout = () => {
  window.blockstack.signUserOut(window.location.href)
  // return dispatch => {
  //   dispatch({
  //     type: SIGNOUT
  //   })
  // }
}


export const loadHoldings = () => {
  return (dispatch, getState) => {
    const blockstack = window.blockstack;
    blockstack.getFile(STORAGE_FILE).then((holdings) => {
      const data = JSON.parse(holdings || '{}');
      dispatch({
        type: LOAD_HOLDINGS,
        holdings: data,
      })
    })

  }
};


export const updateHoldings = (coin, amount) => {
  return (dispatch, getState) => {
    const blockstack = window.blockstack;
    // Load holdings, update and replace all of it with the new map
    blockstack.getFile(STORAGE_FILE).then((holdings) => {
      const data = JSON.parse(holdings || '{}');
      data[coin] = amount;
      blockstack.putFile(STORAGE_FILE, JSON.stringify(data))

      dispatch({
        type: UPDATE_HOLDING,
        holdings: data,
      })

    });
  }
};


export const holdingsList = (state) => {
  // Return the list of coins which are holdings
  const holdings = state.account.holdings || {};
  return state.coin.list.filter((coin) => !!holdings[coin.id] && numeral(holdings[coin.id]).value() > 0);
}

export const portfolioValue = (state) => {
  const holdings = state.account.holdings;
  const currency = state.coin.currency.toLowerCase();
  const holdingCoins = holdingsList(state)

  return holdingCoins.reduce((total, coin) => {
    return total + numeral(holdings[coin.id]).value() * numeral(coin['price_' + currency]).value();
  }, 0);
};

export const porfolioValueChange = (state) => {
  const list = holdingsList(state);
  const holdings = state.account.holdings;
  const currency = state.coin.currency.toLowerCase();

  return list.reduce((total, coin) => {
    const price = numeral(coin['price_' + currency]).value()
    const perc_change = numeral(coin['percent_change_24h']).value() / 100;
    const holding = numeral(holdings[coin.id]).value()

    const change = price * perc_change * holding;
    return total + change;
  }, 0)
}

export const derived_holdings = (state) => {
  // this method creates the
}
