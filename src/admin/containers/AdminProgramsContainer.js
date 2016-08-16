/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminProgramsContainer extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    fetchProfile: PropTypes.func.isRequired
  }

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
      <div className='site'>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})
export default connect((mapStateToProps), {
  fetchProfile, 
})(AdminProgramsContainer)
