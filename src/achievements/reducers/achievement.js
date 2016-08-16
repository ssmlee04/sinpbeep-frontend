/* @flow */
// ------------------------------------
// Constants
// ------------------------------------

import { get, post, put, del } from '../../../utils/APIUtils'
import _ from 'lodash'
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_ACHIEVEMENT = 'GET_ACHIEVEMENT'
export const GET_ACHIEVEMENTS = 'GET_ACHIEVEMENTS'

export function createAchievement ({name, requirements, description, reward}): Action {
  return (dispatch) => {
    post('/apis/v1/achievements', {name, requirements, description, reward}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully created an achievement'}
      })
    })
  }
}

export function editAchievement (achievementId, {name, requirements, description, reward}): Action {
  return (dispatch) => {
    put(`/apis/v1/achievements/${achievementId}`, {name, requirements, description, reward}, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully edited an achievement'}
      })
    })
  }
}

export function getAchievements (): Action {
  return (dispatch) => {
    get('/apis/v1/achievements', {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_ACHIEVEMENTS,
        payload: d || [] // d.content || []
      })
    })
  }
}

export function getAchievement ({achievementId}): Action {
  return (dispatch) => {
    get(`/apis/v1/achievements/${achievementId}`, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_ACHIEVEMENT,
        payload: d
      })
    })
  }
}

export const actions = {
  createAchievement, getAchievements, getAchievement, editAchievement
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ACHIEVEMENTS]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {achievements: action.payload}),
  [GET_ACHIEVEMENT]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {achievement: action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {achievement: {}, achievements: []}
export default function achievementReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
