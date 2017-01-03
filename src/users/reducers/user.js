/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const FETCH_PROFILE = 'FETCH_PROFILE'

import { get, post, del } from '../../../utils/APIUtils'
import Dictionary from './../../../dictionary'
import validator from 'validator'

const validateLoginInputs = function (query) {
  // const pattern = new RegExp(/^[a-z0-9]{3,15}$/)
  // query.birthdate = query.birthdate.replace(/-/g, '/')
  if (!query) {
    return {error: 'text-error-info'}
  } else if (!validator.isEmail(query.email)) {
    return {error: 'text-error-info-email'}
  } else if (!query.password) {
    return {error: 'text-error-info-password'}
  }
  return {success: true}
}

const validateRegisterInputs = function (query) {
  // const pattern = new RegExp(/^[a-z0-9]{3,15}$/)
  // query.birthdate = query.birthdate.replace(/-/g, '/')
  if (!query) {
    return {error: 'text-error-info'}
  } else if (!validator.isEmail(query.email)) {
    return {error: 'text-error-info-email'}
  } else if (!query.password) {
    return {error: 'text-error-info-password'}
  } else if (query.password.length < 8) {
    return {error: 'text-error-info-password-length'}
  } else if (query.password !== query.confirmPassword) {
    return {error: 'text-error-info-password-mismatch'}
  } else if ([1, 2].indexOf(query.sex) === -1) {
    return {error: 'text-error-info-gender'}
  } else if (!query.name) {
    return {error: 'text-error-info-name'}
  }
  return {success: true}
}

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: 'Action' is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.
export function fetchProfile (): Action {
  return (dispatch) => {
    get('/apis/v1/auth/loggedin', {}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: Dictionary.parse(err.error)}
        })
      }
      if (d) {
        d.isAdmin = (d && d.roles && d.roles.indexOf('admin') > -1) || (d && d.roles && d.roles.indexOf('root') > -1)
        d.isOwner = (d && d.roles && d.roles.indexOf('owner') > -1) || (d && d.roles && d.roles.indexOf('admin') > -1)
        d.isRootAdmin = d && d.roles && d.roles.indexOf('root') > -1
      }
      dispatch({
        type: FETCH_PROFILE,
        payload: d || {}
      })
    })
  }
}

export function logout (): Action {
  return (dispatch) => {
    get('/apis/v1/auth/logout', {}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: Dictionary.parse(err.error)}
        })
      }
      dispatch({
        type: FETCH_PROFILE,
        payload: {}
      })
    })
  }
}

export function login ({email, password}): Action {
  var validateResult = validateLoginInputs({email, password})

  if (!validateResult.success) {
    return {
      type: SET_SYSTEM_POPUPS,
      payload: {type: 'error', message: Dictionary.parse(validateResult.error)}
    }
  }

  return (dispatch) => {
    post('/apis/v1/auth/login', {}, {email, password}, {login: true}, function(err, d){
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: Dictionary.parse(err.error)}
        })
      }
      dispatch({
        type: FETCH_PROFILE,
        payload: d.user
      })
    })
  }
}

export function register ({email, password, sex, name, birthdate, confirmPassword}): Action {
  var validateResult = validateRegisterInputs({email, password, sex, name, birthdate, confirmPassword})
  if (!validateResult.success) {
    return {
      type: SET_SYSTEM_POPUPS,
      payload: {type: 'error', message: Dictionary.parse(validateResult.error)}
    }
  }

  return (dispatch) => {
    post('/apis/v1/auth/register', {}, {email, password, sex, name, birthdate}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: Dictionary.parse(err.error)}
        })
      }
      window.location.href = '/thankyou'
    })
  }
}

export function addTask (routineId, taskId): Action {
  return (dispatch, getState) => {
    let { user } = getState()
    user = JSON.parse(JSON.stringify(user))

    post(`/apis/v1/routines/${routineId}/tasks/${taskId}`, {}, {}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: Dictionary.parse(err.error)}
        })
      }
      user.tasks = user.tasks || []

      if (user.tasks.indexOf(taskId) === -1) {
        user.tasks.push(taskId)

        dispatch({
          type: FETCH_PROFILE,
          payload: user
        })
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'success', message: Dictionary.parse('text-success-add-task')}
        })
      }
    })
  }
}

export function removeTask (routineId, taskId): Action {
  return (dispatch, getState) => {
    let { user } = getState()
    user = JSON.parse(JSON.stringify(user))

    del(`/apis/v1/routines/${routineId}/tasks/${taskId}`, {}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: Dictionary.parse(err.error)}
        })
      }

      user.tasks = user.tasks || []

      if (user.tasks.indexOf(taskId) > -1) {
        user.tasks.splice(user.tasks.indexOf(taskId), 1)

        dispatch({
          type: FETCH_PROFILE,
          payload: user
        })
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'success', message: Dictionary.parse('text-success-remove-task')}
        })
      }
    })
  }
}

export function loginFB ({access_token}): Action {
  return (dispatch) => {
    post('/apis/v1/auth/facebook/token', {}, {access_token}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: Dictionary.parse(err.error)}
        })
      }
      dispatch({
        type: FETCH_PROFILE,
        payload: d.user
      })
    })
  }
}

export function verify (hash): Action {
  return (dispatch) => {
    get(`/apis/v1/auth/verifyemail/${hash}`, {}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: Dictionary.parse(err.error)}
        })
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: Dictionary.parse('text-success-verify-email')}
      })
    })
  }
}

export const actions = {
  fetchProfile, logout, login, loginFB, addTask, removeTask, verify
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_PROFILE]: (state: obj, action: {payload: obj}): obj => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function userReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
