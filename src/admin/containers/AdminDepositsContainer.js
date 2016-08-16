/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getDeposits } from '../../payments/reducers/payment'
import ReactDOM from 'react-dom'
import EventListCell from '../../admin/components/EventListCell'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminDepositsContainer extends React.Component<void, Props, void> {
  static propTypes = {
    deposits: PropTypes.array,
    user: PropTypes.object,
    getDeposits: PropTypes.func.isRequired,
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

  getDeposits () {
    const entity_id = ReactDOM.findDOMNode(this.refs.entity_id).value
    const status = ReactDOM.findDOMNode(this.refs.status).value
    const owner_id = ReactDOM.findDOMNode(this.refs.owner_id).value
    this.props.getDeposits({entity_id, status, owner_id})
  }

  render () {
    const { user, deposits } = this.props
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

        <button onClick={this.getDeposits.bind(this)}>search</button>

        {deposits.map((d, i) => {
          return <div>
          id: {d.id} ---- 
          provider: {d.provider} ---- 
          amount: {d.amount} ---- 
          currency: {d.currency} ---- 
          email: {d.email} ---- 
          itemdesc: {d.itemdesc} ---- 
          event_id: {d.event_id} ---- 
          coupon_id: {d.coupon_id} ---- 
          pay2go_id: {d.pay2go_id} ---- 
          stripe_id: {d.stripe_id} ---- 
          status: {d.status} ---- 
          <hr/>
          </div>
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  deposits: state.payment.deposits,
})
export default connect((mapStateToProps), {
  fetchProfile, getDeposits
})(AdminDepositsContainer)
