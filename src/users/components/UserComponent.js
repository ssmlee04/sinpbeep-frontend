/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
// import createFragment from 'react-addons-create-fragment';

// import DuckImage from './Duck.jpg'
// import classes from './UserComponent.scss'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
  user: Array,
  fetchProfile: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class UserComponent extends React.Component<void, Props, void> {
  static propTypes = {
    // user: PropTypes.shape({
    //   achievements: PropTypes.array
    // }),
    user: PropTypes.object,
    fetchProfile: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchProfile();
  }

  render () {
    const { user } = this.props;
    return (
      <div className='container text-center'>
        {user.name}
        <Link to={'/'}>homeE</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect((mapStateToProps), {
  fetchProfile
})(UserComponent)
