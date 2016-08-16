/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getState, editState } from '../../zones/reducers/country'
import { getLanguages } from '../../languages/reducers/language'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminZoneStateContainer extends React.Component<void, Props, void> {
  static propTypes = {
    state: PropTypes.object,
    languages: PropTypes.array,
    params: PropTypes.object,
    user: PropTypes.object,
    getState: PropTypes.func.isRequired,
    getLanguages: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  };

  componentDidMount () {
    const zid = `${this.props.params.zid}`
    const sid = `${this.props.params.sid}`
    this.props.fetchProfile()
    this.props.getState(zid, sid)
    this.props.getLanguages()
  }

  componentDidUpdate () {
    const { user, languages, state } = this.props
    if (!user.isRootAdmin) {
      window.location.href = '/'
    }

    if (state._id) {
      ReactDOM.findDOMNode(this.refs.sn).value = state.sn || ''
    }
  }

  editState(){
    // const { languages } = this.props
    // const zid = `${this.props.params.zid}`
    // const zn = ReactDOM.findDOMNode(this.refs.zn).value
    // let zns_ = {};
    // languages.map((d) => {
    //   zns_[d.identifier] = ReactDOM.findDOMNode(this.refs['description_' + d.identifier]).value
    // })

    // this.props.editState(zid, {zn, zns_})
  }

  render () {
    const { user, state, languages } = this.props
    if (!user.isAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>
        name: <input type='text' ref='sn' /><br/>
        <button className='btn btn-primary' onClick={this.editState.bind(this)}>save </button>
        <Link to={`/zadmin/zones/countries/${state.zid}/states/${state.sid}/cities`}>cities....</Link> 
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  state: state.country.state,
  languages: state.language.languages,
})
export default connect((mapStateToProps), {
  fetchProfile, getState, getLanguages, editState
})(AdminZoneStateContainer)
