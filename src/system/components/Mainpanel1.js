/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
// import { setPlacename } from '../../system/reducers/placename'
import Mainpanel1Pill from './../../system/components/Mainpanel1Pill'

class Mainpanel1 extends React.Component<void, Props, void> {
  static propTypes = {
  };  

  render() {
    const pills = [{
      image: "//d34ou6gzeud9fg.cloudfront.net/images/misc/pasta.jpg",
      tag: "pasta",
      key: "feature-1"
    },{
      image: "//d34ou6gzeud9fg.cloudfront.net/images/misc/japanese.jpg",
      tag: "japanese",
      key: "feature-2"
    },{
      image: "//d34ou6gzeud9fg.cloudfront.net/images/misc/thai.jpg",
      tag: "thai",
      key: "feature-3"
    },{
      image: "//d34ou6gzeud9fg.cloudfront.net/images/misc/burrito.jpg",
      tag: "mexican",
      key: "feature-4"
    },{
      image: "//d34ou6gzeud9fg.cloudfront.net/images/misc/donut.jpg",
      tag: "donut",
      key: "feature-5"
    },{
      image: "//d34ou6gzeud9fg.cloudfront.net/images/misc/tart.jpg",
      tag: "dessert",
      key: "feature-6"
    },{
      image: "//d34ou6gzeud9fg.cloudfront.net/images/misc/bar.jpg",
      tag: "bars",
      key: "feature-7"
    },{
      image: "//d34ou6gzeud9fg.cloudfront.net/images/misc/coffee.jpg",
      tag: "coffee",
      key: "feature-8"
    }];

    return (
      <div style={{marginTop: "20px", marginBottom: "20px"}}>
        <div className="row text-center no-gutter">
          <div className="col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
          <div className="row">
          {pills.map(function(d, i) {
            return (<Mainpanel1Pill info={d} key={i}/>);
          })}
          </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // placename: state.placename
})
export default connect((mapStateToProps), {
  // setPlacename
})(Mainpanel1)
