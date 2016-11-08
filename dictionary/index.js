'use strict'
// var ar = require('./dict/ar')
var en = require('./dict/en')
// var de = require('./dict/de')
// var es = require('./dict/es')
// var ru = require('./dict/ru')
var zhHans = require('./dict/zh-Hans')
var zhHant = require('./dict/zh-Hant')

var languages = [{
  default: true,
  identifier: 'en',
  name: 'English'
}, {
  identifier: 'zh-Hant',
  name: '中文 (繁體)'
}, {
  identifier: 'zh-Hans',
  name: '中文 (简体)'
}]

module.exports = (function() {
  var that = {}
  languages.map(function(d) {
    if (d.default) {
      that.lang = d.identifier
    } 
  })
  return {
    lang: function() {
      return that.lang
    },
    list: function() {
      return languages
    },
    configure: function(lang) {
      that.lang = lang
    },
    parse: function(str) {
      if (!str) {
        return 'Something is wrong'
      }
      if (str.indexOf('text-') === -1) {
        return 'Something is wrong'
      }
      
      if (that.lang === 'en') {
        return en[str] || str
      // } else if (that.lang === 'ar') {
      //   return ar[str] || str
      // } else if (that.lang === 'de') {
      //   return de[str] || str
      // } else if (that.lang === 'ru') {
      //   return ru[str] || str
      // } else if (that.lang === 'es') {
      //   return es[str] || str
      } else if (that.lang === 'zh-Hans') {
        return zhHans[str] || str
      } else if (that.lang === 'zh-Hant') {
        return zhHant[str] || str
      } else {
        return str
      }
    }
  }
})()
