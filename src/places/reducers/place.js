/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_PLACE = 'GET_PLACE'
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const SET_PLACE_USERCHECKIN = 'SET_PLACE_USERCHECKIN'
export const SET_PLACE_USERCOLLECT = 'SET_PLACE_USERCOLLECT'

import _ from "lodash"
import { get, post, put } from "../../../utils/APIUtils"
import placeavatarService from "../../places/services/placeavatar"
import localStorageOrAPICall from "../../../utils/localStorageOrAPICall"

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.
export function getPlace (placeId): Action {
  return (dispatch) => {
    get(`/apis/v1/places/${placeId}`, {}, {}, (err, d) => {
      if (err) {
        return  
      }
      dispatch({
        type: GET_PLACE,
        payload: d
      })
    })
  }
}

export function renderCheckin ({shopId, vote}): Action {
  return {
    type: SET_PLACE_USERCHECKIN,
    payload: vote
  }
}

export function setCheckin ({shopId, vote}): Action {
  return (dispatch) => {
    post(`/apis/v1/shops/${shopId}/checkin`, {vote}, {}, {}, (err, d) => {
      if (err) {
        return  
      }
      dispatch(renderCheckin({shopId, vote}))
    })
  }
}

export function resetImages (shopId): Action {
  return (dispatch) => {
    post(`/apis/v1/shops/${shopId}/resetimages`, {}, {}, {}, (err, d) => {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return  
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'successfully reset the images..'}
      })
    })
  }
}

export function renderCollect ({shopId, vote}): Action {
  return {
    type: SET_PLACE_USERCOLLECT,
    payload: vote
  }
}

export function setCollect ({shopId, vote}): Action {
  return (dispatch) => {
    post(`/apis/v1/shops/${shopId}/collect`, {vote}, {}, {}, (err, d) => {
      if (err) {
        return  
      }
      dispatch(renderCollect({shopId, vote}))
    })
  }
}

export function editPlace ({shopId, name, name_en, description, description_en, seoname, subname, addr, addr_en, phone, website, facebook, lon, lat, industries}): Action {
  return (dispatch) => {
    put(`/apis/v1/shops/${shopId}`, {shopId, name, name_en, description, description_en, seoname, subname, addr, addr_en, phone, website, facebook, lon, lat, industries}, {}, {}, (err, d) => {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully editted the shop'}
      })
    })
  }
}

export function setPlaceAvatar ({shopId, vote}): Action {
  return (dispatch) => {
    placeavatarService.set({shopId, vote})
    .then(function(d) {
      dispatch({
        type: GET_PLACE,
        payload: d
      })
    })
  }
}

export const actions = {
  getPlace, setCheckin, setCollect
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PLACE]: (state: obj, action: {payload: obj}): obj => action.payload,
  [SET_PLACE_USERCHECKIN]: (state: obj, action: {payload: number}): obj => _.extend({}, state, {"otherstats": _.extend({}, state.otherstats, {usercheckin: action.payload})}),
  [SET_PLACE_USERCOLLECT]: (state: obj, action: {payload: number}): obj => _.extend({}, state, {"otherstats": _.extend({}, state.otherstats, {usercollect: action.payload})}),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function placeReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
