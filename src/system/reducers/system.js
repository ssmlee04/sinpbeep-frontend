/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SET_SYSTEM_VARIABLES_PID = 'SET_SYSTEM_VARIABLES_PID'
export const SET_SYSTEM_VARIABLES_IID = 'SET_SYSTEM_VARIABLES_IID'
export const SET_SYSTEM_VARIABLES_PLACENAME = 'SET_SYSTEM_VARIABLES_PLACENAME'
export const SET_SYSTEM_VARIABLES_ZIDSIDCID = 'SET_SYSTEM_VARIABLES_ZIDSIDCID'
export const SET_SYSTEM_VARIABLES_LONLAT = 'SET_SYSTEM_VARIABLES_LONLAT'

import { get, post } from "../../../utils/APIUtils";
import _ from "lodash";

export function setIndustry ({iid}): Action {
  return {
    type: SET_SYSTEM_VARIABLES_IID,
    payload: iid
  }
}

export function setProduct ({pid}): Action {
  return {
    type: SET_SYSTEM_VARIABLES_PID,
    payload: pid
  }
}

export function setPlacename ({placename}): Action {
  return {
    type: SET_SYSTEM_VARIABLES_PLACENAME,
    payload: placename
  }
}

export function setLonLat ({lon, lat}): Action {
  return {
    type: SET_SYSTEM_VARIABLES_LONLAT,
    payload: {lon, lat}
  }
}

export function setZone ({zid, sid, cid}): Action {
  return (dispatch) => {
    dispatch({
      type: SET_SYSTEM_VARIABLES_ZIDSIDCID,
      payload: {zid, sid, cid}
    })
  }
}

export const actions = {
  setIndustry, setPlacename, setZone, setLonLat
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_SYSTEM_VARIABLES_IID]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {iid: action.payload}), 
  [SET_SYSTEM_VARIABLES_PID]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {pid: action.payload}), 
  [SET_SYSTEM_VARIABLES_ZIDSIDCID]: (state: obj, action: {payload: string}): obj => _.extend({}, state, action.payload), 
  [SET_SYSTEM_VARIABLES_LONLAT]: (state: obj, action: {payload: string}): obj => _.extend({}, state, action.payload), 
  [SET_SYSTEM_VARIABLES_PLACENAME]: (state: string, action: {payload: string}): obj => _.extend({}, state, {placename: action.payload}),  
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {iid: "540682ffd5c5d9c5d47091ee", placename: "", zid: "35", sid: "433", cid: "-1", lon: 0, lat: 0, pid: 0}
export default function systemReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
