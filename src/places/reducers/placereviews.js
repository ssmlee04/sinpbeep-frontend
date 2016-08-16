/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_PLACE_REVIEWS = 'GET_PLACE_REVIEWS'
import placereviewService from '../../places/services/placereviews'
import _ from 'lodash';
// import localStorageOrAPICall from '../../../utils/localStorageOrAPICall';

export function getPlaceReviews ({placeId, skip}): Action {
  return (dispatch) => {
    placereviewService.get({placeId, skip})
    .then(function(d){
      dispatch({
        type: GET_PLACE_REVIEWS,
        payload: _.extend(d, {skip, placeId})
      });
    });
  }
}

export const actions = {
  getPlaceReviews
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PLACE_REVIEWS]: (state: obj, action: {payload: array}): obj => {
    if (state.placeId !== action.payload.placeId) {
      const hasMore = action.payload.mincount % 10 > 0;
      return _.extend({}, {reviews: action.payload.content, hasMore: hasMore, skip: 10, placeId: action.payload.placeId})
    } else {
      const hasMore = action.payload.mincount > (state.reviews.length + action.payload.content.length)
      return _.extend({}, {reviews: [].concat(state.reviews).concat(action.payload.content), hasMore: hasMore, skip: action.payload.skip + 10, placeId: action.payload.placeId})
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {reviews: [], skip: 0, placeId: '', hasMore: true};
export default function industryReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
