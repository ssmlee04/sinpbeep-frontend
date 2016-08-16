/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_PLACE_RANKS = 'GET_PLACE_RANKS'
export const GET_PLACE_IMAGES = 'GET_PLACE_IMAGES'
export const REMOVE_PLACE_IMAGE = 'REMOVE_PLACE_IMAGE'
import placeimageService from '../../places/services/placeimages'
import _ from 'lodash'
import localStorageOrAPICall from '../../../utils/localStorageOrAPICall'
import { get, post, put, del } from '../../../utils/APIUtils'

export function addToLastSeasonRank (shopId, industryId, rank): Action {
  let year = (new Date()).getFullYear()
  let season = ~~((new Date()).getMonth() / 4) + 1
  if (season === 1) {
    season = 4
    year = year - 1
  } else {
    season = season - 1
  }
  return (dispatch) => {
    post('/apis/v1/shops/ranks', {shop_id: shopId, iid: industryId, rank, year, season}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully editted this rank'}
      })
    })
  }
}

export function addToThisSeasonRank (shopId, industryId, rank): Action {
  const year = (new Date()).getFullYear()
  const season = ~~((new Date()).getMonth() / 4) + 1
  return (dispatch) => {
    post('/apis/v1/shops/ranks', {shop_id: shopId, iid: industryId, rank, year, season}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully editted this rank'}
      })
    })
  }
}

export function getRankedShops ({year, season, iid, zid, sid, cid}): Action {
  return (dispatch) => {
    get('/apis/v1/shops/ranks', {year, season, iid, zid, sid, cid}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_PLACE_RANKS,
        payload: d && d.content || []
      })
    })
  }
}

export const actions = {
  addToLastSeasonRank, addToThisSeasonRank, getRankedShops
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PLACE_RANKS]: (state: obj, action: {payload: array}): obj => _.extend({}, state, {shops: action.payload}),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {shops: []}
export default function placerankReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
