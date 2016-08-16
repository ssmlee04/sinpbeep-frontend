/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_PLACE_IMAGES = 'GET_PLACE_IMAGES'
export const REMOVE_PLACE_IMAGE = 'REMOVE_PLACE_IMAGE'
import placeimageService from '../../places/services/placeimages'
import _ from 'lodash'
import localStorageOrAPICall from '../../../utils/localStorageOrAPICall'
import { get, post, put, del } from '../../../utils/APIUtils'

export function getPlaceImages ({placeId, skip}): Action {
  return (dispatch) => {
    placeimageService.get({placeId, skip})
    .then(function(d){
      dispatch({
        type: GET_PLACE_IMAGES,
        payload: _.extend(d, {skip, placeId})
      })
    })
  }
}

export function deleteImage ({photoId}): Action {
  return (dispatch) => {
    del(`/apis/v1/shops/images/${photoId}`, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully deleted this image'}
      })
      // dispatch({
      //   type: REMOVE_PLACE_IMAGE,
      //   payload: photoId
      // })
    })
  }
}

export function editPlaceImage (shopId, photoId, message): Action {
  return (dispatch) => {
    put(`/apis/v1/shops/${shopId}/editimages/${photoId}`, {message}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully editted this image'}
      })
    })
  }
}

export const actions = {
  getPlaceImages, deleteImage
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PLACE_IMAGES]: (state: obj, action: {payload: array}): obj => {
    if (state.placeId !== action.payload.placeId) {
      const hasMore = action.payload.mincount % 10 > 0
      return _.extend({}, {images: action.payload.content, hasMore: hasMore, skip: 10, placeId: action.payload.placeId})
    } else {
      const hasMore = action.payload.mincount > (state.images.length + action.payload.content.length)
      return _.extend({}, {images: [].concat(state.images).concat(action.payload.content), hasMore: hasMore, skip: action.payload.skip + 10, placeId: action.payload.placeId})
    }
  },
  // [REMOVE_PLACE_IMAGE]: (state: obj, action: {payload: array}): obj => {
  //   let images = state.images.filter(function(d){
  //     return d.photo_id && action.payload && d.photo_id.toString() !== action.payload.toString()
  //   })
  //   return _.extend({}, {images: images})
  // }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {images: [], skip: 0, placeId: '', hasMore: true}
export default function placeimagesReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
