/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getPlaceReviews } from '../../places/reducers/placereviews'
import PlaceReviewCell from '../../places/components/PlaceReviewCell';

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlaceReviewPanel extends React.Component<void, Props, void> {
  static propTypes = {
    reviews: PropTypes.array,
    params: PropTypes.object,
    place: PropTypes.object,
    hasMore: PropTypes.bool,
    skip: PropTypes.number,
    getPlaceReviews: PropTypes.func.isRequired,
    // loadmorePlaceReviews: PropTypes.func.isRequired,
    // setCheckin: PropTypes.func.isRequired,
    // setCollect: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const placeId = `${this.props.params.placeId}`
    this.props.getPlaceReviews({placeId})
  }

  handleLoadMore({placeId, skip}) {
    this.props.getPlaceReviews({placeId, skip})
  }

  render() {
    const that = this;
    const placeId = `${this.props.params.placeId}`
    const {place, hasMore, skip, reviews} = this.props;

    const UserReviewsSection = function() {
      if (reviews && reviews.length) {
        return reviews.map(function(d, i) {
          return <PlaceReviewCell key={i} place={place} review={d}/>
        })
      } else {
        return (
          <h6>
            place.noreviews
          </h6>
        );
      }
    }

    const LoadMoreReviews = function() {
      return (
        <div>
          <a onClick={that.handleLoadMore.bind(that, {placeId, skip})}>load more...</a>
        </div>
      );
    };

    return (
      <div style={{padding: '10px'}}>
        <div className='row no-gutter quotefont'>
          <div className='col-md-12'>
            <h4 className='crimson quotefont'><b>
              place.userreviews
            </b></h4>
          </div>
          <div className='col-md-12'>
            {UserReviewsSection()}
          </div>
          <div className='col-md-12'>
            {hasMore && LoadMoreReviews()}
          </div>
          <div className='col-md-12'>
            <hr/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reviews: state.placereviews.reviews, 
  hasMore: state.placereviews.hasMore, 
  skip: state.placereviews.skip, 
})
export default connect((mapStateToProps), {
  getPlaceReviews
})(PlaceReviewPanel)