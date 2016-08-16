"use strict";

import { postP } from "../../../utils/APIUtils";

module.exports = (function(){
  return {
    set: function({shopId, vote}){
      return postP(`/apis/v1/shops/${shopId}/setavatarbyvote/${vote}`, {}, {}, {})
    }
  }
})()
