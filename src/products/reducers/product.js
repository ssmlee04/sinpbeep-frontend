/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
// export const GET_MY_ENTITY = 'GET_MY_ENTITY'

import { get, post, put, del } from '../../../utils/APIUtils'
import _ from 'lodash'
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_PRODUCT = 'GET_PRODUCT'
export const GET_PRODUCTS = 'GET_PRODUCTS'

export function createProduct ({name, description, price, currency, subtract}): Action {
  return (dispatch) => {
    post('/apis/v1/products', {name, description, price, currency, subtract}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully created a product'}
      })
    })
  }
}

export function editProduct (productId, {name, description, price, currency}): Action {
  return (dispatch) => {
    put(`/apis/v1/products/${productId}`, {name, description}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully edited a product'}
      })
    })
  }
}

export function getProducts (): Action {
  return (dispatch) => {
    get('/apis/v1/products', {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_PRODUCTS,
        payload: d || [] // d.content || []
      })
    })
  }
}

export function getProduct ({productId}): Action {
  return (dispatch) => {
    get(`/apis/v1/products/${productId}`, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_PRODUCT,
        payload: d
      })
    })
  }
}

export const actions = {
  createProduct, getProducts, getProduct, editProduct
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PRODUCTS]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {products: action.payload}),
  [GET_PRODUCT]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {product: action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {product: {}, products: []}
export default function productReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
