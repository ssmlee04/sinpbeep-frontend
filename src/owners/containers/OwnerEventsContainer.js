/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login, fetchProfile } from '../../users/reducers/user'
import { getMyEntity } from '../../entities/reducers/entity'
import { getOwnerEvents } from '../../events/reducers/event'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class OwnerEventsContainer extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    events: PropTypes.array,
    getOwnerEvents: PropTypes.func.isRequired,
    getMyEntity: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired,
  };

  componentDidUpdate () {

  }

  componentDidMount () {
    // const groupId = `${this.props.params.groupId}`
    // this.props.fetchEntityGroup({groupId})
    console.log(getOwnerEvents)
    console.log(getMyEntity)
    console.log(this.props.getOwnerEvents)
    console.log(this.props.getMyEntity)
    this.props.getOwnerEvents()
  }

  // editGroup(groupId){
  //   const name = ReactDOM.findDOMNode(this.refs.name).value
  //   this.props.editMyEntityGroup({name, groupId})
  // }

  render () {
    const { user = {shops: []}, events = [] } = this.props
    // const that = this
    // const { shops = [] } = user
    // const { groups = [] } = entity
    // const groupId = `${this.props.params.groupId}`
    // const _groups = groups.filter(function(d){
    //   return d.entitygroup_id === groupId;
    // })
    // const group = _groups && _groups[0] || {}
    const events0 = events.filter((d) => {return d.status === 0})
    const events1 = events.filter((d) => {return d.status === 1})
    const events2 = events.filter((d) => {return d.status === 2})
    const events100 = events.filter((d) => {return d.status === 100})
    const eventsminus1 = events.filter((d) => {return d.status === -1})
    const eventsminus2 = events.filter((d) => {return d.status === -2})
    const eventsminus100 = events.filter((d) => {return d.status === -100})

    console.log(events)
    return (
      <div className='quotefont' style={{marginTop: '58px'}}>

        list of events in your entity:
        events0: 
        {events0.map(function(d) {
          return (<span>
            <Link to={`/console/events/${d.id}`}>{d.name}</Link><br/>
          </span>)
        })}
        <hr/>
        events1: 
        {events1.map(function(d) {
          return (<span>
            <Link to={`/console/events/${d.id}`}>{d.name}</Link><br/>
          </span>)
        })}
        <hr/>
        events2: 
        {events2.map(function(d) {
          return (<span>
            <Link to={`/console/events/${d.id}`}>{d.name}</Link><br/>
          </span>)
        })}
        <hr/>
        events100: 
        {events100.map(function(d) {
          return (<span>
            <Link to={`/console/events/${d.id}`}>{d.name}</Link><br/>
          </span>)
        })}
        <hr/>
        eventsminus1: 
        {eventsminus1.map(function(d) {
          return (<span>
            <Link to={`/console/events/${d.id}`}>{d.name}</Link><br/>
          </span>)
        })}
        <hr/>
        eventsminus2: 
        {eventsminus2.map(function(d) {
          return (<span>
            <Link to={`/console/events/${d.id}`}>{d.name}</Link><br/>
          </span>)
        })}
        <hr/>
        eventsminus100: 
        {eventsminus100.map(function(d) {
          return (<span>
            <Link to={`/console/events/${d.id}`}>{d.name}</Link><br/>
          </span>)
        })}
        <hr/>

        <Link to={`/console/events/create`}>create an event.</Link>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  events: state.event.events
})
export default connect((mapStateToProps), {
  fetchProfile, getOwnerEvents, getMyEntity
})(OwnerEventsContainer)
