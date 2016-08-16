/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

type Props = {

};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlaceEventsArea extends React.Component<void, Props, void> {
  static propTypes = {
    events: PropTypes.array
  }

  render () {
    const { events = [] } = this.props
    return (<div className='quotefont'>
      <div>ongoing events: </div>
      {events.map((d) => {
        return <div>
          <Link to={`/events/${d.event_id}`}>{d.name}</Link>
        </div>
      })}
      {!events.length && <span>there are no events for now..</span>}
      <hr />
    </div>)
  }
}

const mapStateToProps = (state) => ({

})
export default connect((mapStateToProps), {

})(PlaceEventsArea)
