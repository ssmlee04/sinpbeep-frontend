/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
// export const GET_MY_ENTITY = 'GET_MY_ENTITY'

import { get, post, put, del } from '../../../utils/APIUtils'
import _ from 'lodash'
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_LANGUAGE = 'GET_LANGUAGE'
export const GET_LANGUAGES = 'GET_LANGUAGES'

export function createLanguage ({name, description}): Action {
  return (dispatch) => {
    post('/apis/v1/langs', {name, description}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully created an language'}
      })
    })
  }
}

export function editLanguage (languageId, {name, description}): Action {
  return (dispatch) => {
    put(`/apis/v1/langs/${languageId}`, {name, description}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully edited an language'}
      })
    })
  }
}

export function getLanguages (): Action {
  return (dispatch) => {
    get('/apis/v1/langs', {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_LANGUAGES,
        payload: d || [] // d.content || []
      })
    })
  }
}

export function getLanguage ({languageId}): Action {
  return (dispatch) => {
    get(`/apis/v1/langs/${languageId}`, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_LANGUAGE,
        payload: d
      })
    })
  }
}

export const actions = {
  createLanguage, getLanguages, getLanguage, editLanguage
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_LANGUAGES]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {languages: action.payload}),
  [GET_LANGUAGE]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {language: action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {language: {}, languages: []}
export default function languageReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
