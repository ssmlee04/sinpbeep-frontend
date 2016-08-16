/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { login, fetchProfile } from '../../users/reducers/user'

type Props = {
  user: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class NoMatchContainer extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object
  };

  render () {
    return (
      <div className='quotefont' style={{marginTop: '258px', marginLeft: '258px', marginBottom: '258px'}}>
        404 not found...
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect((mapStateToProps), {
  fetchProfile
})(NoMatchContainer)
