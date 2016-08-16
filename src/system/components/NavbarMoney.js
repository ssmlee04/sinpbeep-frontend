import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { logout, fetchProfile } from '../../users/reducers/user'

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class NavbarMoney extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    fetchProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }

  render () {
    const { user = {} } = this.props
    const { money = {} } = user
    const displayCurrency = (name, amount) => {
      if (!amount || !name || amount === '0' || amount === 0) {
        return <span/>
      } else {
        return <span>{name}: {amount}.&nbsp;</span>
      }
    }

    return (
      <div className='row quotefont' style={{width: '400px', textAlign: 'right'}}>
        <div className='col-md-offset-1 col-md-10'>
          {displayCurrency('NTD', money.twd)}
          {displayCurrency('USD', money.usd)}
          {displayCurrency('RMB', money.cny)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect((mapStateToProps), {
  fetchProfile, logout
})(NavbarMoney)
