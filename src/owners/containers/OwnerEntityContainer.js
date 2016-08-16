/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getMyEntity, createEntity, addUserToEntityByEmail } from '../../entities/reducers/entity'
import ReactDOM from 'react-dom'
// import {Tabs, TabLink, TabContent} from 'react-tabs-redux'
// import './../styles/Tab.scss'

type Props = {
  user: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class OwnerEntityContainer extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    entity: PropTypes.object,
    createEntity: PropTypes.func.isRequired,
    addUserToEntityByEmail: PropTypes.func.isRequired,
    getMyEntity: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.getMyEntity()
  }

  addUserToEntityByEmail() {
    const { entity = {} } = this.props
    const entityId = entity._id
    const email = ReactDOM.findDOMNode(this.refs.email).value
    this.props.addUserToEntityByEmail(entityId, {email})
  }

  createEntity () {
    const name = ReactDOM.findDOMNode(this.refs.name).value
    const description = ReactDOM.findDOMNode(this.refs.description).value
    const phone = ReactDOM.findDOMNode(this.refs.phone).value
    const address = ReactDOM.findDOMNode(this.refs.address).value
    const contact = ReactDOM.findDOMNode(this.refs.contact).value
    this.props.createEntity({name, description, phone, address, contact})
  }
  
  render () {
    const { user = {shops: []}, entity = {} } = this.props
    const { shops = [] } = user
    const { groups = [], users = [] } = entity
    const entityId = entity._id

    return (
      <div className='quotefont site'>
        {!entityId && 
          <div>
          create entity: 
          name: <input type='text' ref='name'/> <br/>
          description: <input type='text' ref='description'/> <br/>
          phone: <input type='text' ref='phone'/> <br/>
          address: <input type='text' ref='address'/> <br/>
          contact: <input type='text' ref='contact'/> <br/>
          <button onClick={this.createEntity.bind(this)}>create an entity</button>
          </div>
        }

        my entity id: {entity._id} <br/>
        my first group id: {entity && entity.groups && entity.groups[0].group_id} <br/>
        naem: {entity.name} <br/>

        my shops: <br/>
        {shops.map((d) => {
          return (<span>
            <Link to={`/places/${d.seoname}`}>{d.name}</Link><br/>
          </span>)
        })}
        <hr/>

        groups: <br/>
        {groups.map((d) => {
          return (<span>
            <Link to={`/console/groups/${d.group_id}`}>{d.name}</Link><br/>
          </span>)
        })}
        <hr/>

        users: <br/>
        {users.map((d) => {
          return (<span>
            user_id {d.user_id} <br/>
            name {d.name} <br/>
            email {d.email} <br/>
          </span>)
        })}
        add user into entity by email <input type='text' ref='email'/>
        <button onClick={this.addUserToEntityByEmail.bind(this)}>add</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  entity: state.entity.entity
})
export default connect((mapStateToProps), {
  fetchProfile, getMyEntity, createEntity, addUserToEntityByEmail
})(OwnerEntityContainer)
