/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
// import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminConsoleContainer extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    fetchProfile: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.fetchProfile()
  }

  componentDidUpdate () {
    const { user } = this.props
    if (!user.isAdmin) {
      window.location.href = '/'
    }
  }

  render () {
    const { user } = this.props
    if (!user.isAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='quotefont site'>
        <Link to={'/zadmin/deposits'}>monitor deposits:</Link> <br/> 
        <Link to={'/zadmin/coupons'}>monitor coupons:</Link> <br/> 
        <Link to={'/zadmin/money'}>monitor money:</Link> <br/> 
        <Link to={'/zadmin/ranks'}>monitor ranks:</Link> <br/> 
        <Link to={'/zadmin/events'}>monitor events:</Link> <br/> 
        <Link to={'/zadmin/couponuse'}>monitor couponuses:</Link> <br/> 
        <Link to={'/zadmin/products'}>monitor product: </Link>(done) <br/> 
        <Link to={'/zadmin/zones/countries'}>monitor countries, states, cities: </Link>(done) <br/> 
        <Link to={'/zadmin/industries'}>monitor industries:</Link> (done) <br/> 
        <Link to={'/zadmin/achievements'}>monitor achievements:</Link> (done) <br/> 
        <Link to={'/shops'}>monitor shops:</Link> (partially done) <br/> 
        <Link to={'/zadmin/users'}>monitor users: </Link> (done)<br/> 
        <Link to={'/zadmin/currency'}>monitor currency:</Link><br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect((mapStateToProps), {
  fetchProfile
})(AdminConsoleContainer)
