/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getPlaces, resetPlaces } from '../../places/reducers/places'
import { setPlacename, setIndustry, setZone } from '../../system/reducers/system'
import SearchAreaPlaceName from './../../system/components/SearchAreaPlaceName'
import SearchAreaZone from './../../system/components/SearchAreaZone'
import SearchAreaIndustry from './../../system/components/SearchAreaIndustry'
import { fetchProfile } from '../../users/reducers/user'

type Props = {
  placename: String,
  iid: String,
};

class SearchArea extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    iid: PropTypes.string,
    lon: PropTypes.number,
    lat: PropTypes.number,
    zid: PropTypes.number,
    sid: PropTypes.number,
    cid: PropTypes.number,
    skip: PropTypes.number,
    placeQ: PropTypes.object,
    placesQ: PropTypes.object,
    placename: PropTypes.string,
    fetchProfile: PropTypes.func.isRequired,
    resetPlaces: PropTypes.func.isRequired,
    getPlaces: PropTypes.func.isRequired
  };

  resetPlaces(){
    this.props.resetPlaces()
  }

  loadMore() {
    const {placename, iid, lon, lat, zid, sid, cid, placeQ, skip, placesQ} = this.props
    let is_validated 
    if (ReactDOM.findDOMNode(this.refs.is_validated1)) {
      const is_validated1 = ReactDOM.findDOMNode(this.refs.is_validated1).checked
      const is_validated2 = ReactDOM.findDOMNode(this.refs.is_validated2).checked
      const is_validated3 = ReactDOM.findDOMNode(this.refs.is_validated3).checked
      if (is_validated1) {

      } else if (is_validated2) {
        is_validated = 1
      } else if (is_validated3) {
        is_validated = 0
      }
    }
    this.props.getPlaces({placename, iid, lon, lat, zid, sid, cid, placeQ, skip, placesQ, is_validated})
  }

  render() {
    const {iid, zid, sid, cid, lon, lat, placename, user} = this.props
    return (
      <div className='list-inline intro-social-buttons'>
        <SearchAreaPlaceName />
        <SearchAreaIndustry />
        <SearchAreaZone />
        <button onClick={this.loadMore.bind(this)} className='btn btn-primary btn-sm' style={{color: 'white'}}>Search</button>
        <input type='text' className='hide' ref='lon' value={lon}/>
        <input type='text' className='hide' ref='lat' value={lat}/>
        {user && user.roles && user.roles.indexOf('admin') > -1 && <div>
          both <input type='radio' name='validatedRadio' onClick={this.resetPlaces.bind(this)} ref='is_validated1' value=''/>
          validated only<input type='radio' name='validatedRadio' onClick={this.resetPlaces.bind(this)} ref='is_validated2' value='1'/>
          nonvalidated only<input type='radio' name='validatedRadio' onClick={this.resetPlaces.bind(this)} ref='is_validated3' value='0'/>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,

  hasMore: state.places.hasMore,
  placesQ: state.places.placesQ,
  // places: state.places.places,
  skip: state.places.skip,

  iid: state.system.iid,
  lon: state.system.lon,
  lat: state.system.lat,
  zid: state.system.zid,
  sid: state.system.sid,
  cid: state.system.cid,
  placename: state.system.placename,
})
export default connect((mapStateToProps), {
  getPlaces, setIndustry, setPlacename, setZone, fetchProfile, resetPlaces
})(SearchArea)
