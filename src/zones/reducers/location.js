/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_LOCATION = 'GET_LOCATION'
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'

import { get, put } from '../../../utils/APIUtils'
import _ from 'lodash'

export function getLocation (lon, lat): Action {
  return (dispatch) => {
    get(`/apis/v1/locate/${lon}/${lat}`, {}, {}, (err, d) => {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_LOCATION,
        payload: d
      })
    })
  }
}

export function setLocation (lon, lat, {zname, sname, cname}): Action {
  return (dispatch) => {
    put(`/apis/v1/locate/${lon}/${lat}`, {zname, sname, cname}, {}, {}, (err, d) => {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully set the location info'}
      })
    })
  }
}

export const actions = {
  getLocation, setLocation
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_LOCATION]: (state: obj, action: {payload: array}): obj => _.extend({}, state, {location: action.payload}),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {location: {}}
export default function locationReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
