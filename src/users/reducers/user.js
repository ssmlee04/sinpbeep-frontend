/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const FETCH_PROFILE = 'FETCH_PROFILE'

import { get, post } from '../../../utils/APIUtils'
import validator from 'validator'

const validateRegisterInputs = function (query) {
  // const pattern = new RegExp(/^[a-z0-9]{3,15}$/)
  query.birthdate = query.birthdate.replace(/-/g, '/')
  if (!query) {
    return {error: 'please make sure all the inputs are correct'}
  } else if (!validator.isEmail(query.email)) {
    return {error: 'make sure email format is correct...'}
  } else if (!query.password) {
    return {error: 'please make sure password are correct'}
  } else if (query.password.length < 8) {
    return {error: 'please make sure password have 8 more characters'}
  } else if (['0', '1'].indexOf(query.sex) === -1) {
    return {error: 'choose a gender'}
  } else if (!validator.isDate(query.birthdate)) {
    return {error: 'make sure birthday format is correct...'}
  } else if (!query.name) {
    return {error: 'please make sure name are correct'}
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
    get('/apis/v1/loggedin', {}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
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
    get('/apis/v1/logout', {}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
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
  return (dispatch) => {
    post('/apis/v1/login', {email, password}, {}, {}, function(err, d){
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
      }
      dispatch({
        type: FETCH_PROFILE,
        payload: d.user
      })
    })
  }
}

export function register ({email, password, sex, name, birthdate}): Action {
  var validateResult = validateRegisterInputs({email, password, sex, name, birthdate})
  if (!validateResult.success) {
    return {
      type: SET_SYSTEM_POPUPS,
      payload: {type: 'error', message: validateResult.error}
    }
  }

  return (dispatch) => {
    post('/apis/v1/register', {email, password, sex, name, birthdate}, {}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
      }
      window.location.href = '/thankyou'
    })
  }
}

export function loginFB ({access_token}): Action {
  return (dispatch) => {
    post('/apis/v1/auth/facebook/token', {access_token}, {}, {}, function (err, d) {
      if (err) {
        return dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
      }
      dispatch({
        type: FETCH_PROFILE,
        payload: d.user
      })
    })
  }
}

export const actions = {
  fetchProfile, logout, login, loginFB
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
