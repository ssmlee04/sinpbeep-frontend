// Utils to send requests to the 500px API endpoint

import Promise from 'bluebird'
import request from 'superagent'
// import { assign } from 'lodash'
import config from '../config'

const debug = require('debug')('isomorphic500')

const APIUtils = {

  get: function(endpoint, query, options, done) {
    if (arguments.length === 2) {
      done = query
      query = {}
    }

    const url = `${config.default.proxyRoot}${endpoint}`
    // const url = encodeURI(`${config.default.proxyRoot}${endpoint}`)

    debug('Sending GET request to %s', url, query)

    request
      .get(url)
      // .withCredentials()
      // .set('accept-language', connectSid)
      // .set('Cookie', options && options.connectSid || '')
      .query(query)
      .end((err, res) => {
        debug('Received response %s from %s', res && res.status, url)

        if (err) {
          const errBody = JSON.parse(JSON.parse(JSON.stringify(err)).response.text)
          errBody.status = err.status
          if (err.status) {
            // Normalize statusCode vs. status
            err.statusCode = err.status
          }

          return done(errBody)
        }

        done(null, res.body)
      })
  },
  getP: function(endpoint, query, body, options) {
    return Promise.promisify(APIUtils.get.bind(APIUtils))(...arguments)
  },
  post: function(endpoint, query, body, options, done) {
    if (arguments.length === 2) {
      done = query
      query = {}
    }

    const url = `${config.default.proxyRoot}${endpoint}`
    // const url = encodeURI(`${config.default.proxyRoot}${endpoint}`)

    debug('Sending POST request to %s', url, query)

    request
      // .withCredentials()
      .post(url)
      .type("form")
      // .set('Cookie', options && options.connectSid || '')
      // .set('accept-language', locale)
      .send(query)
      .end((err, res) => {
        debug('Received response %s from %s', res && res.status, url)
        if (err) {
          const errBody = JSON.parse(JSON.parse(JSON.stringify(err)).response.text)
          errBody.status = err.status

          if (err.status) {
            // Normalize statusCode vs. status
            err.statusCode = err.status
          }
          return done(errBody)
        }
        done(null, res.body)
      })
  },
  postP: function(endpoint, query, body, options, done) {
    return Promise.promisify(APIUtils.post.bind(APIUtils))(...arguments)
  },

  put: function(endpoint, query, body, options, done) {
    if (arguments.length === 2) {
      done = query
      query = {}
    }

    const url = `${config.default.proxyRoot}${endpoint}`
    // const url = encodeURI(`${config.default.proxyRoot}${endpoint}`)

    debug('Sending PUT request to %s', url, query)

    request
      // .withCredentials()
      .put(url)
      // .set('Cookie', options && options.connectSid || '')
      // .set('accept-language', locale)
      .send(query)
      .end((err, res) => {
        debug('Received response %s from %s', res && res.status, url)

        if (err) {
          const errBody = JSON.parse(JSON.parse(JSON.stringify(err)).response.text)
          errBody.status = err.status
          if (err.status) {
            // Normalize statusCode vs. status
            err.statusCode = err.status
            err.message = err.response.body
          }
          return done(errBody)
        }
        done(null, res.body)
      })
  },

  del: function(endpoint, query, options, done) {
    const url = `${config.default.proxyRoot}${endpoint}`
    // const url = encodeURI(`${config.default.proxyRoot}${endpoint}`)

    debug('Sending DELETE request to %s', url)

    // Customer key is required by the API
    // query = assign(query, {
    //   consumer_key: config.consumerKey
    // })

    request
      // .withCredentials()
      .del(url)
      // .set('Cookie', options && options.connectSid || '')
      // .set('accept-language', locale)
      .send(query)
      .end((err, res) => {
        debug('Received response %s from %s', res && res.status, url)

        if (err) {
          const errBody = JSON.parse(JSON.parse(JSON.stringify(err)).response.text)
          errBody.status = err.status
          if (err.status) {
            // Normalize statusCode vs. status
            err.statusCode = err.status
          }
          return done(errBody)
        }
        done(null, res.body)
      })
  }

}

module.exports = APIUtils
