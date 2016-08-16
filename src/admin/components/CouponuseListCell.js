/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { processCouponuse } from '../../coupons/reducers/couponuse'

type Props = {
  user: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class CouponuseListCell extends React.Component<void, Props, void> {
  static propTypes = {
    couponuse: PropTypes.object,
    processCouponuse: PropTypes.func.isRequired,
  }

  processCouponuse (secret) {
    this.props.processCouponuse(secret)
  }

  render () {
    const { couponuse } = this.props
    return (
      <div className='quotefont'>
        status: {couponuse.status} <br/>
        price: {couponuse.price} <br/>
        total: {couponuse.total} <br/>
        currency: {couponuse.currency} <br/>
        <button onClick={this.processCouponuse.bind(this, couponuse.secret)}>process</button>
        <br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})
export default connect((mapStateToProps), {
  processCouponuse
})(CouponuseListCell)
