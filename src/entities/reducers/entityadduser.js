/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_MY_ENTITY_ADDUSER_REQUESTS = 'GET_MY_ENTITY_ADDUSER_REQUESTS'

import { get, post, put, del } from '../../../utils/APIUtils'
import _ from 'lodash'

export function getMyEntityAddUserRequests (): Action {
  return (dispatch) => {
    get('/apis/v1/myentityadduserrequests', {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_MY_ENTITY_ADDUSER_REQUESTS,
        payload: d
      })
    })
  }
}

export function confirmEntityAdduserRequest (entityId): Action {
  return (dispatch) => {
    post('/apis/v1/myentityadduserrequests', {entity_id: entityId}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'successfully confirmed the add user request... you are now a member of this entity..'}
      })
    })
  }
}

export const actions = {
  getMyEntityAddUserRequests
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_MY_ENTITY_ADDUSER_REQUESTS]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {entityadduserrequests: action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {entityadduserrequests: []}
export default function entityReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
