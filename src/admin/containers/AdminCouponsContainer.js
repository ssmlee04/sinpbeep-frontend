/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getCoupons } from '../../coupons/reducers/coupon'
import ReactDOM from 'react-dom'
// import CouponListCell from '../../admin/components/CouponListCell'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminCouponsContainer extends React.Component<void, Props, void> {
  static propTypes = {
    coupons: PropTypes.array,
    user: PropTypes.object,
    getCoupons: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.fetchProfile()
  }

  componentDidUpdate () {
    const { user } = this.props
    if (!user.isAdmin) {
      window.location.href = '/'
    }
  }

  getCoupons () {
    const entity_id = ReactDOM.findDOMNode(this.refs.entity_id).value
    const status = ReactDOM.findDOMNode(this.refs.status).value
    const owner_id = ReactDOM.findDOMNode(this.refs.owner_id).value
    this.props.getCoupons({entity_id, status, owner_id})
  }

  render () {
    const { user, coupons } = this.props
    if (!user.isAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>
        status: <select ref='status'>
          <option value=''></option>
          <option value='0'>initial</option>
          <option value='1'>inserted</option>
          <option value='2'>processing</option>
          <option value='100'>processed</option>
          <option value='-1'>insert fail</option>
          <option value='-2'>processing fail</option>
          <option value='-100'>process fail</option>
        </select><br/>

        entity_id: <input type='text' ref='entity_id' /><br/>
        owner_id: <input type='text' ref='owner_id' /><br/>

        <button onClick={this.getCoupons.bind(this)}>search</button>

        {coupons.map((d, i) => {
          return <div>
            id: {d.id} ----- 
            name: {d.name}  ------
            user_id: {d.user_id}  ------
            status: {d.status}  ----- 
            event_id: {d.event_id} ------ 
            product_id: {d.product_id}  ------ 
            <hr/>
          </div>
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  coupons: state.coupon.coupons,
})
export default connect((mapStateToProps), {
  fetchProfile, getCoupons
})(AdminCouponsContainer)
