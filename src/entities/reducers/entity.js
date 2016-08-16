/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_MY_ENTITY = 'GET_MY_ENTITY'

import { get, post, put, del } from '../../../utils/APIUtils'
import _ from 'lodash'

export function getMyEntity (): Action {
  return (dispatch) => {
    get('/apis/v1/entities/me', {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_MY_ENTITY,
        payload: d
      })
    })
  }
}

export function createEntity ({name, description, phone, address, contact}): Action {
  return (dispatch) => {
    post('/apis/v1/entities', {name, description, phone, address, contact}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_MY_ENTITY,
        payload: d
      })
    })
  }
}

export function addUserToEntityByEmail (entityId, {email}): Action {
  return (dispatch) => {
    post(`/apis/v1/entities/${entityId}/users`, {email}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'successfully added user to entity'}
      })
    })
  }
}

export function addMyEntityGroupUser ({userId, groupId}): Action {
  return (dispatch) => {
    post(`/apis/v1/entities/me/addusertogroup`, {user_id: userId, group_id: groupId}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'successfully added user to group'}
      })
    })
  }
}

export function removeMyEntityGroupUser ({userId, groupId}): Action {
  return (dispatch) => {
    post(`/apis/v1/entities/me/removeuserfromgroup`, {user_id: userId, group_id: groupId}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'successfully removed user from group'}
      })
    })
  }
}

export function addMyEntityGroupShop ({shopId, groupId}): Action {
  return (dispatch) => {
    post(`/apis/v1/entities/me/shops/${shopId}`, {groupId}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'successfully added shop to group'}
      })
    })
  }
}

export function removeMyEntityGroupShop ({shopId, groupId}): Action {
  return (dispatch) => {
    del(`/apis/v1/entities/me/groups/${groupId}/shops/${shopId}`, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      // dispatch({
      //   type: GET_MY_ENTITY,
      //   payload: d
      // })
    })
  }
}

export function editMyEntity ({name}): Action {
  return (dispatch) => {
    put('/apis/v1/entities/me', {name}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_MY_ENTITY,
        payload: d
      })
    })
  }
}

export function editMyEntityGroup ({name, groupId}): Action {
  return (dispatch) => {
    put(`/apis/v1/entities/me/groups/${groupId}`, {name}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      // dispatch({
      //   type: GET_MY_ENTITY,
      //   payload: d
      // })
    })
  }
}

export const actions = {
  getMyEntity
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_MY_ENTITY]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {entity: action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {entity: {}}
export default function entityReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
