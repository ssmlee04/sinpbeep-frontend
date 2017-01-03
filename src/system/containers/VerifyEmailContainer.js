/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login, fetchProfile, verify } from '../../users/reducers/user'

type Props = {
  user: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class VerifyEmailContainer extends React.Component<void, Props, void> {
  static propTypes = {
    params: PropTypes.object,
    user: PropTypes.object,
    verify: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { user } = this.props;
    const hash = `${this.props.params.hash}`

    this.props.verify(hash)
  }

  render() {
    const hash = `${this.props.params.hash}`

    return (
      <div className='quotefont' style={{marginTop: '58px'}}>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className='row'>
          <div className='col-md-offset-4 col-md-6'>
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
  fetchProfile, verify
})(VerifyEmailContainer)
