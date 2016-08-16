/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login, fetchProfile } from '../../users/reducers/user'
import { getMyEntity } from '../../entities/reducers/entity'
import { getEvents } from '../../events/reducers/event'
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
    user: PropTypes.object,
    events: PropTypes.array,
    getEvents: PropTypes.func.isRequired,
    getMyEntity: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.getEvents({})
  }

  render () {
    const { events = [] } = this.props

    return (
      <div className='quotefont' style={{marginTop: '58px'}}>
        {events.map((d) => {
          return (<span>
            <Link to={`/events/${d.id}`}>{d.name}</Link><br />
          </span>)
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  events: state.event.events
})
export default connect((mapStateToProps), {
  fetchProfile, getEvents, getMyEntity
})(EventsContainer)
