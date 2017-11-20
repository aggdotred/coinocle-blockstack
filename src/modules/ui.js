export const INPUT_VALUE_CHANGE = 'ui/INPUT_VALUE_CHANGE';
export const INPUT_TRANSACTION_CHANGE = 'ui/INPUT_TRANSACTION_CHANGE';

const initialState = {
  holdingInput: {},
  transactionInput: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INPUT_VALUE_CHANGE:
      return {
          ...state,
        holdingInput: action.value
      }
    case INPUT_TRANSACTION_CHANGE:
      return {
          ...state,
        transactionInput: action.value
      }
    default:
      return state
  }
}

export const updateHoldingInput = (value) => {
  console.log()
  return dispatch => {
    dispatch({
      type: INPUT_VALUE_CHANGE,
      value: value
    })
  }
}

export const updateTransactionInput = (value) => {
  console.log()
  return dispatch => {
    dispatch({
      type: INPUT_TRANSACTION_CHANGE,
      value: value
    })
  }
}
