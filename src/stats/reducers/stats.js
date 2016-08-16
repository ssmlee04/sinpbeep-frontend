/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_STATS = 'GET_STATS'
import statsService from '../../stats/services/stats'
import _ from 'lodash'
import localStorageOrAPICall from '../../../utils/localStorageOrAPICall'

export function getStats (): Action {
  return (dispatch) => {
    localStorageOrAPICall('stats', statsService.get)
    .then(function(d) {
      dispatch({
        type: GET_STATS,
        payload: d
      })
    })
  }
}

export const actions = {
  getStats
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_STATS]: (state: obj, action: {payload: array}): obj => _.extend({}, state, {stats: action.payload}),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {stats: [], stat: {}}
export default function statsReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
