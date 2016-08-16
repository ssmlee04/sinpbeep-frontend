/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getAchievements } from '../../achievements/reducers/achievement'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminAchievementsContainer extends React.Component<void, Props, void> {
  static propTypes = {
    achievements: PropTypes.array,
    user: PropTypes.object,
    getAchievements: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchProfile()
    this.props.getAchievements()
  }

  componentDidUpdate () {
    const { user } = this.props
    if (!user.isRootAdmin) {
      window.location.href = '/'
    }
  }

  render () {
    const { user, achievements } = this.props
    if (!user.isAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>
        {achievements.map((d, i) => {
          return <div>
            <Link to={`/zadmin/achievements/${d._id}`}>{d.name}</Link> 
          </div>
        })}
        <Link to={`/zadmin/achievements/create`}>create an achievement</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  achievements: state.achievement.achievements,
})
export default connect((mapStateToProps), {
  fetchProfile, getAchievements
})(AdminAchievementsContainer)
