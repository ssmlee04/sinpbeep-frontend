/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getPlaces } from '../../places/reducers/places'
import { setIndustry } from '../../system/reducers/system'
import { getIndustries } from '../../industry/reducers/industry'
import { getStats } from '../../stats/reducers/stats'
import PlacesListCell from "../../places/components/PlacesListCell";
import LazyLoad from "react-lazy-load";

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlacesContainer extends React.Component<void, Props, void> {
  static propTypes = {
    industries: PropTypes.array,
    places: PropTypes.array,
    stats: PropTypes.array,
    iid: PropTypes.string,
    lon: PropTypes.number,
    lat: PropTypes.number,
    zid: PropTypes.number,
    sid: PropTypes.number,
    placename: PropTypes.string,
    hasMore: PropTypes.bool,
    getPlaces: PropTypes.func.isRequired,
    getIndustries: PropTypes.func.isRequired,
    getStats: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getStats()
    this.props.getIndustries()
  }

  render() {
    const that = this;
    const {places, stats, lon, lat, zid, sid, iid, industries, placename, hasMore} = this.props;

    let NoPlaces;
    if (!places || !places.length) {
      NoPlaces = (
        <h5 style={{padding: "20px"}}>
          We did not find any matches. Please change your search conditions and search again...
        </h5>
      );
    }

    return (
      <div className="" style={{marginTop: "-20px"}}>
        {NoPlaces}
        
        {places.map(function(d, i){
          return (<div ref={"place-" + (d._id || i)} className="web-pading-13" key={i}>
            <PlacesListCell place={d} stats={stats} industries={industries}/>
          </div>)
        })}
      </div>
    );
  }
} 

const mapStateToProps = (state, props) => ({
  // hasMore: state.places.hasMore, 
  // iid: state.system.iid,
  // placesQ: state.places.placesQ,
  industries: state.industry.industries,
  stats: state.stats.stats,
})
export default connect((mapStateToProps), {
  getStats, getIndustries
})(PlacesContainer)