/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Mainpanel1Pill extends React.Component<void, Props, void> {
  static propTypes = {
    info: PropTypes.object,
  };

  handleMouseOver() {
    const dom = ReactDOM.findDOMNode(this);
    dom.classList.add("hovering");
  }

  handleMouseOut() {
    const dom = ReactDOM.findDOMNode(this);
    dom.classList.remove("hovering");
  }

  render() {
    const {info} = this.props;
    const that = this;
    const noheight = { margin: "5px", overflow: "hidden", backgroundColor: "#" + parseInt(Math.random()*1000000) }; // (!place || !place.seoname) && {display: "none"} || {};
    let image = info && info.image || "//d34ou6gzeud9fg.cloudfront.net/images/misc/coffee.jpg";
    let subtitle = info && info.tag && ("mainpanel." + info.tag) || "mainpanel.checkout";
    let tag = info && info.tag || "food";

    return (
      <div ref="q" className={"img-thumbnail c24 item sqs-gallery-design-autocolumns-slide h100 m50"} style={noheight} onMouseOver={that.handleMouseOver.bind(that)} onMouseOut={that.handleMouseOut.bind(that)}>
      <Link to={"/places?q=" + tag}>
      <h3 style={{zIndex: "2000"}}>123456789</h3>
      <div className="wrapper">
        <div className="project-title-top-right">
          <h3></h3>
        </div>
      </div>
      <div className="wrapper">
        <div className="project-title" style={{textAlign: "center"}}>
          <h3>{subtitle}</h3>
          <h5></h5>
        </div>
      </div>
      <img src={image} style={{left: 0, top: 0, position: "absolute", objectFit: "cover", height: "100%", width: "100%", verticalAlign: "middle", display: "table-cell"}}/>
      </Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // placename: state.placename
})
export default connect((mapStateToProps), {
  // setPlacename
})(Mainpanel1Pill)
