/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login, fetchProfile } from '../../users/reducers/user'
import LoginComponentOwnerLocal from '../../system/components/LoginComponentOwnerLocal'

type Props = {
  user: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class LoginOwnerContainer extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    // login: PropTypes.func.isRequired
  };

  componentDidUpdate () {
    const { user } = this.props
    if (user && user._id) {
      window.location.href = '/console';
    }
  }

  render() {
    return (
      <div className='quotefont' style={{marginTop: '58px'}}>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className='row'>
          <div className='col-md-offset-6 col-md-6'>
            <br/>
            <br/>
          </div>
          <div className='col-md-offset-4 col-md-6'>
            <hr/>
            <LoginComponentOwnerLocal/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect((mapStateToProps), {
  fetchProfile
})(LoginOwnerContainer)