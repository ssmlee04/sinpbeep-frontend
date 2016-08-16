/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getIndustries } from '../../industry/reducers/industry'
import { fetchProfile } from '../../users/reducers/user'
import { setCollect, setCheckin, setPlaceAvatar, resetImages } from '../../places/reducers/place'
import { addOwner } from '../../owners/reducers/owner'
import IndustryTagsInput from '../../admin/components/IndustryTagsInput'

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlaceHeaderPanel extends React.Component<void, Props, void> {
  static propTypes = {
    industries: PropTypes.array,
    place: PropTypes.object,
    user: PropTypes.object,
    setPlaceAvatar: PropTypes.func.isRequired,
    getIndustries: PropTypes.func.isRequired,
    setCheckin: PropTypes.func.isRequired,
    resetImages: PropTypes.func.isRequired,
    setCollect: PropTypes.func.isRequired,
    addOwner: PropTypes.func.isRequired,
  };

  /*eslint-disable */
  componentDidMount() {
    const { industries } = this.props
    if (!industries || !industries.length) {
      this.props.getIndustries()
    }
    window.fbAsyncInit = (function(){(function(d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4';
      fjs.parentNode.insertBefore(js, fjs);
      
      !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','twitter-wjs');
    }(document, 'script', 'facebook-jssdk'));})()
  }
  /*eslint-enable */
  
  handleCheckin(shopId, vote) {
    this.props.setCheckin({shopId, vote})
  }

  handleCollect(shopId, vote) {
    this.props.setCollect({shopId, vote})
  }

  setAvatar(shopId, vote) {
    this.props.setPlaceAvatar({vote, shopId})
  }

  resetImages(shopId) {
    this.props.resetImages(shopId)
  }

  addOwner (shopId) {
    const email = ReactDOM.findDOMNode(this.refs.addowner).value
    this.props.addOwner({shopId, email})
  }

  render() {
    const {place, industries, user} = this.props;

    const that = this
    const shopId = place && place._id || ''
    const placeId = place && place.seoname || ''

    let { newCollect, newCheckin } = this.state || {}
    let collect = place && place.otherstats && place.otherstats.usercollect
    let checkin = place && place.otherstats && place.otherstats.usercheckin
    collect = newCollect !== undefined && newCollect || newCollect === undefined && collect;
    checkin = newCheckin !== undefined && newCheckin || newCheckin === undefined && checkin;

    const displayIndustryTag = function(d1, index) {
      let str = '';
      let dot = '';
      if (industries) {
        industries.map(function(d2, i) {
          if (d1.industry_id && d2._id && d1.industry_id.toString() === d2._id.toString() && d2.if_show) {
            if (index < place.industries.length -1) dot = <span>.&nbsp;</span>
            str = <h6 key={i + 'uselessplaceheadpanelstring'} className='inline courier'>{d2.name}{dot}</h6>
          }
        });
      }
      return str;
    };

    const IndustryTags = () => {
      return (place.industries || []).map(displayIndustryTag)
    }

    const PlaceIdArea = () => {
      if (user.isAdmin) {
        return (<b><br/>
          <a target='_blank' href={'https://apis.clearstreet.io/#!/shops/' + place._id}>{place._id}</a><br/>
            <button onClick={that.setAvatar.bind(that, shopId, 0)} >avatar1</button>
            <button onClick={that.setAvatar.bind(that, shopId, 1)} >avatar1</button>
            <button onClick={that.setAvatar.bind(that, shopId, 2)} >avatar2</button>
            <button onClick={that.setAvatar.bind(that, shopId, 3)} >avatar3</button>
            <button onClick={that.resetImages.bind(that, shopId)} >resetImages</button>
            <input type='text' ref='addowner'/>
            <button onClick={that.addOwner.bind(that, shopId)} >addowners</button>

            <hr/>
            
            <Link className='btn btn-primary' to={`/zadmin/places/${placeId}/edit`}>edit</Link>
          </b>
        )
      }
    }

    const SubNameArea = () => {
      if (place && place.subname && place.name && place.subname !== place.name) {
        return (
          <h3 style={{color: '#CC0000', display: 'inline'}}>- {place.subname}</h3>
        )
      }
    }

    let CheckinArea
    if (checkin) {
      CheckinArea = (
        <button type='button' className='btn btn-xs btn-default' aria-label='Left Align' onClick={that.handleCheckin.bind(that, shopId, 0)}>
          <i className='glyphicon glyphicon-ok crimson' style={{marginLeft: '-3px'}}></i>&nbsp;<span className='buttonfont'>
            place.checkin
          </span>
        </button>
      )
    } else {
      CheckinArea = (
        <button type='button' className='btn btn-xs btn-default' aria-label='Left Align' onClick={that.handleCheckin.bind(that, shopId, 1)}>
          <i className='glyphicon glyphicon-plus' style={{marginLeft: '-3px'}}></i>&nbsp;<span className='buttonfont'>
            place.checkin
          </span>
        </button>
      )
    }
    let CollectArea
    if (collect) {
      CollectArea = (
        <button type='button' className='btn btn-xs btn-default' aria-label='Left Align' onClick={that.handleCollect.bind(that, shopId, 0)}>
          <i className='glyphicon glyphicon-heart crimson' style={{marginLeft: '-3px'}}></i>&nbsp;
          <span className='buttonfont'>
            place.collect
          </span>
        </button>
      );
    } else {
      CollectArea = (
        <button type='button' className='btn btn-xs btn-default' aria-label='Left Align' onClick={that.handleCollect.bind(that, shopId, 1)}>
          <i className='glyphicon glyphicon-heart-empty' style={{marginLeft: '-3px'}}></i>&nbsp;
          <span className='buttonfont'>
            place.collect
          </span>
        </button>
      )
    }

    return (
      <div className='row' style={{backgroundColor: '#FBFAFC', border: 'solid 1px #F2F2F2'}}>
        <div className='col-md-10 col-md-offset-1'>
          <div>
            <h3 className='crimson' style={{display: 'inline-block', marginBottom: '0px', marginTop : '5px'}}>{place.name}</h3>
            {SubNameArea()} 
            &nbsp;&nbsp;{IndustryTags()} <br/>
            <h6 style={{lineHeight:'3px', display: 'inline-block', marginTop: '-5px', marginBottom: '10px'}}><i className='glyphicon glyphicon-earphone'></i><span className=' courier' style={{lineHeight:'3px'}}>: {place.phone}</span></h6>&nbsp;&nbsp;&nbsp;&nbsp;
            <h6 style={{lineHeight:'3px', display: 'inline-block', marginTop: '-5px', marginBottom: '10px'}}><i className='glyphicon glyphicon-zoom-in'></i><span className=' courier' style={{lineHeight:'3px'}}>: {place.addr}</span></h6>
            {PlaceIdArea()}
          </div>
          <div style={{float:'right',margin:'-50px 0px 0px 0px',width:'auto'}}>
  
            <div className='fb-share-button' data-href={'https://www.clearstreet.io/places/' + placeId} data-layout='button_count'></div>
            <a className='twitter-share-button' href='https://twitter.com/intent/tweet' data-via='clearstreetio'>Tweet</a>
            {CheckinArea}
            {CollectArea}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  industries: state.industries,
  user: state.user,
})
export default connect((mapStateToProps), {
  getIndustries, fetchProfile, setCollect, setCheckin, setPlaceAvatar, resetImages, addOwner
})(PlaceHeaderPanel)