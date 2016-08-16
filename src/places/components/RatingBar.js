/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ReactDOM from "react-dom";

type Props = {
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class RatingBar extends React.Component<void, Props, void> {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    score: PropTypes.number,
    avghigh: PropTypes.number,
    avglow: PropTypes.number,
    onMouseUp: PropTypes.func,
  };

  onDrag() {
    const value = ReactDOM.findDOMNode(this.refs.bar).value;
    this.setState({value: value});
    ReactDOM.findDOMNode(this).value = value;
  }

  componentDidMount() {
    const that = this;
    setTimeout(function() {
      that.onDrag();
    }, 500)
  }

  render() {
    const that = this;
    const { min, max, onMouseUp } = this.props;
    let {score, avglow, avghigh} = this.props;
    score = score || 0;
    avglow = avglow || 0;
    avghigh = avghigh || 0;
    const c0 = "c" + (parseInt(100*(avglow - min)/(max-min)) || 1);
    const c1 = "c" + (parseInt(100*(Math.min(avghigh, max) - avglow)/(max-min)) || 1);
    const { value } = this.state || {};

    let AvgHighLabel;
    let AvgLowLabel;
    if (avghigh && avglow) {
      AvgHighLabel = <h6 style={{zIndex: 30, display: "inline"}}>{avghigh}</h6>
      AvgLowLabel = <h6 style={{zIndex: 30, display: "inline"}}>{avglow}</h6>
    } else {
      AvgHighLabel = <h6 style={{zIndex: 30, display: "inline"}}>.</h6>
      AvgLowLabel = <h6 style={{zIndex: 30, display: "inline"}}>.</h6>
    }
        // <div style={{width: "100%", backgroundColor: "gray", height: "1px", zIndex: "-1"}}></div>

    return (
      <section>
        <div className="row">
          <div className="col-md-9 col-md-offset-1">

          <div className="row">
          <div className={c0} style={{textAlign: "right", marginBottom: "2px"}}>
            <div style={{backgroundColor: "transparent", height: "4px", marginTop: "-1px"}}/>
          </div>
          <div className={c1} style={{textAlign: "right", marginBottom: "2px"}}>
            <div style={{backgroundColor: "gold", borderColor: "#CFB53B", border: "1px solid", height: "4px", marginTop: "-1px", zIndex: "1", borderRadius: "3px"}}/>
          </div>
          <div style={{width: "100%", height: "1px", zIndex: "-1"}}>
            <img style={{marginTop: "-32px", height: "100%", width: "100%", objectFit: "cover"}} src="//classes.lt.unt.edu/Spring_2012/LTEC_3220_020/map0253/assign3/images/Orange-Bar.gif"/> 
          </div>
          <input style={{marginTop: "-10px"}} step="0.2" type="range" ref="bar" onMouseMove={this.onDrag.bind(this)} onMouseUp={onMouseUp} defaultValue={score} min={min} max={max}/><br/>
          </div>

          </div>
          <div className="col-md-1">
            <h6 style={{zIndex: 3, display: "inline", marginTop: "-20px"}} className="baigeback">({value})</h6>
          </div>
        </div>
      </section>
    );
  }

}

const mapStateToProps = (state) => ({

})
export default connect((mapStateToProps), {

})(RatingBar)
