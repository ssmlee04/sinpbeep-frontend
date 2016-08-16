/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import '../../places/styles/StarBar.scss'
import { setPlaceStatVote } from '../../places/reducers/placevote'

type Props = {

};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class StarBar extends React.Component<void, Props, void> {
  static propTypes = {
    displayOnly: PropTypes.object,
    score: PropTypes.object,
    stat: PropTypes.object,
    place: PropTypes.object,
    setPlaceStatVote: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { displayOnly } = this.props
    if (!displayOnly) {
      $('.rating-container .star').on('click', function () {
        $(this).removeClass('star_yes')
        $(this).siblings().removeClass('star_yes')
        $(this).removeClass('star_hover')
        $(this).siblings().removeClass('star_hover')
        $(this).siblings().addClass('star_no')
        $(this).prevAll('.star').addBack().removeClass('star_no')
        $(this).siblings().removeClass('star_active')
        $(this).addClass('star_active')
        $(this).prevAll('.star').addBack().addClass('star_active')
      })
      $('.rating-container .star').on('mouseenter', function () {
        $(this).removeClass('star_hover')
        $(this).siblings().removeClass('star_hover')
        $(this).prevAll('.star').addBack().addClass('star_hover')
      })
      $('.rating-container .star').on('mouseleave', function () {
        $(this).removeClass('star_hover')
        $(this).siblings().removeClass('star_hover')
      })
    }
  }

  componentDidUpdate () {
    const { displayOnly } = this.props
    if (!displayOnly) {
      $('.rating-container .star').on('click', function () {
        $(this).removeClass('star_yes')
        $(this).siblings().removeClass('star_yes')
        $(this).removeClass('star_hover')
        $(this).siblings().removeClass('star_hover')
        $(this).siblings().addClass('star_no')
        $(this).prevAll('.star').addBack().removeClass('star_no')
        $(this).siblings().removeClass('star_active')
        $(this).addClass('star_active')
        $(this).prevAll('.star').addBack().addClass('star_active')
      })
      $('.rating-container .star').on('mouseenter', function () {
        $(this).removeClass('star_hover')
        $(this).siblings().removeClass('star_hover')
        $(this).prevAll('.star').addBack().addClass('star_hover')
      })
      $('.rating-container .star').on('mouseleave', function () {
        $(this).removeClass('star_hover')
        $(this).siblings().removeClass('star_hover')
      })
    }
  }

  componentWillUnmount () {
    $('.rating-container .star').off('click')
    $('.rating-container .star').off('mouseenter')
    $('.rating-container .star').off('mouseleave')
  }

  listenEvents () {
    const { displayOnly } = this.props
    if (!displayOnly) {
      $('.rating-container .star').on('click', function () {
        $(this).removeClass('star_yes')
        $(this).siblings().removeClass('star_yes')
        $(this).removeClass('star_hover')
        $(this).siblings().removeClass('star_hover')
        $(this).siblings().addClass('star_no')
        $(this).prevAll('.star').addBack().removeClass('star_no')
        $(this).siblings().removeClass('star_active')
        $(this).addClass('star_active')
        $(this).prevAll('.star').addBack().addClass('star_active')
      })
      $('.rating-container .star').on('mouseenter', function () {
        $(this).removeClass('star_hover')
        $(this).siblings().removeClass('star_hover')
        $(this).prevAll('.star').addBack().addClass('star_hover')
      })
      $('.rating-container .star').on('mouseleave', function () {
        $(this).removeClass('star_hover')
        $(this).siblings().removeClass('star_hover')
      })
    }
  }

  vote (shopId, statId, vote) {
    this.props.setPlaceStatVote({shopId, statId, vote})
  }

  render() {
    const that = this
    const {score, stat, place} = this.props
    const shopId = place && place._id || ''
    const statId = stat && stat.stat_id || ''
    const score10 = score / 5 * 10
    const thisstat = (place.statsinfo || []).filter((d) => {
      return d.stat_id === statId
    })
    const myscore10 = thisstat[0] && thisstat[0].current * 2 || -1
    return (
      <section className='StarBar' style={{display: 'inline'}}>
        <div className='rating-container' ref='starbar' style={{display: 'inline'}}>
          {[1, 2, 3, 4, 5].map((d, i) => {
            let star_status

            if (myscore10 > 0) {
              if (d * 2 < myscore10 + 1) {
                star_status = 'star_active'
              } else if (d * 2 >= myscore10 + 2) {
                star_status = 'star_no'
              } else {
                star_status = 'star_no'
              }
            } else if (score10 >= 0) {
              if (d * 2 < score10 + 1) {
                star_status = 'star_yes_'
              } else if (d * 2 >= score10 + 2) {
                star_status = 'star_no'
              } else {
                star_status = 'star_half_'
              }
            }
            return (
              <div key={'statbar-' + i} className={'star ' + star_status} onClick={that.vote.bind(that, shopId, statId, d)}></div>
            )
          })}
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({

})
export default connect((mapStateToProps), {
  setPlaceStatVote
})(StarBar)
