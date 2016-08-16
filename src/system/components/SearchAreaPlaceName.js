/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { setPlacename, setLonLat } from '../../system/reducers/system'
import { resetPlacesSkip } from '../../places/reducers/places'
// import { fetchProfile, login } from '../../users/reducers/user'
import DebounceInput from 'react-debounce-input'
import Geosuggest from 'react-geosuggest'

type Props = {
};

let autocomplete

class SearchAreaPlaceName extends React.Component<void, Props, void> {
  static propTypes = {
    placename: PropTypes.string,
    resetPlacesSkip: PropTypes.func.isRequired,
    setPlacename: PropTypes.func.isRequired,
    setLonLat: PropTypes.func.isRequired,
    // login: PropTypes.func.isRequired
  }

  setPlacename(e) {
    var that = this;
    // setTimeout(function(){

    // }, 500)
    var proceed = function(){
      const placename = e
      that.props.setPlacename({placename})
      that.props.setLonLat({lon: 0, lat: 0})
      that.props.resetPlacesSkip()
    }
    proceed()
  }

  onSuggestSelect(e){
    this.props.setPlacename({placename: e.label})
    this.props.setLonLat({lon: e.location.lng, lat: e.location.lat})
    this.props.resetPlacesSkip()
  }

  render() {
    const { placename } = this.props
    // const { placenamePlaceholder } = this.state || {};

    return (
      <div className='inline' value={placename} >
        <div className='hide'>
          place.entershopname
        </div>
        <Geosuggest 
          initialValue={placename} 
          defaultValue={placename} 
          value={placename} 
          style={{width: '350px'}}
          types={['geocode']}
          onSuggestSelect={this.onSuggestSelect.bind(this)}
          onChange={this.setPlacename.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  placename: state.system.placename
})
export default connect((mapStateToProps), {
  setPlacename, setLonLat, resetPlacesSkip
})(SearchAreaPlaceName)
