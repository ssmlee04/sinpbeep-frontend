/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import '../../places/styles/PlaceReviewCell.scss'
import moment from 'moment'
import ImageLoader from 'react-imageloader'
import ImageNotFound from '../../system/components/ImageNotFound'
import StarBarDisplayOnly from '../../places/components/StarBarDisplayOnly'

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlaceReviewCell extends React.Component<void, Props, void> {
  static propTypes = {
    place: PropTypes.object,
    user: PropTypes.object,
    review: PropTypes.object,
  }

  componentDidMount() {
    // const el = ReactDOM.findDOMNode(this.refs.q)
    // $(el).css('height', $(el).width()/1.618)
  }

  handleLikeReview(placeId, reviewId, vote) {
    // this.context.executeAction(likeReview, {placeId, reviewId, vote})
  }

  deleteReview(placeId, reviewId){
    // this.context.executeAction(deleteReview, {placeId, reviewId})
  }

  flagReview(placeId, reviewId){
    // this.context.executeAction(deleteReview, {placeId, reviewId})
  }

  render() {
    const { review, user, place } = this.props
    const that = this
    const placeId = place && place._id || ''
    const userId = user && user._id || ''
    const reviewId = review && review.review_id || ''

    const flagReviewButton = function(){
      return (<h5 className='glyphicon glyphicon-flag gray' onClick={that.flagReview.bind(that, placeId, reviewId)}></h5>)
    }

    const deleteReviewButton = function(){
      if (userId && review.user_id && userId.toString() === review.user_id.toString()) {
        return (<h5 className='glyphicon glyphicon-trash gray' onClick={that.deleteReview.bind(that, placeId, reviewId)}></h5>)
      }
    }

    const likeReviewButton = function(){
      if (review.current === 1) {
        return (<h5 className='glyphicon glyphicon-heart crimson' ></h5>)
      } else {
        return (<h5 className='glyphicon glyphicon-heart gray' onClick={that.handleLikeReview.bind(that, placeId, reviewId, 1)}></h5>)
      }
    }  

    function preloader() {
      return <ImageNotFound/>
    }

    const review_date = moment(review.date_added).format('MMMM Do YYYY, h:mm:ss a') || moment().format('MMMM Do YYYY, h:mm:ss a')
    return (
      <div className='row'>
      <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2'>
        <ImageLoader
          className='img-thumbnail'
          style={{width: '80px', height: '80px'}}
          src={review.avatar}
          imgProps={{'objectFit': 'contain', height: '100%', width: '100%'}}
          // wrapper={div}
          preloader={preloader}
          />
      </div>
      <div className='col-lg-10 col-md-10 col-sm-10 col-xs-10'>
        <StarBarDisplayOnly score={review.vote}/>&nbsp;&nbsp;
        <h5 style={{display: 'inline'}}>{review.message}</h5><br/>
        <h5 style={{display:'inline'}}><a href={'/users/' + review.user_id}> {review.name}</a>&nbsp;&nbsp;</h5>
        <h6 className='inline'>@ {review_date}</h6>
        <span> &nbsp;
          {likeReviewButton()}
          <h6 className='inline' style={{fontSize: '10px', marginBottom: '-15px'}}>({review.yes || 0})</h6> &nbsp;
          {flagReviewButton()} &nbsp;
          {deleteReviewButton()} &nbsp;
        </span>
        <hr/>
      </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({

})
export default connect((mapStateToProps), {

})(PlaceReviewCell)