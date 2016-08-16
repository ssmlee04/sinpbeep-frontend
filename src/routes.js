import React from 'react'
import { Route, IndexRoute } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout'
import HomeView from 'system/components/HomeView'
import PlaceContainer from 'places/containers/PlaceContainer'
import PlacesContainer from 'places/containers/PlacesContainer'
import UserComponent from 'users/components/UserComponent'
import LoginContainer from 'system/containers/LoginContainer'
import RegisterContainer from 'system/containers/RegisterContainer'
import LoginOwnerContainer from 'system/containers/LoginOwnerContainer'
import RegisterOwnerContainer from 'system/containers/RegisterOwnerContainer'
import NoMatch from 'system/containers/NoMatchContainer'
import ThankyouComponent from 'system/components/ThankyouComponent'

import EventsContainer from 'events/containers/EventsContainer'
import EventContainer from 'events/containers/EventContainer'

import PaymentContainer from 'payments/containers/PaymentContainer'
import CouponsContainer from 'coupons/containers/CouponsContainer'

import OwnerConsoleContainer from 'owners/containers/OwnerConsoleContainer'

import OwnerEntityGroupContainer from 'owners/containers/OwnerEntityGroupContainer'
import OwnerEntityContainer from 'owners/containers/OwnerEntityContainer'

import OwnerEntityAddUserRequestContainer from 'owners/containers/OwnerEntityAddUserRequestContainer'

import OwnerEventsContainer from 'owners/containers/OwnerEventsContainer'
import OwnerEventsCreateContainer from 'owners/containers/OwnerEventsCreateContainer'
import OwnerEventsEditContainer from 'owners/containers/OwnerEventsEditContainer'

import AdminEventsContainer from 'admin/containers/AdminEventsContainer'
import AdminConsoleContainer from 'admin/containers/AdminConsoleContainer'
import AdminPlaceEditContainer from 'admin/containers/AdminPlaceEditContainer'

import AdminAchievementsContainer from 'admin/containers/AdminAchievementsContainer'
import AdminAchievementEditContainer from 'admin/containers/AdminAchievementEditContainer'
import AdminAchievementCreateContainer from 'admin/containers/AdminAchievementCreateContainer'

import AdminIndustriesContainer from 'admin/containers/AdminIndustriesContainer'
import AdminIndustryCreateContainer from 'admin/containers/AdminIndustryCreateContainer'
import AdminIndustryEditContainer from 'admin/containers/AdminIndustryEditContainer'

import AdminUsersContainer from 'admin/containers/AdminUsersContainer'
import AdminUserEditContainer from 'admin/containers/AdminUserEditContainer'

import AdminProductEditContainer from 'admin/containers/AdminProductEditContainer'
import AdminProductCreateContainer from 'admin/containers/AdminProductCreateContainer'
import AdminProductsContainer from 'admin/containers/AdminProductsContainer'

import AdminZoneCountriesContainer from 'admin/containers/AdminZoneCountriesContainer'
import AdminZoneCountryContainer from 'admin/containers/AdminZoneCountryContainer'

import AdminZoneStatesContainer from 'admin/containers/AdminZoneStatesContainer'
import AdminZoneStateContainer from 'admin/containers/AdminZoneStateContainer'
import AdminZoneLocationContainer from 'admin/containers/AdminZoneLocationContainer'

import AdminCouponuseContainer from 'admin/containers/AdminCouponuseContainer'
import AdminRanksContainer from 'admin/containers/AdminRanksContainer'

import AdminCouponsContainer from 'admin/containers/AdminCouponsContainer'
import AdminMoneyContainer from 'admin/containers/AdminMoneyContainer'
import AdminDepositsContainer from 'admin/containers/AdminDepositsContainer'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <Route path='/user' component={UserComponent} />
    <Route path='/zadmin' component={AdminConsoleContainer} />
    <Route path='/zadmin/money' component={AdminMoneyContainer} />
    <Route path='/zadmin/events' component={AdminEventsContainer} />
    <Route path='/zadmin/users' component={AdminUsersContainer} />
    <Route path='/zadmin/users/:userId' component={AdminUserEditContainer} />

    <Route path='/zadmin/zones/location' component={AdminZoneLocationContainer} />

    <Route path='/zadmin/zones/countries' component={AdminZoneCountriesContainer} />
    <Route path='/zadmin/zones/countries/:zid' component={AdminZoneCountryContainer} />

    <Route path='/zadmin/zones/countries/:zid/states' component={AdminZoneStatesContainer} />
    <Route path='/zadmin/zones/countries/:zid/states/:sid' component={AdminZoneStateContainer} />

    <Route path='/zadmin/deposits' component={AdminDepositsContainer} />
    
    <Route path='/zadmin/products' component={AdminProductsContainer} />
    <Route path='/zadmin/products/create' component={AdminProductCreateContainer} />
    <Route path='/zadmin/products/:productId' component={AdminProductEditContainer} />

    <Route path='/zadmin/coupons' component={AdminCouponsContainer} />
    <Route path='/zadmin/couponuse' component={AdminCouponuseContainer} />

    <Route path='/zadmin/achievements' component={AdminAchievementsContainer} />
    <Route path='/zadmin/achievements/create' component={AdminAchievementCreateContainer} />
    <Route path='/zadmin/achievements/:achievementId' component={AdminAchievementEditContainer} />

    <Route path='/zadmin/industries' component={AdminIndustriesContainer} />
    <Route path='/zadmin/industries/create' component={AdminIndustryCreateContainer} />
    <Route path='/zadmin/industries/:industryId' component={AdminIndustryEditContainer} />

    <Route path='/zadmin/places/:placeId/edit' component={AdminPlaceEditContainer} />
    <Route path='/zadmin/ranks' component={AdminRanksContainer} />

    <Route path='/console' component={OwnerConsoleContainer} />
    <Route path='/console/entityadduserrequests' component={OwnerEntityAddUserRequestContainer} />
    <Route path='/console/entity' component={OwnerEntityContainer} />
    <Route path='/console/events' component={OwnerEventsContainer} />
    <Route path='/console/events/create' component={OwnerEventsCreateContainer} />
    <Route path='/console/events/:eventId' component={OwnerEventsEditContainer} />
    
    <Route path='/console/groups/:groupId' component={OwnerEntityGroupContainer} />

    <Route path='/coupons' component={CouponsContainer} />
    <Route path='/payments/:paymentId' component={PaymentContainer} />
    <Route path='/events' component={EventsContainer} />
    <Route path='/events/:eventId' component={EventContainer} />
    <Route path='/thankyou' component={ThankyouComponent} />
    <Route path='/places/:placeId' component={PlaceContainer} />
    <Route path='/places' component={PlacesContainer} />
    <Route path='/auth/login' component={LoginContainer} />
    <Route path='/auth/register' component={RegisterContainer} />
    <Route path='/auth/login-owner' component={LoginOwnerContainer} />
    <Route path='/auth/register-owner' component={RegisterOwnerContainer} />
    <Route path='*' component={NoMatch} />
    <IndexRoute component={HomeView} />
  </Route>
)
