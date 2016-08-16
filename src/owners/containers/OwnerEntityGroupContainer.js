/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login, fetchProfile } from '../../users/reducers/user'
import { getMyEntity, editMyEntityGroup, addMyEntityGroupShop, removeMyEntityGroupShop, addMyEntityGroupUser, removeMyEntityGroupUser } from '../../entities/reducers/entity'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  entity: Object,
};

const getUserId = function(d) {
  return d.user_id
}

const getShopId = function(d) {
  return d.shop_id
}

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class OwnerEntityGroupContainer extends React.Component<void, Props, void> {
  static propTypes = {
    params: PropTypes.object,
    user: PropTypes.object,
    entity: PropTypes.object,
    getMyEntity: PropTypes.func.isRequired,
    editMyEntityGroup: PropTypes.func.isRequired,
    addMyEntityGroupShop: PropTypes.func.isRequired,
    removeMyEntityGroupShop: PropTypes.func.isRequired,
    addMyEntityGroupUser: PropTypes.func.isRequired,
    removeMyEntityGroupUser: PropTypes.func.isRequired
  }

  componentDidMount () {
    // const groupId = `${this.props.params.groupId}`
    // this.props.fetchEntityGroup({groupId})
    this.props.getMyEntity()
  }

  editGroup (groupId) {
    const name = ReactDOM.findDOMNode(this.refs.name).value
    this.props.editMyEntityGroup({name, groupId})
  }

  addShopToGroup (shopId, groupId) {
    this.props.addMyEntityGroupShop({shopId, groupId})
  }

  removeShopFromGroup (shopId, groupId) {
    this.props.removeMyEntityGroupShop({shopId, groupId})
  }

  addUserToGroup (userId, groupId) {
    this.props.addMyEntityGroupUser({userId, groupId})
  }

  removeUserFromGroup (userId, groupId) {
    console.log(userId, groupId)
    this.props.removeMyEntityGroupUser({userId, groupId})
  }

  render () {
    const { user = {shops: []}, entity = {} } = this.props
    const that = this
    const { shops = [] } = user
    const { groups = [], users = [] } = entity
    const groupId = `${this.props.params.groupId}`
    const _groups = groups.filter((d) => {
      return d.group_id === groupId
    })
    const group = _groups && _groups[0] || {}
    console.log({users})
    return (
      <div className='quotefont' style={{marginTop: '58px'}}>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        old group name: {group.name} <br/>
        new group name: <input type='text' ref='name'/>
        <button onClick={this.editGroup.bind(this, groupId)}>edit name</button>

        <hr/>

        my shops:
        {shops.map(function(d) {
          let shopInGroup = (group.shops || []).indexOf(d.shop_id) > -1
          return (<span>
            <Link to={`/places/${d.seoname}`}>{d.name}</Link> 
            {!shopInGroup && <button onClick={that.addShopToGroup.bind(that, d.shop_id, groupId)}> + </button>}
            {shopInGroup && <button onClick={that.removeShopFromGroup.bind(that, d.shop_id, groupId)}> - </button>} <br/>
          </span>)
        })}<hr/>

        my users:
        {users.map(function(d) {
          let userInGroup = (group.users || []).indexOf(d.user_id) > -1
          return (<span>
            email: {d.email} <br/>
            name: {d.name} <br/>
            {!userInGroup && <button onClick={that.addUserToGroup.bind(that, d.user_id, groupId)}> + </button>}
            {userInGroup && <button onClick={that.removeUserFromGroup.bind(that, d.user_id, groupId)}> - </button>} <br/>
            <br/>
          </span>)
        })}<hr/>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  entity: state.entity.entity
})
export default connect((mapStateToProps), {
  fetchProfile, 
  getMyEntity, 
  editMyEntityGroup, 
  addMyEntityGroupShop, 
  removeMyEntityGroupShop,
  addMyEntityGroupUser, removeMyEntityGroupUser
})(OwnerEntityGroupContainer)
