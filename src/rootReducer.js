import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import user from './users/reducers/user'
import popup from './system/reducers/popup'

export default combineReducers({
  popup,
  user,
  router,
})
