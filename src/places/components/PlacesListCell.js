/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PlacesListCellStarBar from "../../places/components/PlacesListCellStarBar"
import ImageNotFound from "../../system/components/ImageNotFound"
import ImageLoader from "react-imageloader"
import LazyLoad from "react-lazy-load"

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlacesListCell extends React.Component<void, Props, void> {
  static propTypes = {
    stats: PropTypes.array,
    industries: PropTypes.array,
    place: PropTypes.object,
    // iid: PropTypes.string,
    // setPlacesQ: PropTypes.func.isRequired,
    // getPlaces: PropTypes.func.isRequired,
  }

  render() {
    const {place, stats, industries} = this.props

    const nReviewsComp = function(place){
      if (place && place.otherstats && place.otherstats.n_reviews > 0) {
        return (
          <h5 style={{display: "inline"}}>User reviews : {place.otherstats.n_reviews}&nbsp;&nbsp;&nbsp;</h5>
        )
      }
    }
    const nBlogsComp = function(place){
      if (place && place.otherstats && place.otherstats.n_blogs > 0) {
        return (
          <h5 style={{display: "inline"}}>Blogger reviews : {place.otherstats.n_blogs}&nbsp;&nbsp;&nbsp;</h5>
        )
      }
    }
    const nBloggerLikeComp = function(place){
      if (place && place.otherstats && place.otherstats.n_bloglikes > 0) {
        return (
          <h5 style={{display: "inline"}}># of Blogger likes : {place.otherstats.n_bloglikes}&nbsp;&nbsp;&nbsp;</h5>
        )
      }
    }

    const overallLikeComp = function(place){
      if (place && place.otherstats && place.otherstats.overall > 0) {
        return (
          <div>like :s
          {place.otherstats.overall}
          </div>
        )
      }
    }
    const nameComp = function(place){
      if (!place.name) {

      } else if (place.subname && place.subname !== place.name) {
        return (
          <v style={{marginTop: "0px", display:"inline"}} className="gray link">{place.name}·{place.subname}</v>
        )
      } else {
        return (
          <v style={{marginTop: "0px", display:"inline"}} className="gray link">{place.name}</v>
        )
      }
    }
    const industryComp = function(place, industries){
      var ind = ""
      if (place && place.industries && industries) {
        place.industries.map(function(d1){
          industries.map(function(d2){
            if (d2._id && d1.industry_id && d2._id.toString() === d1.industry_id.toString()) {
              if (ind) ind += ". "
              ind += d2.name 
            }
          })
        })
      }
      return (<h5 style={{display: "inline"}}>{ind}</h5>)
    }  

    function preloader() {
      return <ImageNotFound/>
    }

    let thumb = place.thumb || place.image
    return (
      <div>
      <div className="row quotefont">
        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4">
          <LazyLoad>
          <Link to={"/places/" + place.seoname}>
          <ImageLoader
            className="img-thumbnail"
            style={{width: "100%"}}
            src={thumb}
            imgProps={{"objectFit": "contain", height: "100%", width: "100%"}}
            // wrapper={div}
            preloader={preloader}
            />
          </Link>
          </LazyLoad>
        </div>
        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
          <Link to={"/places/" + place.seoname} className="link"><h2>{nameComp(place)}</h2></Link>
          <h5 className="glyphicon glyphicon-earphone" style={{lineHeight: "10px"}}>&nbsp;{place.phone}&nbsp;&nbsp;&nbsp;&nbsp;</h5>
          <h5 className="glyphicon glyphicon-th-list" style={{lineHeight: "10px"}}>&nbsp;{place.addr}&nbsp;&nbsp;&nbsp;&nbsp;</h5>
          <h5 className="glyphicon glyphicon-paperclip" style={{lineHeight: "10px", display: "inline"}}>&nbsp;{industryComp(place, industries)}</h5>
          <br/>
          {nReviewsComp(place)}
          {nBlogsComp(place)}
          {nBloggerLikeComp(place)}
          <div className="margin-bottom-5px">
            <PlacesListCellStarBar place={place} placestats={place.statsinfo} stats={stats}/>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <hr style={{borderTop: "1px solid #ccc", marginBottom: "-5px"}}/>
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({

})
export default connect((mapStateToProps), {

})(PlacesListCell)