import React from 'react'
import { Route, IndexRoute } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout'
import HomeView from 'system/components/HomeView'
import LoginContainer from 'system/containers/LoginContainer'
import ThankyouComponent from 'system/components/ThankyouComponent'
import VerifyEmailContainer from 'system/containers/VerifyEmailContainer'
import RegisterContainer from 'system/containers/RegisterContainer'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <Route path='/auth/login' component={LoginContainer} />
    <Route path='/auth/register' component={RegisterContainer} />
    <Route path='/thankyou' component={ThankyouComponent} />
    <Route path='/verify/:hash' component={VerifyEmailContainer} />
    <Route path='*' component={HomeView} />
    <IndexRoute component={HomeView} />
  </Route>
)
