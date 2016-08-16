/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_CURRENCIES = 'GET_CURRENCIES'
import currencyService from '../../currency/services/currency'
import _ from 'lodash'
import localStorageOrAPICall from '../../../utils/localStorageOrAPICall'

export function getCurrencies (): Action {
  return (dispatch) => {
    localStorageOrAPICall('industry', currencyService.get)
    .then(function(d){
      dispatch({
        type: GET_CURRENCIES,
        payload: d
      })
    })
  }
}

export const actions = {
  getCurrencies
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_CURRENCIES]: (state: obj, action: {payload: array}): obj => _.extend({}, state, {currencies: action.payload}),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {currency: 'USD', currencies: []}
export default function currencyReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
