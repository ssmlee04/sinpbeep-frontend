'use strict'

import { getP } from '../../../utils/APIUtils'

module.exports = (() => {
  return {
    get: () => {
      return getP('/apis/v1/zone/countries', {}, {})
    }
  }
})()
