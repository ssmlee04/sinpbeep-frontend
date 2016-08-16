/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
// export const GET_MY_ENTITY = 'GET_MY_ENTITY'

import { get, post, put, del } from '../../../utils/APIUtils'
import _ from 'lodash'
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_COUPONUSES = 'GET_COUPONUSES'

export function getCouponuses ({entity_id, status, owner_id, user_id}): Action {
  return (dispatch) => {
    console.log([entity_id, status, owner_id, user_id]);
    console.log([entity_id, status, owner_id, user_id]);
    console.log([entity_id, status, owner_id, user_id]);
    get('/apis/v1/couponuse', {entity_id, status, owner_id, user_id}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_COUPONUSES,
        payload: d
      })
    })
  }
}

export function processCouponuse (secret) {
  return (dispatch) => {
    post(`/apis/v1/couponuse/${secret}`, {}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'process coupons use success'}
      })
    })
  }
}

export const actions = {
  getCouponuses
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_COUPONUSES]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {couponuses: action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {couponuses: []}
export default function couponReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
