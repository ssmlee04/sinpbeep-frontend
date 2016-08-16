/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { setPlacename, setIndustry, setZone } from '../../system/reducers/system'
import SearchAreaPlaceName from './../../system/components/SearchAreaPlaceName'
import SearchAreaZone from './../../system/components/SearchAreaZone'
import SearchAreaIndustry from './../../system/components/SearchAreaIndustry'

type Props = {
  placename: String,
  iid: String,
};

class SearchAreaRedirect extends React.Component<void, Props, void> {
  static propTypes = {
    iid: PropTypes.string,
    placename: PropTypes.string,
    // fetchProfile: PropTypes.func.isRequired,
    setZone: PropTypes.func.isRequired,
    setIndustry: PropTypes.func.isRequired,
    setPlacename: PropTypes.func.isRequired,
  };

  loadMore() {
    const {placename, iid} = this.props;
    // const iid = ReactDOM.findDOMNode(this.refs.industry).value
    // const placename = ReactDOM.findDOMNode(this.refs.placename).value
    // let ids = "[" + ReactDOM.findDOMNode(this.refs.zone).value + "]";
    // ids = JSON.parse(ids)
    // const zid = ids[0];
    // const sid = ids[1];
    // const cid = ids[2];
    // this.context.executeAction(loadPlaces, {iid, zid, sid, cid, placename});
  }

  render() {
    // const {iid, zid, sid, cid, placename} = this.props;
    // const {placename} = this.props;
    return (
      <div className="list-inline intro-social-buttons searchareaRedirect">
        <SearchAreaPlaceName />
        <SearchAreaIndustry />
        <SearchAreaZone />
        <Link to="/places" className="inline" style={{color: "white"}} >
          <button className="btn btn-primary" onClick={this.loadMore.bind(this)}>Search</button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  placename: state.placename,
  iid: state.system.iid
})
export default connect((mapStateToProps), {
  setPlacename, setIndustry, setZone
})(SearchAreaRedirect)
