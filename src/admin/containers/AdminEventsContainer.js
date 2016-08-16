/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getEvents } from '../../events/reducers/event'
import ReactDOM from 'react-dom'
import EventListCell from '../../admin/components/EventListCell'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminEventsContainer extends React.Component<void, Props, void> {
  static propTypes = {
    events: PropTypes.array,
    user: PropTypes.object,
    getEvents: PropTypes.func.isRequired,
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

  getEvents () {
    const entity_id = ReactDOM.findDOMNode(this.refs.entity_id).value
    const status = ReactDOM.findDOMNode(this.refs.status).value
    const owner_id = ReactDOM.findDOMNode(this.refs.owner_id).value
    this.props.getEvents({entity_id, status, owner_id})
  }

  render () {
    const { user, events } = this.props
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

        <button onClick={this.getEvents.bind(this)}>search</button>

        {events.map((d, i) => {
          return <EventListCell event={d} key={i}/>
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  events: state.event.events,
})
export default connect((mapStateToProps), {
  fetchProfile, getEvents
})(AdminEventsContainer)
