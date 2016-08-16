/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class SearchPanel extends React.Component<void, Props, void> {
  static propTypes = {
    places: PropTypes.array,
  };

  loadMore() {
    const iid = ReactDOM.findDOMNode(this.refs.industry).value
    const placename = ReactDOM.findDOMNode(this.refs.placename).value
    let ids = "[" + ReactDOM.findDOMNode(this.refs.zone).value + "]";
    ids = JSON.parse(ids)
    const zid = ids[0];
    const sid = ids[1];
    const cid = ids[2];
    const lon = ReactDOM.findDOMNode(this.refs.lon).value
    const lat = ReactDOM.findDOMNode(this.refs.lat).value
    console.log(placename);
    console.log(placename);
    console.log(placename);
    this.context.executeAction(loadPlaces, {iid, zid, sid, cid, lon, lat, placename});
  }

  render() {
    const {iid, zid, sid, cid, lon, lat, placename, isLoadingPlaces} = this.props;
    return (
      <div className="">
        <PlaceNameInput ref="placename" place={placename}/>&nbsp;
        <span style={{height: "8px"}} className="mobileonly"></span>
        <IndustrySelect ref="industry" industry={iid}/>&nbsp;
        <ZoneSelect ref="zone" zid={zid} sid={sid} cid={cid}/>&nbsp;
        <input type="text" className="hide" ref="lon" value={lon}/>
        <input type="text" className="hide" ref="lat" value={lat}/>
        <span style={{height: "8px"}} className="mobileonly"></span>
        {isLoadingPlaces && <button onClick={this.loadMore.bind(this, {iid: iid, zid: zid, sid: sid, cid: cid, placename: placename})} className="btn btn-primary btn-sm" style={{color: "white"}} disabled>Searching...</button>}
        {!isLoadingPlaces && <button onClick={this.loadMore.bind(this, {iid: iid, zid: zid, sid: sid, cid: cid, placename: placename})} className="btn btn-primary btn-sm" style={{color: "white"}}>Search</button>}
        <div style={{marginTop: "10px", marginBottom: "-30px"}}>
          <MarketSelect ref="market" zid={zid} sid={sid} cid={cid} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({

})
export default connect((mapStateToProps), {

})(SearchPanel)