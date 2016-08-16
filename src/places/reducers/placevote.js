/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
import _ from "lodash";
export const SET_PLACE_TIME = 'SET_PLACE_TIME'
export const SET_PLACE_PRICE = 'SET_PLACE_PRICE'
import placevoteService from "../../places/services/placevote"
import localStorageOrAPICall from "../../../utils/localStorageOrAPICall";

export function setPlaceTime ({shopId, high, low}): Action {
  return (dispatch) => {
    placevoteService.setPlaceTime({shopId, high, low})
    // localStorageOrAPICall("industry", industryService.setPlaceTime.bind(industryService, {high, low}))
    .then(function(d){
      // dispatch({
      //   type: SET_PLACE_VOTE,
      //   payload: d
      // })
    })
  }
}

export function setPlacePrice ({shopId, high, low, currency}): Action {
  return (dispatch) => {
    placevoteService.setPlacePrice({shopId, high, low, currency})
    // localStorageOrAPICall("industry", industryService.setPlaceTime.bind(industryService, {high, low}))
    .then(function(d){
      
      // dispatch({
      //   type: SET_PLACE_VOTE,
      //   payload: d
      // })
    })
  }
}

export function setPlaceStatVote ({statId, shopId, vote}): Action {
  return (dispatch) => {
    placevoteService.setPlaceStatVote({statId, shopId, vote})
    // localStorageOrAPICall("industry", industryService.setPlaceTime.bind(industryService, {high, low}))
    .then(function(d){
      
      // dispatch({
      //   type: SET_PLACE_VOTE,
      //   payload: d
      // })
    })
  }
}

export const actions = {
  setPlaceTime, setPlacePrice
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  // [SET_PLACE_VOTE]: (state: obj, action: {payload: array}): obj => _.extend({}, state, {industries: action.payload}),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function industryReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
