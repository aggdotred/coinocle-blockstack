import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import account from './account';
import coin from './coin';
import ui from './ui'

export default combineReducers({
  routing: routerReducer,
  counter,
  account,
  coin,
  ui,
})
