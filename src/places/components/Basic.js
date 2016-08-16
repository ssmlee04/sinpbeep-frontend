/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

type Props = {
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class Basic extends React.Component<void, Props, void> {
  static propTypes = {
  }

  render () {
    return <div/>
  }
}

const mapStateToProps = (state) => ({

})
export default connect((mapStateToProps), {

})(Basic)
