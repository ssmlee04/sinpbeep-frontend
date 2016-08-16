/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

type Props = {
  user: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class EventListCell extends React.Component<void, Props, void> {
  static propTypes = {
    event: PropTypes.object,
  }

  render () {
    const { event } = this.props
    return (
      <div className='quotefont site'>
      id: {event.id} -------
      name: {event.name} -------
      description: {event.description} -------
      status: {event.status} -------
      price: {event.price} -------
      total: {event.total} -------
      currency: {event.currency} -------
      <hr/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})
export default connect((mapStateToProps), {

})(EventListCell)
