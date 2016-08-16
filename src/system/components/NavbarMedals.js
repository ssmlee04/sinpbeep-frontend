import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { logout, fetchProfile } from '../../users/reducers/user'
import './../styles/NavbarMedal.scss'

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class NavbarMedal extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    fetchProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }

  render () {
    const { user } = this.props
    var userBalance
    var userGoalMedal
    var userSilverMedal
    var userCopperMedal

    var medalStyle = {
      'color': 'gray'
    }

    if (user && user.balance) {
      userBalance = (<span><span className='money'></span><span style={{marginLeft: '5px', marginRight: '3px'}}>{user.balance}</span></span>)
    }
    if (user && user.achievements && user.achievements.gold) {
      userGoalMedal = (<span><span className='gold'></span><span style={{marginLeft: '5px', marginRight: '3px'}}>{user.achievements.gold}</span></span>)
    }
    if (user && user.achievements && user.achievements.silver) {
      userSilverMedal = (<span><span className='silver'></span><span style={{marginLeft: '5px', marginRight: '3px'}}>{user.achievements.silver}</span></span>)
    }
    if (user && user.achievements && user.achievements.copper) {
      userCopperMedal = (<span><span className='copper'></span><span style={{marginLeft: '5px', marginRight: '3px'}}>{user.achievements.copper}</span></span>)
    }
    return (
      <div className='usermedal quotefont' style={medalStyle}>
        {userBalance}
        {userGoalMedal}
        {userSilverMedal}
        {userCopperMedal}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect((mapStateToProps), {
  fetchProfile, logout
})(NavbarMedal)
