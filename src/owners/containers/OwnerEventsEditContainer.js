/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login, fetchProfile } from '../../users/reducers/user'
import { getMyEntity } from '../../entities/reducers/entity'
import { getOwnerEvent, checkoutCreateEvent } from '../../events/reducers/event'
import { buyCoupon } from '../../coupons/reducers/coupon'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class OwnerEventsEditContainer extends React.Component<void, Props, void> {
  static propTypes = {
    event: PropTypes.object,
    params: PropTypes.object,
    user: PropTypes.object,
    events: PropTypes.array,
    getOwnerEvent: PropTypes.func.isRequired,
    getMyEntity: PropTypes.func.isRequired,
    checkoutCreateEvent: PropTypes.func.isRequired,
    buyCoupon: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  };

  checkoutCreateEvent () {
    const eventId = `${this.props.params.eventId}`
    this.props.checkoutCreateEvent(eventId)
  }

  componentDidMount () {
    const eventId = `${this.props.params.eventId}`
    this.props.getOwnerEvent(eventId)
  }

  render () {
    const { user = {shops: []}, event = [] } = this.props
    
    return (
      <div className='quotefont' style={{marginTop: '58px'}}>
        name : {event.name} <br/>
        id : {event.id} <br/>
        status : {event.status} <br/>
        description : {event.description} <br/>
        entity_id : {event.entity_id} <br/>
        entitygroup_id : {event.entitygroup_id} <br/>
        start : {event.start} <br/>
        end : {event.end} <br/>
        is_ongoing : {event.is_ongoing} <br/>
        product_id : {event.product_id} <br/>
        price : {event.price} <br/>
        total : {event.total} <br/>
        currency : {event.currency} <br/>
        status : {event.status} <br/>
        <button onClick={this.checkoutCreateEvent.bind(this)}>check </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  event: state.event.event
})
export default connect((mapStateToProps), {
  fetchProfile, getOwnerEvent, getMyEntity, buyCoupon, checkoutCreateEvent
})(OwnerEventsEditContainer)
