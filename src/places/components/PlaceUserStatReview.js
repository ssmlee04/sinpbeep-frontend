/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import StarBar from '../../places/components/StarBar'

type Props = {
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlaceUserStatReview extends React.Component<void, Props, void> {
  static propTypes = {
    hour: PropTypes.string,
    total: PropTypes.number,
    stats: PropTypes.array,
    placestats: PropTypes.array,
    place: PropTypes.object,
  }

  render() {
    const {place, placestats, stats} = this.props
    let { total = 0 } = this.props

    const displayStatsArea = (d1) => {
      let str = ''
      let score = 0
      if (stats) {
        stats.map((d2, i) => {
          if (d1.stat_id && d2._id && d1.stat_id.toString() === d2._id.toString()) {
            const r1 = (d1.r1 || 0) 
            const r2 = d1.r2 || 0
            const r3 = d1.r3 || 0
            const r4 = d1.r4 || 0
            const r5 = (d1.r5|| 0) 
            score = (r1*1 + r2*2+r3*3 + r4*4 + r5*5) / (r1+r2+r3+r4+r5 + 0.0000001)
            score = Math.round(score * 2) / 2
            str = (
              <span key={'stat-' + d1.stat_id + '-' + i}>&nbsp;&nbsp;
                <h5 className='inline'>{d2.name}</h5>&nbsp;
                <StarBar score={score} stat={d1} place={place} style={{display: 'inline'}}/>&nbsp;
                <h6 className='inline'>(
                avg &nbsp;
                <b className='crimson'>{score}</b> &nbsp;
                from &nbsp;
                 {r1+r2+r3+r4+r5} &nbsp;
                 users)</h6> 
                <br/>
              </span>
            )
          }
        })
      }
      return str
    }

    return (
      <div className='quotefont'>
        {(placestats || []).map(displayStatsArea)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})
export default connect((mapStateToProps), {

})(PlaceUserStatReview)
