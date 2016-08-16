/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
// export const GET_MY_ENTITY = 'GET_MY_ENTITY'

import { get, post, put, del } from '../../../utils/APIUtils'
import _ from 'lodash'
export const GET_MONEYS_AGGREGATE_INFO = 'GET_MONEYS_AGGREGATE_INFO'
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_MONEYS = 'GET_MONEYS'

export function getMoneys ({user_id}): Action {
  return (dispatch) => {
    get('/apis/v1/moneys', {user_id}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_MONEYS,
        payload: d || []
      })
    })
  }
}

export function getAllMoneyInfo (): Action {
  return (dispatch) => {
    get('/apis/v1/moneys/calculate', {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_MONEYS_AGGREGATE_INFO,
        payload: d
      })
    })
  }
}

export const actions = {
  getMoneys
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_MONEYS]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {moneys: action.payload}),
  [GET_MONEYS_AGGREGATE_INFO]: (state: obj, action: {payload: string}): obj => _.extend({}, state, action.payload),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {moneys: []}
export default function moneyReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
