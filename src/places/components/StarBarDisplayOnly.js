/* @flow */
// import React, { PropTypes } from 'react'
import React from 'react'
// import { connect } from 'react-redux'
// import { Link } from 'react-router'
import StarBar from '../../places/components/StarBar'

type Props = {
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export default class StarBarDisplayOnly extends React.Component<void, Props, void> {
  static propTypes = {
  }

  render () {
    return (
      <StarBar {...this.props} place={{}} displayOnly={true}/>
    )
  }
}
