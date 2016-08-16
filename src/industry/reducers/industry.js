/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_INDUSTRIES = 'GET_INDUSTRIES'
export const GET_INDUSTRY = 'GET_INDUSTRY'
import industryService from '../../industry/services/industry'
import _ from 'lodash'
import localStorageOrAPICall from '../../../utils/localStorageOrAPICall'
import { get, post, put, del } from '../../../utils/APIUtils'

export function getIndustries (): Action {
  return (dispatch) => {
    localStorageOrAPICall('industry', industryService.get)
    .then((d) => {
      dispatch({
        type: GET_INDUSTRIES,
        payload: d
      })
    })
  }
}

export function createIndustry ({name, description, ancestor, if_rank, if_show, time_multi, price_multi, ownstats}): Action {
  return (dispatch) => {
    post('/apis/v1/industry', {name, description, ancestor, if_rank, if_show, time_multi, price_multi, ownstats}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully created an indsutry'}
      })
    })
  }
}

export function editIndustry (industryId, {name, description, ancestor, if_rank, if_show, time_multi, price_multi, ownstats}): Action {
  return (dispatch) => {
    put(`/apis/v1/industry/${industryId}`, {name, description, ancestor, if_rank, if_show, time_multi, price_multi, ownstats}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully edited an indsutry'}
      })
    })
  }
}

export function getIndustry ({industryId}): Action {
  return (dispatch) => {
    get(`/apis/v1/industry/${industryId}`, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_INDUSTRY,
        payload: d
      })
    })
  }
}

export const actions = {
  getIndustries
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_INDUSTRIES]: (state: obj, action: {payload: array}): obj => _.extend({}, state, {industries: action.payload}),
  [GET_INDUSTRY]: (state: obj, action: {payload: array}): obj => _.extend({}, state, {industry: action.payload}),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {industries: [], industry: {}}
export default function industryReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
