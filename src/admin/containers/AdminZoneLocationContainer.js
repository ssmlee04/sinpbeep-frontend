/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getLocation, setLocation } from '../../zones/reducers/location'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminZoneLocationContainer extends React.Component<void, Props, void> {
  static propTypes = {
    loc: PropTypes.object,
    user: PropTypes.object,
    location: PropTypes.object,
    getLocation: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.fetchProfile()
  }

  componentDidUpdate () {
    const { user, loc } = this.props
    if (!user.isRootAdmin) {
      window.location.href = '/'
    }

    console.log(loc)
    if (loc._id) {
      ReactDOM.findDOMNode(this.refs.zn).value = loc && loc.lats && loc.lats[0].zn || ''
      ReactDOM.findDOMNode(this.refs.sn).value = loc && loc.lats && loc.lats[0].sn || ''
      ReactDOM.findDOMNode(this.refs.cn).value = loc && loc.lats && loc.lats[0].cn || ''
      ReactDOM.findDOMNode(this.refs.lon).value = loc && (loc.lon / 1000000) || ''
      ReactDOM.findDOMNode(this.refs.lat).value = loc && loc.lats && (loc.lats[0].lat / 1000000) || ''
    }
  }

  getLocation () {
    const lon = ReactDOM.findDOMNode(this.refs.lon).value
    const lat = ReactDOM.findDOMNode(this.refs.lat).value
    this.props.getLocation(lon, lat)
  }

  setLocation () {
    const lon = ReactDOM.findDOMNode(this.refs.lon).value
    const lat = ReactDOM.findDOMNode(this.refs.lat).value
    const zn = ReactDOM.findDOMNode(this.refs.zn).value
    const sn = ReactDOM.findDOMNode(this.refs.sn).value
    const cn = ReactDOM.findDOMNode(this.refs.cn).value
    this.props.setLocation(lon, lat, {zname: zn, sname: sn, cname: cn})
  }

  render () {
    const { user } = this.props
    if (!user.isAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>
        lon: <input type='text' ref='lon' /><br/>
        lat: <input type='text' ref='lat' /><br/>
        <button className='btn btn-primary' onClick={this.getLocation.bind(this)}>get location </button>
        <br />
        <br />
        <br />
        zn: <input type='text' ref='zn' /><br/>
        sn: <input type='text' ref='sn' /><br/>
        cn: <input type='text' ref='cn' /><br/>
        <button className='btn btn-primary' onClick={this.setLocation.bind(this)}>save </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  loc: state.location.location,
  languages: state.language.languages,
})
export default connect((mapStateToProps), {
  fetchProfile, getLocation, setLocation
})(AdminZoneLocationContainer)
