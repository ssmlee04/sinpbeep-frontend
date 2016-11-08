/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'

import { get, post } from '../../../utils/APIUtils'
import _ from 'lodash'

export function pushPopupMessage ({type, message}): Action {
  return {
    type: SET_SYSTEM_POPUPS,
    payload: {type, message}
  }
}

export const actions = {
  pushPopupMessage
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_SYSTEM_POPUPS]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {popups: [action.payload]})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {popups: []}
export default function systemReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
