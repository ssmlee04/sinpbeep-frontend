/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
// import { getIndustries } from '../../industry/reducers/industry'
// import { fetchProfile } from '../../users/reducers/user'
// import { setCollect, setCheckin } from '../../places/reducers/place'
import PlaceImagePanel from '../../places/components/PlaceImagePanel';
import PlaceReviewPanel from '../../places/components/PlaceReviewPanel';
import GoogleAds from '../../system/components/GoogleAds';

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlaceMenu extends React.Component<void, Props, void> {
  static propTypes = {
    // industries: PropTypes.array,
    place: PropTypes.object,
    // getIndustries: PropTypes.func.isRequired,
    // setCheckin: PropTypes.func.isRequired,
    // setCollect: PropTypes.func.isRequired,
  };

  switchTab(tab) {
    this.setState({tab: tab});
  }

  render() {
    // const that = this;
    // const {place, industries, stats} = this.props;
    const { tab } = this.state || {tab: 1};
    const { place } = this.props;
    
    let tab1, tab2, tab3, tab4;
    if (tab === 4) {
      tab1 = 'active';
    }
    if (tab === 1) {
      tab2 = 'active';
    }
    if (tab === 2) {
      tab3 = 'active';
    }
    if (tab === 3) {
      tab4 = 'active';
    }

    let content; 

    if (tab === 1) {
      content = <PlaceImagePanel place={place} {...this.props}/>
    }
    if (tab === 2) {
      content = <PlaceReviewPanel place={place} {...this.props}/>
    }
    if (tab === 3) {
      content = <span place={place} >3333</span> // PlaceblogPanel
    }
    if (tab === 4) {
      content = <span place={place}>4444</span> // PlacebasicPanel
    }

    return (
      <div>
        <div className='row quotefont'>
          <div className='col-md-offset-1 col-md-10 webonly'>
            <ul className='nav nav-tabs'>
              <li role='presentation' onClick={this.switchTab.bind(this, 4)} className={tab1}><a>
                place.basic
              </a></li>
              <li role='presentation' onClick={this.switchTab.bind(this, 1)} className={tab2}><a>
                place.images
              </a></li>
              <li role='presentation' onClick={this.switchTab.bind(this, 2)} className={tab3}><a>
                place.reviews
              </a></li>
              <li role='presentation' onClick={this.switchTab.bind(this, 3)} className={tab4}><a>
                place.blogs
              </a></li>
            </ul>
          </div>
        </div>

        <div className='row quotefont'>
          <div className='col-md-offset-1 col-md-7'>
            {content}
          </div>
          <div className='col-md-3'>
            <span place={place} /> // PlaceRecommends
            <GoogleAds />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // industries: state.industries,
  // user: state.user,
})
export default connect((mapStateToProps), {
  // getIndustries, fetchProfile, setCollect, setCheckin
})(PlaceMenu)