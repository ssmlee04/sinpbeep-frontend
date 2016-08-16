'use strict'

import { getP } from '../../../utils/APIUtils'

module.exports = (() => {
  return {
    get: () => {
      console.log('doing get...')
      return getP('/apis/v1/industry', {}, {})
    }
  }
})()
