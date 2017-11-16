// Actions
export const LOAD_COINS = 'coin/LOAD_COINS';
export const LOAD_COIN_LIST_SUCCESS = 'coin/LOAD_COIN_LIST_SUCCESS';
export const LOAD_COIN_SUCCESS = 'coin/LOAD_COIN_SUCCESS';
export const CHANGE_CURRENCY = 'coin/CHANGE_CURRENCY';
export const LOAD_COIN_CHART_DATA_SUCCESS = 'coin/LOAD_COIN_CHART_DATA_SUCCESS';
export const LOAD_ORDER_BOOK_SUCCESS = 'coin/LOAD_ORDER_BOOK_SUCCESS';
export const CHART_DATA_ERROR = 'coin/CHART_DATA_ERROR';

// Constants
export const PRICE_CHART_ERROR_DATA_NA = 'data_na';

const POLONIEX_PAIR = {
  BTC: 'USDT_BTC',
  ETH: 'USDT_ETH',
  XRP: 'USDT_XRP',
  BCH: 'USDT_BCH',
  LTC: 'USDT_LTC',
  DASH: 'USDT_DASH',
  XEM: 'BTC_XEM',
  NEO: 'BTC_NEOS',
  XMR: 'USDT_XMR',
  ETC: 'USDT_ETC',
  BCC: 'BTC_BCC',
  ZEC: 'USDT_ZEC',

};

// State
const initialState = {
  list: [],
  chartData: [],
  orderBookData: { asks: [], bids: [] },
  selected: {},
  currency: 'USD',
  pair: '',
  priceChartError: null // the key to the object PRICE_CHART_ERRORS
}
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COIN_LIST_SUCCESS:
      return {
        ...state,
        list: action.data
      };
    case LOAD_COIN_SUCCESS:
      return {
        ...state,
        selected: action.selected,
        pair: action.selected['symbol'] + state.currency,
      };
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: action.currency,
      };
    case LOAD_COIN_CHART_DATA_SUCCESS:
      return {
        ...state,
        chartData: action.data,
        priceChartError: null
      };
    case LOAD_ORDER_BOOK_SUCCESS:
      return {
        ...state,
        orderBookData: action.data,
      };
    case CHART_DATA_ERROR:
      return {
        ...state,
        priceChartError: action.key
      };
    default:
      return state
  }
}

export const loadCoinList = (curr = '') => {
  return (dispatch, getState) => {
    // now load coins and then dispatch
    if (!curr) {
      curr = getState().coin.currency;
    }
    window.axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=20&convert=${curr}`).then((response) => {
      dispatch({
        type: LOAD_COIN_LIST_SUCCESS,
        data: response.data
      })
    }).catch(function (error) {
      console.log(error);
    });
  }
};

export const loadCoin = (id, curr = '') => {
  return dispatch => {
    // now load coins and then dispatch
    window.axios.get(`https://api.coinmarketcap.com/v1/ticker/${id}/?convert=${curr}`).then((response) => {
      const coin = response.data[0];
      dispatch({
        type: LOAD_COIN_SUCCESS,
        selected: coin
      });

      dispatch(loadCoinChartData(coin.symbol, 14400));
      dispatch(loadOrderBook(coin.symbol));

    }).catch(function (error) {
      console.log(error);
    });
  }
};

export const changeCurrency = (curr) => {
  return dispatch => {
    dispatch({
      type: CHANGE_CURRENCY,
      currency: curr
    })
  }
};


export const loadCoinChartData = (coin, period) => {
  return dispatch => {
    const pair = POLONIEX_PAIR[coin];
    if (!pair) {
      dispatch({
        type: CHART_DATA_ERROR,
        key: PRICE_CHART_ERROR_DATA_NA,
      });
      return;
    }
    const now = new Date().getTime()
    //400 data points
    const start = (now - 400 * period * 1000) / 1000;
    // TODO: adjust the
    window.axios.get(`https://poloniex.com/public?command=returnChartData&currencyPair=${pair}&start=${start}&end=9999999999&period=${period}`).then((response) => {
      if (response.data.error) {
        // TODO: Handle the error in a better way
        dispatch({
          type: LOAD_COIN_CHART_DATA_SUCCESS,
          data: []
        })
      } else {
        dispatch({
          type: LOAD_COIN_CHART_DATA_SUCCESS,
          data: response.data
        })
      }
    })
  }
};

export const clearChart = () => {
  return dispatch => {
    dispatch({
      type: LOAD_COIN_CHART_DATA_SUCCESS,
      data: [] // success with an empty list
    })
  }
};

export const loadOrderBook = (coin) => {

  return dispatch => {
    const pair = POLONIEX_PAIR[coin];
    window.axios.get(`https://poloniex.com/public?command=returnOrderBook&currencyPair=${pair}&depth=200`).then((response) => {
      if (response.data.error) {
        // TODO: Handle the error in a better way
        dispatch({
          type: LOAD_ORDER_BOOK_SUCCESS,
          data: { asks: [], bids: [] }
        })
      } else {
        dispatch({
          type: LOAD_ORDER_BOOK_SUCCESS,
          data: response.data
        })
      }
    })
  }
}
