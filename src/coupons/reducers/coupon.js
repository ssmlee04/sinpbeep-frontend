/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
// export const GET_MY_ENTITY = 'GET_MY_ENTITY'

import { get, post, put, del } from '../../../utils/APIUtils'
import _ from 'lodash'
export const SET_PREPARE_COUPON = 'SET_PREPARE_COUPON'
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_EVENT = 'GET_EVENT'
export const GET_COUPONS = 'GET_COUPONS'

export function buyEventCoupon ({eventId}): Action {
  return (dispatch) => {
    post('/apis/v1/coupons', {event_id: eventId}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'successfully purchased a coupon'}
      })
    })
  }
}

export function prepareCouponBuy ({eventId, provider}): Action {
  return (dispatch) => {
    post('/apis/v1/coupons/000000/prepare', {event_id: eventId, provider}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_PREPARE_COUPON,
        payload: d
      })
    })
  }
}

// export function checkoutReservedCoupon (couponId, depositId): Action {
//   return (dispatch) => {
//     console.log([couponId, depositId])
//     console.log([couponId, depositId])
//     console.log([couponId, depositId])
//     post(`/apis/v1/coupons/${couponId}/checkout`, {deposit_id: depositId}, {}, {}, function (err, d) {
//       if (err) {
//         console.log(err);
//         dispatch({
//           type: SET_SYSTEM_POPUPS,
//           payload: {type: 'error', message: err.error}
//         })
//         return
//       }
//       dispatch({
//         type: SET_SYSTEM_POPUPS,
//         payload: {type: 'success', message: 'you have successfully checkout an coupon'}
//       })
//     })
//   }
// }

export function checkoutPreprocessReservedCoupon (couponId, depositId): Action {
  return (dispatch) => {
    console.log([couponId, depositId])
    console.log([couponId, depositId])
    console.log([couponId, depositId])
    post(`/apis/v1/coupons/${couponId}/checkout`, {deposit_id: depositId}, {}, {}, function (err, d) {
      if (err) {
        console.log(err);
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully checkout an coupon'}
      })
    })
  }
}

export function checkoutButNoPreprocessReservedCoupon (couponId, depositId): Action {
  return (dispatch) => {
    console.log([couponId, depositId])
    console.log([couponId, depositId])
    console.log([couponId, depositId])
    post(`/apis/v1/coupons/${couponId}/checkoutnopreprocess`, {deposit_id: depositId}, {}, {}, function (err, d) {
      if (err) {
        console.log(err);
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully checkout an coupon'}
      })
    })
  }
}

export function getCoupons ({status}): Action {
  return (dispatch) => {
    get('/apis/v1/coupons', {status}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_COUPONS,
        payload: d
      })
    })
  }
}

export function getMyCoupons (): Action {
  return (dispatch) => {
    get('/apis/v1/mycoupons', {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_COUPONS,
        payload: d
      })
    })
  }
}

export const actions = {
  getCoupons, buyEventCoupon, prepareCouponBuy,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_PREPARE_COUPON]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {prepareCouponId: action.payload.prepareCouponId, prepareDepositId: action.payload.prepareDepositId}),
  [GET_COUPONS]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {coupons: action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {coupons: [], prepareDepositId: 0, prepareCouponId: 0}
export default function couponReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
