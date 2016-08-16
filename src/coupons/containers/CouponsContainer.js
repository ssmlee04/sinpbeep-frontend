/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login, fetchProfile } from '../../users/reducers/user'
import { getMyEntity } from '../../entities/reducers/entity'
import { getMyCoupons } from '../../coupons/reducers/coupon'
import ReactDOM from 'react-dom'
var QRCode = require('qrcode.react');

type Props = {
  user: Object,
  entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class CouponsContainer extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    coupons: PropTypes.array,
    getMyCoupons: PropTypes.func.isRequired,
    getMyEntity: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired,
  };

  componentDidMount () {
    this.props.getMyCoupons()
  }

  render () {
    const { user = {shops: []}, coupons = [] } = this.props
    return (
      <div className='quotefont site'>

        not yet used..... <br/>
        {coupons.map((d) => {
          if (d.is_used_by) {
            return <span/>
          }
          return (<span>
            <QRCode value={d.hash} />
            <a target='_blank' href={'/apis/v1/coupons/hash/' + d.hash}>verify</a> <br/>
            name: {d.Event.name} <br/> <br/>
            date_used: {d.date_used} <br/> <br/>
            description: {d.Event.description} <br/> <br/>
            requirements: {d.Event.requirements} <br/> <br/>
          </span>)
        })}

        <hr/>
        
        already used..... <br/>
        {coupons.map((d) => {
          if (!d.is_used_by) {
            return <span/>
          }
          return (<span>
            <QRCode value={d.hash} />
            <a target='_blank' href={'/apis/v1/coupons/hash/' + d.hash}>verify</a> <br/>
            name: {d.Event.name} <br/> <br/>
            description: {d.Event.description} <br/> <br/>
            requirements: {d.Event.requirements} <br/> <br/>
          </span>)
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  coupons: state.coupon.coupons
})
export default connect((mapStateToProps), {
  fetchProfile, getMyCoupons, getMyEntity
})(CouponsContainer)
