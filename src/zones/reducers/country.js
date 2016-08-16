/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_CITY = 'GET_CITY'
export const GET_CITIES = 'GET_CITIES'
export const GET_STATE = 'GET_STATE'
export const GET_COUNTRY = 'GET_COUNTRY'
export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_STATES = 'GET_STATES'
export const GET_INDUSTRY = 'GET_INDUSTRY'
import countryService from '../../zones/services/country'
import _ from 'lodash'
import localStorageOrAPICall from '../../../utils/localStorageOrAPICall'
import { get, post, put, del } from '../../../utils/APIUtils'

export function getCountries (): Action {
  return (dispatch) => {
    localStorageOrAPICall('countries', countryService.get)
    .then((d) => {
      dispatch({
        type: GET_COUNTRIES,
        payload: d
      })
    })
  }
}

export function getCountry (zid): Action {
  return (dispatch) => {
    get(`/apis/v1/zone/countries/${zid}`, {}, {}, (err, d) => {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_COUNTRY,
        payload: d
      })
    })
  }
}

export function getState (zid, sid): Action {
  return (dispatch) => {
    get(`/apis/v1/zone/countries/${zid}/states/${sid}`, {}, {}, (err, d) => {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_STATE,
        payload: d
      })
    })
  }
}

export function getStates (zid): Action {
  return (dispatch) => {
    get(`/apis/v1/zone/countries/${zid}/states`, {}, {}, (err, d) => {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_STATES,
        payload: d
      })
    })
  }
}

export function getCities (zid, sid): Action {
  return (dispatch) => {
    get(`/apis/v1/zone/countries/${zid}/states/${sid}/cities`, {}, {}, (err, d) => {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_CITIES,
        payload: d
      })
    })
  }
}

export function getCity (zid, sid, cid): Action {
  return (dispatch) => {
    get(`/apis/v1/zone/countries/${zid}/states/${sid}/cities/${cid}`, {}, {}, (err, d) => {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_CITY,
        payload: d
      })
    })
  }
}

export function editCountry (zid, {zn, _zns}): Action {
  return (dispatch) => {
    put(`/apis/v1/zone/countries/${zid}`, {name, _zns}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully edited a country'}
      })
    })
  }
}

export const actions = {
  getCountries
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_CITY]: (state: obj, action: {payload: array}): obj => _.extend({}, state, {city: action.payload}),
  [GET_CITIES]: (state: obj, action: {payload: array}): obj => _.extend({}, state, {cities: action.payload}),
  [GET_STATE]: (state: obj, action: {payload: array}): obj => _.extend({}, state, {state: action.payload}),
  [GET_STATES]: (state: obj, action: {payload: array}): obj => _.extend({}, state, {states: action.payload}),
  [GET_COUNTRY]: (state: obj, action: {payload: array}): obj => _.extend({}, state, {country: action.payload}),
  [GET_COUNTRIES]: (state: obj, action: {payload: array}): obj => _.extend({}, state, {countries: action.payload}),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {countries: [], country: {}, states: [], state: {}, cities: [], city: {}}
export default function countryReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
