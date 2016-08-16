import Promise from "bluebird";

const localStorageService = (function(){
  return {
    get: function(key){
      return JSON.parse(localStorage.getItem(key))
    },
    set: function(key, obj, meta){
      localStorage.setItem(key, JSON.stringify(obj));
    }
  }
})()

module.exports = (function localStorageOrAPICall() {
  return function(key, fn) {
    if (!localStorageService.get(key)) {
      return fn()
      .then(function(d) {
        localStorageService.set(key, d);
        return d;
      });
    } else {
      return Promise.resolve(localStorageService.get(key));
    }
  }
})()

