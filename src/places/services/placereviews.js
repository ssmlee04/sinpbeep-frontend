"use strict";

import { getP } from "../../../utils/APIUtils";

module.exports = (() => {
  return {
    get: ({placeId, skip}) => {
      return getP(`/apis/v1/places/${placeId}/reviews`, {skip}, {})
    }
  }
})()
