/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
// export const GET_MY_ENTITY = 'GET_MY_ENTITY'

import { get, post, put, del } from '../../../utils/APIUtils'
import _ from 'lodash'
export const SET_PREPARE_EVENT = 'SET_PREPARE_EVENT'
export const SET_SYSTEM_POPUPS = 'SET_SYSTEM_POPUPS'
export const GET_EVENT = 'GET_EVENT'
export const GET_EVENTS = 'GET_EVENTS'

export function createEvent ({name, description, requirements, start, end, unit, price, currency, product_id, entitygroup_id}): Action {
  return (dispatch) => {
    post('/apis/v1/events', {name, description, requirements, start, end, unit, price, currency, product_id, entitygroup_id}, {}, {}, function (err, d) {
      if (err) {
        console.log(err)
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully created an event'}
      })
    })
  }
}

export function prepareCreateEvent ({name, description, requirements, start, end, unit, price, currency, product_id, entitygroup_id, provider}): Action {
  return (dispatch) => {
    post('/apis/v1/events/000000/prepare', {name, description, requirements, start, end, unit, price, currency, product_id, entitygroup_id, provider}, {}, {}, function (err, d) {
      if (err) {
        console.log(err)
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_PREPARE_EVENT,
        payload: d
      })
    })
  }
}

export function checkoutPreprocessCreateEvent (eventId): Action {
  return (dispatch) => {
    post(`/apis/v1/events/${eventId}/checkout`, {}, {}, {}, function (err, d) {
      if (err) {
        console.log(err)
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully checkout an event'}
      })
    })
  }
}

export function checkoutButNoPreprocessCreateEvent (eventId): Action {
  return (dispatch) => {
    post(`/apis/v1/events/${eventId}/checkoutnopreprocess`, {}, {}, {}, function (err, d) {
      if (err) {
        console.log(err)
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: SET_SYSTEM_POPUPS,
        payload: {type: 'success', message: 'you have successfully checkout an event'}
      })
    })
  }
}

export function getOwnerEvents (): Action {
  return (dispatch) => {
    get('/apis/v1/myevents', {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_EVENTS,
        payload: d.content || []
      })
    })
  }
}

export function getEvents ({entity_id, status, owner_id}): Action {
  return (dispatch) => {
    console.log(entity_id, status, owner_id)
    get('/apis/v1/events', {entity_id, status, owner_id}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_EVENTS,
        payload: d.content || []
      })
    })
  }
}

export function getOwnerEvent (eventId): Action {
  return (dispatch) => {
    get(`/apis/v1/myevents/${eventId}`, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_EVENT,
        payload: d
      })
    })
  }
}

export function getEvent (eventId): Action {
  return (dispatch) => {
    get(`/apis/v1/events/${eventId}`, {}, {}, function (err, d) {
      if (err) {
        dispatch({
          type: SET_SYSTEM_POPUPS,
          payload: {type: 'error', message: err.error}
        })
        return
      }
      dispatch({
        type: GET_EVENT,
        payload: d
      })
    })
  }
}

export const actions = {
  createEvent, getEvents, getOwnerEvent, getOwnerEvents, getEvent, checkoutPreprocessCreateEvent, checkoutButNoPreprocessCreateEvent, prepareCreateEvent
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_PREPARE_EVENT]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {prepareEventId: action.payload.prepareEventId, prepareDepositId: action.payload.prepareDepositId}),
  [GET_EVENTS]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {events: action.payload}),
  [GET_EVENT]: (state: obj, action: {payload: string}): obj => _.extend({}, state, {event: action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {event: {}, events: [], prepareEventId: 0, prepareDepositId: 0, prepareCouponId: 0}
export default function eventReducer (state: obj = initialState, action: Action): obj {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
