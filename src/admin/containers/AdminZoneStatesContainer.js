/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getStates } from '../../zones/reducers/country'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminZoneStatesContainer extends React.Component<void, Props, void> {
  static propTypes = {
    states: PropTypes.array,
    user: PropTypes.object,
    params: PropTypes.object,
    getStates: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  };

  componentDidMount () {
    const zid = `${this.props.params.zid}`
    this.props.fetchProfile()
    this.props.getStates(zid)
  }

  componentDidUpdate () {
    const { user } = this.props
    if (!user.isRootAdmin) {
      window.location.href = '/'
    }
  }

  render () {
    const { user, states } = this.props
    if (!user.isAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>
        {states.map((d, i) => {
          return <div>
            <Link to={`/zadmin/zones/countries/${d.zid}/states/${d.sid}`}>{d.zn} - {d.sn}</Link> 
          </div>
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  states: state.country.states,
})
export default connect((mapStateToProps), {
  fetchProfile, getStates
})(AdminZoneStatesContainer)
