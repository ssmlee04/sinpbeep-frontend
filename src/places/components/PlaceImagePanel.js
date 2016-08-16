/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getPlaceImages } from '../../places/reducers/placeimages'
import PlaceImageCell from '../../places/components/PlaceImageCell'

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlaceImagePanel extends React.Component<void, Props, void> {
  static propTypes = {
    params: PropTypes.object,
    place: PropTypes.object,
    hasMore: PropTypes.bool,
    skip: PropTypes.number,
    images: PropTypes.array,
    getPlaceImages: PropTypes.func.isRequired,
    // loadmorePlaceImages: PropTypes.func.isRequired,
    // setCheckin: PropTypes.func.isRequired,
    // setCollect: PropTypes.func.isRequired,
  }

  componentDidMount () {
    const placeId = `${this.props.params.placeId}`
    this.props.getPlaceImages({placeId})
  }

  handleLoadMore({placeId, skip}) {
    console.log(skip)
    this.props.getPlaceImages({placeId, skip})
  }

  render() {
    const placeId = `${this.props.params.placeId}`
    const {place, hasMore, skip, images} = this.props

    const LoadMoreImages = () => {
      return (
        <div>
          <a onClick={this.handleLoadMore.bind(this, {placeId, skip})}>load more...</a>
        </div>
      )
    }

    return (
      <div style={{padding: '10px'}}>
        <div className='row no-gutter'>
          <div className='col-md-12'>
            <h4 className='crimson quotefont'><b>
              place.images
            </b></h4>
          </div>
          {(images || []).map((d, i) => {
            return (
              <PlaceImageCell key={i} place={place} image={d}/>
            )
          })}
        </div>
        <div className='row no-gutter'>
          {hasMore && LoadMoreImages()}
          <span/> // IsLoading
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // industries: state.industries,
  images: state.placeimages.images, 
  hasMore: state.placeimages.hasMore, 
  skip: state.placeimages.skip, 
})
export default connect((mapStateToProps), {
  getPlaceImages
})(PlaceImagePanel)