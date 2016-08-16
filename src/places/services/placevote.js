"use strict";

import { postP } from "../../../utils/APIUtils";

module.exports = (() => {
  return {
    setPlaceTime: ({shopId, high, low}) => {
      return postP("/apis/v1/shops/" + shopId + "/time", {high, low}, {}, {})
    },
    setPlacePrice: ({shopId, high, low, currency}) => {
      return postP("/apis/v1/shops/" + shopId + "/price", {high, low, currency}, {}, {})
    },
    setPlaceStatVote: ({shopId, statId, vote}) => {
      return postP("/apis/v1/shops/" + shopId + "/statslike", {statId, vote}, {}, {})
    }
  }
})()
