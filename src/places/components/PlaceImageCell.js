/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'
import { likePlaceImage } from '../../places/reducers/placeimages'

type Props = {
  place: Object,
};

function byteLength(str) {
  // returns the byte length of an utf8 string
  var s = str.length;
  var count = 0; // size 2 numbers
  for (var i=str.length-1; i>=0; i--) {
    var code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) {
      s+=2;
      count++;
      if (s > 60) count--;
    }
    if (code >= 0xDC00 && code <= 0xDFFF) i--; // trail surrogate
  }
  return {s1: s, s2: count};
}

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlaceImageCell extends React.Component<void, Props, void> {
  static propTypes = {
    // industries: PropTypes.array,
    image: PropTypes.object,
    place: PropTypes.object,
    // getIndustries: PropTypes.func.isRequired,
    likePlaceImage: PropTypes.func.isRequired,
    // setCollect: PropTypes.func.isRequired,
  };

  handleMouseOver() {
    const dom = ReactDOM.findDOMNode(this);
    dom.classList.add('hovering');
  }

  handleMouseOut() {
    const dom = ReactDOM.findDOMNode(this);
    dom.classList.remove('hovering');
  }

  handleLikeImage(placeId, imageId) {
    this.setState({newLike: 1})
    this.props.likePlaceImage({placeId, imageId})
  }

  handleBlogRedirect(link) {
    window.open(link);
  }

  render () {
    const { image, place } = this.props;
    let noheight =  {overflow: 'hidden', backgroundColor: '#' + parseInt(Math.random()*1000000)}; 
    // (!place || !place.seoname) && {display: 'none'} || {};
    // <img className='placeimage img-thumbnail' src={image.path} />
    let { newLike } = this.state || {};
    let like = image.current;
    like = newLike !== undefined && newLike || newLike === undefined && like;

    const blogLink = () => {
      if (image.link) {
        return (
          <a href={image.link} target='_blank'>{image.blog}</a>
        )
      }
    }
    var src = image.path || image.thumb

    var likeImage
    if (like) {
      likeImage = <h5 style={{marginLeft: '-40px', display: 'inline', color: 'red'}} onClick={this.handleLikeImage.bind(this, place._id, image.photo_id)}><g className='glyphicon glyphicon-heart link pointer'></g></h5>
    } else {
      likeImage = <h5 style={{marginLeft: '-40px', display: 'inline', color: 'white'}} onClick={this.handleLikeImage.bind(this, place._id, image.photo_id)}><g className='glyphicon glyphicon-heart link pointer'></g></h5>
    }

    let message = image.message || ''
    let lens = byteLength(message)
    let len = lens.s1
    let count = lens.s2

    if (len > 60) {
      message = message.slice(0, 60 - ~~(count/2)) + ' .....'
    }
    return (
      <div ref='q' className={'c33 item sqs-gallery-design-autocolumns-slide h250'} style={noheight} onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
        <div className='wrapper'>
          <div className='project-title'>
            <h5 className='' style={{paddingLeft: '10px', color: 'white'}}>{message}</h5>
            <h5 className='inline' style={{paddingLeft: '10px', display: 'inline', color: 'white'}} onClick={this.handleBlogRedirect.bind(this, image.link)}>Origin: <g className='pink link pointer'>{image.blog}</g></h5>
            {likeImage}
          </div>
        </div>
        <img src={src} className='img-thumbnail' style={{left: 0, top: 0, position: 'absolute', objectFit: 'cover', height: '100%', width: '100%', verticalAlign: 'middle', display: 'table-cell'}}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // industries: state.industries,
  // user: state.user,
})
export default connect((mapStateToProps), {
  likePlaceImage
})(PlaceImageCell)
