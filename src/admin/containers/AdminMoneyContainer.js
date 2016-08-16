/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getMoneys, getAllMoneyInfo } from '../../money/reducers/money'
import ReactDOM from 'react-dom'
import EventListCell from '../../admin/components/EventListCell'

type Props = {
  user: Object,
  // entity: Object,
};

export class AdminMoneyContainer extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    
    deposit_usd: PropTypes.object,
    deposit_twd: PropTypes.object,
    deposit_cny: PropTypes.object,

    sum_usd: PropTypes.object,
    sum_twd: PropTypes.object,
    sum_cny: PropTypes.object,

    sum_l_usd: PropTypes.object,
    sum_l_twd: PropTypes.object,
    sum_l_cny: PropTypes.object,
    moneys: PropTypes.array,
    getAllMoneyInfo: PropTypes.func.isRequired,
    getMoneys: PropTypes.func.isRequired,
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

  getMoneys () {
    const user_id = ReactDOM.findDOMNode(this.refs.user_id).value
    this.props.getMoneys({user_id})
  }

  getAllMoneyInfo () {
    this.props.getAllMoneyInfo()
  }

  render () {
    const { user, moneys, sum_usd, sum_twd, sum_cny, sum_l_usd, sum_l_twd, sum_l_cny, deposit_usd, deposit_cny, deposit_twd } = this.props
    if (!user.isAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    console.log(moneys)
    console.log(moneys)
    return (
      <div className='site'>
        <button onClick={this.getAllMoneyInfo.bind(this)}>getAllMoneyInfo</button>

        <br/>
        site money blance: <br/><br/>
        sum_usd: {sum_usd} <br/>
        sum_l_usd: {sum_l_usd} <br/>
        <br/>
        sum_twd: {sum_twd} <br/>
        sum_l_twd: {sum_l_twd} <br/>
        <br/>
        sum_cny: {sum_cny} <br/>
        sum_l_cny: {sum_l_cny} <br/>
        <br/>

        deposits: <br/><br/>
        deposit_usd: {deposit_usd} <br/>
        deposit_twd: {deposit_twd} <br/>
        deposit_cny: {deposit_cny} <br/>
        <hr/>

        user_id: <input type='text' ref='user_id' /><br/>
        <button onClick={this.getMoneys.bind(this)}>search</button>

        <table className='table table-hover'>
        <thead>
        <tr>
          <th>id</th>
          <th>twd</th>
          <th>usd</th>
          <th>l_twd</th>
          <th>l_usd</th>
        </tr>
        </thead>
        {moneys.map((d, i) => {
          return <tr>
            <td> {d.user_id} &nbsp;&nbsp;</td>
            <td> {d.twd} &nbsp;&nbsp;</td>
            <td> {d.usd} &nbsp;&nbsp;</td>
            <td>{d.l_twd && <span> {d.l_twd} &nbsp;&nbsp;</span>}</td>
            <td>{d.l_usd && <span> {d.l_usd} &nbsp;&nbsp;</span>}</td>
          </tr>  
        })}
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  moneys: state.money.moneys,
  deposit_usd: state.money.deposit_usd,
  deposit_twd: state.money.deposit_twd,
  deposit_cny: state.money.deposit_cny,
  sum_usd: state.money.sum_usd,
  sum_twd: state.money.sum_twd,
  sum_cny: state.money.sum_cny,
  sum_l_usd: state.money.sum_l_usd,
  sum_l_twd: state.money.sum_l_twd,
  sum_l_cny: state.money.sum_l_cny,
})
export default connect((mapStateToProps), {
  fetchProfile, getMoneys, getAllMoneyInfo
})(AdminMoneyContainer)
