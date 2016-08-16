/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getMyEntity, createEntity } from '../../entities/reducers/entity'
import ReactDOM from 'react-dom'
// import {Tabs, TabLink, TabContent} from 'react-tabs-redux'
// import './../styles/Tab.scss'

type Props = {
  user: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class OwnerConsoleContainer extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    entity: PropTypes.object,
    createEntity: PropTypes.func.isRequired,
    getMyEntity: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.getMyEntity()
  }

  // createEntity () {
  //   const name = ReactDOM.findDOMNode(this.refs.name).value
  //   const description = ReactDOM.findDOMNode(this.refs.description).value
  //   const phone = ReactDOM.findDOMNode(this.refs.phone).value
  //   const address = ReactDOM.findDOMNode(this.refs.address).value
  //   const contact = ReactDOM.findDOMNode(this.refs.contact).value
  //   this.props.createEntity({name, description, phone, address, contact})
  // }

  render () {
    const { user = {shops: []}, entity = {} } = this.props
    const { shops = [] } = user
    const { groups = [], users = [] } = entity
    const entityId = entity._id

    return (
      <div className='quotefont site' style={{marginTop: '58px'}}>
        <Link to={`/console/events`}>checkout my events....</Link><br/>
        <Link to={`/console/entity`}>checkout my entity....</Link><br/>
        <Link to={`/console/entityadduserrequests`}>checkout my entity adduser requests....</Link><br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  entity: state.entity.entity,
})
export default connect((mapStateToProps), {
  fetchProfile, getMyEntity, createEntity
})(OwnerConsoleContainer)
