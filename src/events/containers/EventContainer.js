/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login, fetchProfile } from '../../users/reducers/user'
import { getMyEntity } from '../../entities/reducers/entity'
import { getEvent } from '../../events/reducers/event'
import { checkBuyingCondition, buyEventCoupon, prepareCouponBuy, checkoutButNoPreprocessReservedCoupon, checkoutPreprocessReservedCoupon } from '../../coupons/reducers/coupon'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class EventsContainer extends React.Component<void, Props, void> {
  static propTypes = {
    params: PropTypes.object,
    prepareCouponId: PropTypes.object,
    prepareDepositId: PropTypes.object,
    event: PropTypes.object,
    user: PropTypes.object,
    events: PropTypes.array,
    getEvent: PropTypes.func.isRequired,
    getMyEntity: PropTypes.func.isRequired,
    checkBuyingCondition: PropTypes.func.isRequired,
    buyEventCoupon: PropTypes.func.isRequired,
    prepareCouponBuy: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired,
    // checkoutReservedCoupon: PropTypes.func.isRequired,
    checkoutPreprocessReservedCoupon: PropTypes.func.isRequired,
    checkoutButNoPreprocessReservedCoupon: PropTypes.func.isRequired,
  }

  componentDidMount () {
    const eventId = `${this.props.params.eventId}`
    this.props.getEvent(eventId)
  }

  buyEventCoupon (eventId) {
    this.props.buyEventCoupon({eventId})
  }

  prepareCouponBuy (eventId) {
    const provider = ReactDOM.findDOMNode(this.refs.provider).value
    this.props.prepareCouponBuy({eventId, provider})
  }

  checkoutReservedCoupon (prepareCouponId, prepareDepositId) {
    const provider = ReactDOM.findDOMNode(this.refs.provider).value
    console.log(provider)
    console.log(provider)
    if (provider === 'pay2go') {
      this.props.checkoutPreprocessReservedCoupon(prepareCouponId, prepareDepositId)
    } else if (provider === 'stripe') {
      this.props.checkoutButNoPreprocessReservedCoupon(prepareCouponId, prepareDepositId)
    }  else {
      console.log('something is wrong....')
    }
    // this.props.checkoutReservedCoupon(prepareCouponId, prepareDepositId)
  }

  render () {
    const { user = {shops: []}, event = {}, prepareCouponId, prepareDepositId } = this.props
    
    return (
      <div className='quotefont' style={{marginTop: '58px'}}>

      prepareCouponId {prepareCouponId} <br/>
      prepareDepositId {prepareDepositId} <br/>

        name: {event.name}  <br/>
        description: {event.description}  <br/>
        requirements: {event.requirements}  <br/>
        price: {event.price} {event.currency}<br/>

        unit: {event.price} {event.unit}<br/>
        left: {event.price} {event.left}<br/>
        <button onClick={this.buyEventCoupon.bind(this, event.id)}>buy coupon with money</button>

        <select ref='provider'>
          <option value='pay2go'>pay2go</option>
          <option value='stripe'>stripe</option>
        </select>

        <button onClick={this.prepareCouponBuy.bind(this, event.id)}>buy coupon and pay later</button>

        {prepareDepositId && <a href={`/payments/${prepareDepositId}`} target='_blank'>go to payment page...</a>}
        {prepareCouponId && <button onClick={this.checkoutReservedCoupon.bind(this, prepareCouponId, prepareDepositId)}>check deposit and create coupon</button>}

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  event: state.event.event,
  prepareCouponId: state.coupon.prepareCouponId,
  prepareDepositId: state.coupon.prepareDepositId,
})
export default connect((mapStateToProps), {
  fetchProfile, 
  getEvent, 
  getMyEntity, 
  checkBuyingCondition, 
  buyEventCoupon, 
  prepareCouponBuy, 
  checkoutButNoPreprocessReservedCoupon, 
  checkoutPreprocessReservedCoupon
})(EventsContainer)
