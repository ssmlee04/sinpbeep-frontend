  /* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import StarBarDisplayOnly from "../../places/components/StarBarDisplayOnly";

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlacesListCellStarBar extends React.Component<void, Props, void> {
  static propTypes = {
    place: PropTypes.object,
    placestats: PropTypes.array,
    stats: PropTypes.array,
    // iid: PropTypes.string,
    // setPlacesQ: PropTypes.func.isRequired,
    // getPlaces: PropTypes.func.isRequired,
  };

  render() {
    const {place, placestats, stats} = this.props;
    const placeId = place && place._id;

    let displayStatsArea = function(d1) {
      let str = "";
      let score = 0;
      if (stats) {
        stats.map(function(d2, i) {
          let statId = d1.stat_id;
          if (d1.stat_id && d2._id && d1.stat_id.toString() === d2._id.toString()) {
            let r1 = d1.r1 || 0;
            let r2 = d1.r2 || 0;
            let r3 = d1.r3 || 0;
            let r4 = d1.r4 || 0;
            let r5 = d1.r5 || 0;
            score = (r1*1 + r2*2 + r3*3 + r4*4 + r5*5) / (r1+r2+r3+r4+r5 + 0.0000001);
            score = Math.round(score * 2) / 2;
            str = (
              <span key={"placeuserstatreviewnosubmit-" + statId + "-" + placeId + "-" + i}>
                <a>{d2.name}&nbsp;&nbsp; </a>
                <StarBarDisplayOnly score={score} stat={d1} place={place} style={{display: "inline"}}/>
                <br/>
              </span>
            );
          }
        });
      }
      return str;
    };

    return (
      <div>
      {(placestats || []).map(displayStatsArea)}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({

})
export default connect((mapStateToProps), {

})(PlacesListCellStarBar)