// Load different configs for production or development

let configFile = 'dev.js'

if (process.env.NODE_ENV === 'production') {
  configFile = 'prod.js'
}
if (process.env.NODE_ENV === 'stage') {
  configFile = 'stage.js'
}
if (process.env.NODE_ENV === 'dev-server') {
  configFile = 'dev-server.js'
}

export default require(`./${configFile}`)
