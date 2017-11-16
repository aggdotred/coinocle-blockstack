export const INPUT_VALUE_CHANGE = 'ui/INPUT_VALUE_CHANGE'

const initialState = {
  holdingInput: {
    walletName: "",
    coins: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INPUT_VALUE_CHANGE:
      return {
          ...state,
        holdingInput: action.value
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
