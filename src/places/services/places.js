"use strict";

import { getP } from "../../../utils/APIUtils";

module.exports = (function(){
  return {
    get: function({skip, placesQ, zid, sid, cid, iid, placename, lon, lat, is_validated}){
      if (placesQ) {
        return getP(`/apis/v1/shops`, {skip, zid, sid, cid, iid, name: placename, lon, lat, is_validated}, {})
      } else {
        return getP(`/apis/v1/shops`, {skip, zid, sid, cid, iid, name: placename, lon, lat, is_validated}, {})
      }
    }
  }
})()
