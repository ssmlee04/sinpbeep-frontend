/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_PLACES = 'GET_PLACES'
export const RESET_PLACES_SKIP = 'RESET_PLACES_SKIP'

import _ from 'lodash';
import { get, post, put } from '../../../utils/APIUtils';
import placesService from '../../places/services/places'
import localStorageOrAPICall from '../../../utils/localStorageOrAPICall';

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: 'Action' is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.
export function getPlaces ({skip, placesQ, iid, zid=35, sid=433, cid=-1, placename, lon, lat, is_validated}): Action {
  return (dispatch) => {
    placesService.get({skip, placesQ, iid, zid, sid, placename, lon, lat, is_validated})
    .then(function(d){
      dispatch({
        type: GET_PLACES,
        payload: _.extend(d, {skip, iid, zid, sid, cid, placesQ, placename, lon, lat})
      })
    })
  }
}

export function resetPlaces (): Action {
  return (dispatch) => {
    dispatch({
      type: GET_PLACES,
      payload: {content: []}
    })
  }
}

export function resetPlacesSkip (): Action {
  return {
    type: RESET_PLACES_SKIP,
    payload: {}
  }
}

export const actions = {
  getPlaces, resetPlacesSkip
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PLACES]: (state: obj, action: {payload: obj}): obj => {
    if (state.zid !== action.payload.zid || 
      state.sid !== action.payload.sid || 
      state.cid !== action.payload.cid || 
      state.iid !== action.payload.iid || 
      state.placename !== action.payload.placename || 
      state.placesQ !== action.payload.placesQ) {
      const hasMore = action.payload.mincount > 20;
      return _.extend({}, {places: action.payload.content, hasMore: hasMore, skip: 20, 
        zid: action.payload.zid,
        sid: action.payload.sid,
        cid: action.payload.cid,
        iid: action.payload.iid,
        placesQ: action.payload.placesQ,
        placename: action.payload.placename,
      })
    } else {
      const hasMore = action.payload.mincount > (state.places.length + action.payload.content.length)
      return _.extend({}, {places: [].concat(state.places).concat(action.payload.content), hasMore: hasMore, skip: action.payload.skip + 20, zid: action.payload.zid, sid: action.payload.sid, cid: action.payload.cid, iid: action.payload.iid, placesQ: action.payload.placesQ, placename: action.payload.placename})
    }
  },
  [RESET_PLACES_SKIP]: (state: obj, action: {payload: obj}): obj => _.extend({}, state, {skip: 0}),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {places: [], skip: 0, placesQ: '', zid: '', sid: '', cid: '', iid: ''}
export default function placeReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
