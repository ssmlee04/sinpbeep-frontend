/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_ZONES = 'GET_ZONES'

import { get, post } from '../../../utils/APIUtils';
import _ from 'lodash';

export function getZones (): Action {
  return (dispatch) => {
    get('/apis/v1/zone/locations', {lang: 'en'}, {}, (err, d) => {
      if (err) {
        return
      }
      dispatch({
        type: GET_ZONES,
        payload: d
      })
    });
  }
}

export const actions = {
  getZones
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ZONES]: (state: obj, action: {payload: array}): obj => _.extend({}, state, {zones: action.payload}),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {zones: []}
export default function zoneReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
