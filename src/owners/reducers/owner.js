/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_PROFILE = 'FETCH_PROFILE'
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'

import { post } from '../../../utils/APIUtils'
import validator from 'validator'

const validateRegisterInputs = function(query) {
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

export function registerOwner ({email, password, sex, name, birthdate}): Action {
  var validateResult = validateRegisterInputs({email, password, sex, name, birthdate})
  if (!validateResult.success) {
    return {
      type: SET_SYSTEM_POPUPS,
      payload: {type: 'error', message: validateResult.error}
    }
  }

  return (dispatch) => {
    post('/apis/v1/register-owner', {email, password, sex, name, birthdate}, {}, {}, function (err, d) {
      if (err) {
        return
      }
      window.location.href = '/thankyou'
    })
  }
}

export function addOwner ({shopId, email}): Action {
  return (dispatch) => {
    post(`/apis/v1/shops/${shopId}/owners`, {email}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully addded this owner..'}
      })
    })
  }
}

export function loginOwner ({email, password}): Action {
  return (dispatch) => {
    post('/apis/v1/login-owner', {email, password}, {}, {}, function (err, d) {
      if (err) {
        console.log(err);
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: FETCH_PROFILE,
        payload: d.user
      })
    })
  }
}

export const actions = {
  loginOwner
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  // [FETCH_PROFILE]: (state: obj, action: {payload: obj}): obj => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function ownerReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
