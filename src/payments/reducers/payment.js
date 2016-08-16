/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
// export const GET_MY_ENTITY = 'GET_MY_ENTITY'

import { get, post, put, del } from '../../../utils/APIUtils'
import _ from 'lodash'
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_PAYMENT = 'GET_PAYMENT'
export const GET_DEPOSITS = 'GET_DEPOSITS'

export function getPayment ({paymentId}): Action {
  return (dispatch) => {
    get(`/apis/v1/deposits/${paymentId}`, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_PAYMENT,
        payload: d
      })
    })
  }
}

export function getDeposits ({status}): Action {
  return (dispatch) => {
    get(`/apis/v1/deposits`, {status}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_DEPOSITS,
        payload: d
      })
    })
  }
}
// export function verifyPayment ({paymentId}): Action {
//   return (dispatch) => {
//     post(`/apis/v1/events/00000000/checkoutcoupon/`, {paymentId}, {}, {}, function (err, d) {
//       if (err) {
//         dispatch({
//           type: SET_SYSTEM_POPUPS,
//           payload: {type: 'error', message: err.error}
//         })
//         return
//       }
//       dispatch({
//         type: SET_SYSTEM_POPUPS,
//         payload: {type: 'success', message: 'payment is verified'}
//       })
//     })
//   }
// }

export function submitStripePayment ({paymentId, token}): Action {
  return (dispatch) => {
    post(`/apis/v1/deposits/${paymentId}/checkout`, {stripeToken: token}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'stripe payment is verified'}
      })
    })
  }
}

export const actions = {
  getPayment
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_DEPOSITS]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {deposits: action.payload}),
  [GET_PAYMENT]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {payment: action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {payment: {}, deposits: []}
export default function paymentReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
