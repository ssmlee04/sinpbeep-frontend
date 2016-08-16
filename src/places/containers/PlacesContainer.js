/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getPlaces } from '../../places/reducers/places'
import { getIndustries } from '../../industry/reducers/industry'
import SearchArea from '../../system/components/SearchArea'
import PlacesList from '../../places/components/PlacesList'
import { setIndustry } from '../../system/reducers/system'
import { setPlacename } from '../../system/reducers/system'
import { setZone } from '../../system/reducers/system'

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlacesContainer extends React.Component<void, Props, void> {
  static propTypes = {
    hasMore: PropTypes.bool,
    placesQ: PropTypes.string,

    location: PropTypes.object,
    places: PropTypes.array,
    iid: PropTypes.string,
    lon: PropTypes.string,
    lat: PropTypes.string,
    zid: PropTypes.string,
    sid: PropTypes.string,
    cid: PropTypes.string,
    placename: PropTypes.string,
    skip: PropTypes.number,
    getPlaces: PropTypes.func.isRequired,
  };

  componentDidMount () {
    const { iid, lon, lat, zid, sid, cid, placename, skip } = this.props;
    console.log(iid, lon, lat, zid, sid, cid, placename, skip);
    const placesQ = this.props.location.query.q
    this.props.getPlaces({placesQ, iid, lon, lat, zid, sid, cid, placename, skip})
    this.adjustDivTop();
  }

  handleLoadMore () {
    const { iid, lon, lat, zid, sid, cid, placename, skip } = this.props;
    const placesQ = this.props.location.query.q

    this.props.getPlaces({placesQ, iid, lon, lat, zid, sid, cid, placename, skip})
  }

  componentDidUpdate () {
    this.adjustDivTop();
  }

  adjustDivTop() {
    const el1 = ReactDOM.findDOMNode(this.refs.placeslist);
    const el2 = ReactDOM.findDOMNode(this.refs.placeslisttop);
    const bottom = $(el2).position().top + $(el2).height();
    $(el1).css('top', bottom - 40);
  }

  render () {
    const { places, placesQ, hasMore } = this.props;
    const queryQ = this.props.location.query.q

    return (
      <div className='container-fluid' style={{marginTop: '58px'}}>
        <div className='row quotefont'>
          <div ref='placeslisttop' className='fixed-top-60px col-md-offset-1 col-md-10'
            style={{paddingLeft: '20px', backgroundColor: '#FDFDFD', zIndex: '10', marginTop: '-28px'}}>
            <h3 className='crimson'>Find a great place to enjoy with your family today! </h3>
            <SearchArea />
            <br/><hr/>
          </div>
          <div ref='placeslist' className='col-md-offset-1 col-md-10' style={{marginBottom: '260px'}}>
            <PlacesList places={places}/>
          </div>
        </div>
        {hasMore &&  <button className='btn btn-success' onClick={this.handleLoadMore.bind(this)}>
          mainpanel.searchmore...
        </button>}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  iid: state.system.iid,
  hasMore: state.places.hasMore, 
  placesQ: state.places.placesQ,
  places: state.places.places,
  skip: state.places.skip,

  lon: state.system.lon,
  lat: state.system.lat,
  zid: state.system.zid,
  sid: state.system.sid,
  cid: state.system.cid,
  placename: state.system.placename,
})
export default connect((mapStateToProps), {
  getPlaces, getIndustries, setIndustry, setPlacename, setZone
})(PlacesContainer)
