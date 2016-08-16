/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
// import PhotolikePanel from '../components/PhotolikePanel';
// import { setPlacename } from '../../system/reducers/placename'

class Mainpanel2Pill extends React.Component<void, Props, void> {
  static propTypes = {
    place: PropTypes.object,
    user: PropTypes.object,
    width: PropTypes.number,
  };

  handleMouseOver() {
    const dom = ReactDOM.findDOMNode(this);
    dom.classList.add('hovering');
  }

  handleMouseOut() {
    const dom = ReactDOM.findDOMNode(this);
    dom.classList.remove('hovering');
  } 

  render() {
    const { place, width, user } = this.props;
    const that = this;
    const image = place && place.image;
    const message = place && place.message || '';
    const name = place && place.name || '';
    const seoname = place && place.seoname;
    const placeId = place && place._id;
    const noheight = { margin: '5px', overflow: 'hidden', backgroundColor: '#' + parseInt(Math.random()*1000000) }; // (!place || !place.seoname) && {display: 'none'} || {};

    return (
      <div ref='q' className={'c' + width + ' item sqs-gallery-design-autocolumns-slide h250 m100'} style={noheight} onMouseOver={that.handleMouseOver.bind(that)} onMouseOut={that.handleMouseOut.bind(that)}>
      <Link to={'/places/' + seoname}>
      <div className='wrapper'>
        <div className='project-title-top-right'>
          <h3></h3>
        </div>
      </div>
      <div className='wrapper webonly'>
        <div className='project-title'>
          <h3>- &nbsp;{name}</h3>
          <h5>{message}</h5>
        </div>
      </div>
      <img src={image} style={{left: 0, top: 0, position: 'absolute', objectFit: 'cover', height: '100%', width: '100%', verticalAlign: 'middle', display: 'table-cell'}}/>
      </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // placename: state.placename
})
export default connect((mapStateToProps), {
  // setPlacename
})(Mainpanel2Pill)
