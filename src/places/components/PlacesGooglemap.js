/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps'

type Props = {
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlacesGooglemap extends React.Component<void, Props, void> {
  static propTypes = {
    places: PropTypes.array,
    markerKey: PropTypes.object,
    zoom: PropTypes.number,
  }

  render() {
    const that = this
    const {places, markerKey} = this.props

    if (!global.google) {
      return (<div />)
    }
    if (!places || !places[0] || !places[0]._id) {
      return (<div />)
    }
    let {zoom} = this.props
    zoom = zoom || 16
    let lon = 0
    let lat = 0
    var latlngList = []
    var bounds = new google.maps.LatLngBounds()
    var l = (places || []).length
    var l0 = l
    var lL
    var coordinate

    while (l--) {
      coordinate = places[l].loc || [0, 0]
      lat += coordinate[1]
      lon += coordinate[0]
    }
    lon /= l0
    lat /= l0
    while (l0--) {
      coordinate = places[l0].loc
      latlngList.push(new google.maps.LatLng((coordinate[1] - lat) * 1 + lat, (coordinate[0] - lon) * 1 + lon))
    }

    lL = latlngList.length

    while (lL--) {
      bounds.extend(latlngList[lL])
    }
    this.refs.map && this.refs.map.fitBounds && this.refs.map.fitBounds(bounds)

    var lon_max = -180
    var lon_min = 180
    var lat_max = -90
    var lat_min = 90
    var lon_avg = 0
    var lat_avg = 0
    var markers = (places || []).map(function(d){
      let lat = d.loc && d.loc[1] || 0
      let lon = d.loc && d.loc[0] || 0
      if (lat > lat_max) lat_max = lat
      if (lat < lat_min) lat_min = lat
      if (lon > lon_max) lon_max = lon
      if (lon < lon_min) lon_min = lon
      lon_avg = (lon_min + lon_max) / 2
      lat_avg = (lat_min + lat_max) / 2
      return {
        name: d.name,
        image: d.image,
        avatar: d.avatar,
        position: {
          lat: d.loc && d.loc[1] || 200,
          lng: d.loc && d.loc[0] || 200,
        },
        key: d.seoname || '',
        animation: 2
      }
    })

    function toMarker(marker, index) {
      var image = {
        url: marker.avatar || '',
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(40, 40),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        // anchor: new google.maps.Point(0, 32)
      }

      if (marker && markerKey === marker.key) {
        return (
          <Marker
            position={marker.position}
            key={marker.key + '1'}
            title={'Hello World!'}
            label={(index+1).toString()}
            icon={'//www.clker.com/cliparts/C/B/K/k/v/t/map-pin-light-green-th.png'}
            animation={marker.animation} />
        )
      } else {
        return (
          <Marker
            position={marker.position}
            key={marker.key + '2'}
            label={(index+1).toString()}
            title='Hello World!'
            animation={marker.animation} />
        )
      }
          // onRightclick={this._handle_marker_rightclick.bind(this, index)} />
    }

    if (places && places.length > 1) {
      /*eslint-disable */
      return (
        <GoogleMap containerProps={{
            style: {
              height: '100%',
            }
          }}
          ref='map'
          googleMapsApi={'undefined' !== typeof google ? google.maps : null}
          bounds={bounds}
          center={{lat: lat_avg, lng: lon_avg}}
          >
          {markers.map(toMarker)}
        </GoogleMap>
      )
      /*eslint-enable */
    } else {
      return (
        <GoogleMap containerProps={{
            style: {
              height: '100%',
            }
          }}
          ref='map'
          googleMapApi={
            typeof google !== 'undefined' ? google.maps : null
          }
          zoom={zoom}
          center={{lat: lat_avg || 25.03, lng: lon_avg || 121.6}}
          >
          {markers.map(toMarker)}
        </GoogleMap>
      )
    }
  }
}

const mapStateToProps = (state) => ({

})
export default connect((mapStateToProps), {

})(PlacesGooglemap)