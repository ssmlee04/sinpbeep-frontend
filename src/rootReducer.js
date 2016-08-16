import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
// import counter from './modules/counter'
import user from './users/reducers/user'
import zone from './zones/reducers/zone'
import currency from './currency/reducers/currency'
import stats from './stats/reducers/stats'
import places from './places/reducers/places'
import place from './places/reducers/place'
import placereviews from './places/reducers/placereviews'
import placeimages from './places/reducers/placeimages'
import placevote from './places/reducers/placevote'
import industry from './industry/reducers/industry'
import system from './system/reducers/system'
import popup from './system/reducers/popup'
import owner from './owners/reducers/owner'
import entity from './entities/reducers/entity'
import event from './events/reducers/event'
import payment from './payments/reducers/payment'
import coupon from './coupons/reducers/coupon'
import couponuse from './coupons/reducers/couponuse'
import achievement from './achievements/reducers/achievement'
import otheruser from './users/reducers/otheruser'
import language from './languages/reducers/language'
import product from './products/reducers/product'
import country from './zones/reducers/country'
import money from './money/reducers/money'
import location from './zones/reducers/location'
import placerank from './places/reducers/placerank'
import entityadduser from './entities/reducers/entityadduser'

export default combineReducers({
  // counter,
  user,
  router,
  industry,
  zone,
  place,
  places,
  currency,
  stats,
  placeimages,
  placereviews,
  placevote,
  system,
  owner,
  popup,
  entity,
  event,
  payment,
  coupon,
  achievement,
  language,
  otheruser,
  product,
  country,
  location,
  couponuse,
  placerank,
  money,
  entityadduser,
})
