/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const FETCH_OPENINGS = 'FETCH_OPENINGS'

import { get, post, put, del } from '../../../utils/APIUtils'
import Dictionary from './../../../dictionary'
import validator from 'validator'
import _ from 'lodash'

// // ------------------------------------
// // Actions
// // ------------------------------------
// // NOTE: 'Action' is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// // If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// // if you'd like to learn more you can check out: flowtype.org.
// // DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// // incorrectly thrown when using arrow functions, hence the oddity.

export function fetchHistoryOpenings (): Action {
  return (dispatch) => {
    get('/apis/v1/openings', {}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: Dictionary.parse(err.error)}
        })
      }
      dispatch({
        type: FETCH_OPENINGS,
        payload: {openings: (d || [])}
      })
    })
  }
}

export function createOpening ({quota, quota_open_date, quota_fill_date, type}): Action {
  return (dispatch, getState) => {
    post('/apis/v1/openings', {}, {quota, quota_open_date, quota_fill_date, type}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: Dictionary.parse(err)}
        })
      }
      dispatch({
        type: FETCH_OPENINGS,
        payload: {openings: getState().openings.openings.concat([d])}
      })
    })
  }
}

export function updateOpening (id, {quota, quota_open_date, quota_fill_date}): Action {
  return (dispatch, getState) => {
    put(`/apis/v1/openings/${id}`, {}, {quota, quota_open_date, quota_fill_date}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: Dictionary.parse(err.error)}
        })
      }
      var openings = getState().openings.openings
      openings = openings.map((d) => {
        if (d._id === id) {
          d = _.extend(d, {quota, quota_open_date, quota_fill_date})
        }
        return d
      })
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: Dictionary.parse('text-success-update-opening')}
      })
      dispatch({
        type: FETCH_OPENINGS,
        payload: {openings: (openings || [])}
      })
    })
  }
}

export function deleteOpening (id): Action {
  return (dispatch, getState) => {
    del(`/apis/v1/openings/${id}`, {}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: Dictionary.parse(err.error)}
        })
      }
      var openings = JSON.parse(JSON.stringify(getState().openings.openings))
      openings = (openings || []).filter((d) => {
        return d._id !== id
      })
      dispatch({
        type: FETCH_OPENINGS,
        payload: {openings: []}
      })
      setTimeout(() => {
        dispatch({
          type: FETCH_OPENINGS,
          payload: {openings: openings}
        })
      }, 0)
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: Dictionary.parse('text-success-update-opening')}
      })
    })
  }
}

export const actions = {
  // fetchProfile, logout, login, loginFB, addTask, removeTask, verify
  fetchHistoryOpenings, updateOpening, createOpening, deleteOpening
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_OPENINGS]: (state: obj, action: {payload: obj}): obj => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function userReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
