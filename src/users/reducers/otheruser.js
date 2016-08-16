/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
// export const GET_MY_ENTITY = 'GET_MY_ENTITY'

import { get, post, put, del } from '../../../utils/APIUtils'
import _ from 'lodash'
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_OTHERUSER = 'GET_OTHERUSER'
export const GET_OTHERUSERS = 'GET_OTHERUSERS'

export function editUser (otheruserId, {name, requirements, description, reward}): Action {
  return (dispatch) => {
    put(`/apis/v1/otherusers/${otheruserId}`, {name, requirements, description, reward}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully edited an otheruser'}
      })
    })
  }
}

export function deleteUser (otheruserId): Action {
  return (dispatch) => {
    del(`/apis/v1/users/${otheruserId}`, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully purged this user, how sad'}
      })
    })
  }
}

export function editUserRole (otheruserId, {role, value}): Action {
  return (dispatch) => {
    put(`/apis/v1/users/${otheruserId}/roles`, {role, value}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully edited an the role'}
      })
    })
  }
}

export function getUsers ({role, email}): Action {
  return (dispatch) => {
    get('/apis/v1/users', {role, email}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_OTHERUSERS,
        payload: d || [] // d.content || []
      })
    })
  }
}

export function getUser ({otheruserId}): Action {
  return (dispatch) => {
    get(`/apis/v1/users/${otheruserId}`, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_OTHERUSER,
        payload: d
      })
    })
  }
}

export const actions = {
  getUsers, getUser, editUser, deleteUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_OTHERUSERS]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {otherusers: action.payload}),
  [GET_OTHERUSER]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {otheruser: action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {otheruser: {}, otherusers: []}
export default function otheruserReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
