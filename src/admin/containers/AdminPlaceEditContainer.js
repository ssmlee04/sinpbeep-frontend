/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import ReactDOM from 'react-dom'
import IndustryTagsInput from '../../admin/components/IndustryTagsInput'
import EventListCell from '../../admin/components/EventListCell'
import { getPlace, editPlace } from '../../places/reducers/place'
import { addToLastSeasonRank, addToThisSeasonRank } from '../../places/reducers/placerank'
import { getPlaceImages, deleteImage, editPlaceImage } from '../../places/reducers/placeimages'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminPlaceEditContainer extends React.Component<void, Props, void> {
  static propTypes = {
    place: PropTypes.object,
    params: PropTypes.object,
    images: PropTypes.array,
    industries: PropTypes.array,
    user: PropTypes.object,
    getPlace: PropTypes.func.isRequired,
    editPlaceImage: PropTypes.func.isRequired,
    editPlace: PropTypes.func.isRequired,
    getPlaceImages: PropTypes.func.isRequired,
    addToThisSeasonRank: PropTypes.func.isRequired,
    addToLastSeasonRank: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  }

  componentDidMount () {
    const placeId = `${this.props.params.placeId}`
    this.props.getPlace(placeId)
    this.props.getPlaceImages({placeId})
  }

  componentDidUpdate (prevProps, prevState) {
    const { place = {}, images = [], industries } = this.props
    const { isLoaded, isLoadedImages } = this.state || {}
    if (place._id && !isLoaded) {
      ReactDOM.findDOMNode(this.refs.name).value = place.name || ''
      ReactDOM.findDOMNode(this.refs.name_en).value = place.name_en || ''
      ReactDOM.findDOMNode(this.refs.description).value = place.description || ''
      ReactDOM.findDOMNode(this.refs.description_en).value = place.description_en || ''
      ReactDOM.findDOMNode(this.refs.seoname).value = place.seoname || ''
      ReactDOM.findDOMNode(this.refs.subname).value = place.subname || ''
      ReactDOM.findDOMNode(this.refs.addr).value = place.addr || ''
      ReactDOM.findDOMNode(this.refs.addr_en).value = place.addr_en || ''
      ReactDOM.findDOMNode(this.refs.phone).value = place.phone || ''
      ReactDOM.findDOMNode(this.refs.website).value = place.website || ''
      ReactDOM.findDOMNode(this.refs.facebook).value = place.facebook || ''
      ReactDOM.findDOMNode(this.refs.lon).value = place.loc[0] || ''
      ReactDOM.findDOMNode(this.refs.lat).value = place.loc[1] || ''
      this.setState({
        isLoaded: true,
        placeindustries: place.industries || []
      })
    }

    if (images.length && !isLoadedImages) {
      setTimeout(() => {
        images.map((d) => {
          ReactDOM.findDOMNode(this.refs['placeimages_message' + d.photo_id]).value = d.message
        })
      }, 2000)
      this.setState({
        isLoadedImages: true,
        placeimages: images
      })
    }
  }

  deleteImage (photoId) {
    this.props.deleteImage({photoId})
  }

  editPlaceImage (photoId) {
    const { place={} } = this.props
    const shopId = place && place._id
    var message = ReactDOM.findDOMNode(this.refs['placeimages_message' + photoId]).value
    this.props.editPlaceImage(shopId, photoId, message)
  }

  editPlace () {
    const { place={} } = this.props
    const shopId = place && place._id
    // const placeId = `${this.props.params.placeId}`
    var name = ReactDOM.findDOMNode(this.refs.name).value 
    var name_en = ReactDOM.findDOMNode(this.refs.name_en).value 
    var description = ReactDOM.findDOMNode(this.refs.description).value 
    var description_en = ReactDOM.findDOMNode(this.refs.description_en).value 
    var seoname = ReactDOM.findDOMNode(this.refs.seoname).value 
    var subname = ReactDOM.findDOMNode(this.refs.subname).value 
    var addr = ReactDOM.findDOMNode(this.refs.addr).value 
    var addr_en = ReactDOM.findDOMNode(this.refs.addr_en).value 
    var phone = ReactDOM.findDOMNode(this.refs.phone).value 
    var website = ReactDOM.findDOMNode(this.refs.website).value 
    var facebook = ReactDOM.findDOMNode(this.refs.facebook).value 
    var lon = ReactDOM.findDOMNode(this.refs.lon).value 
    var lat = ReactDOM.findDOMNode(this.refs.lat).value 
    var industryTags = JSON.parse(ReactDOM.findDOMNode(this.refs.industryTags).value)
    this.props.editPlace({shopId, name, name_en, description, description_en, seoname, subname, addr, addr_en, phone, website, facebook, lon, lat, industries: industryTags})
  }

  addToThisSeasonRank () {
    const { place={} } = this.props
    const shopId = place && place._id
    const industryId = JSON.parse(ReactDOM.findDOMNode(this.refs.industryTags2).value)[0].industry_id
    const rank = ReactDOM.findDOMNode(this.refs.rank).value 
    console.log([shopId, industryId])
    this.props.addToThisSeasonRank(shopId, industryId, rank)
  }
  
  addToLastSeasonRank () {
    const { place={} } = this.props
    const shopId = place && place._id
    const industryId = JSON.parse(ReactDOM.findDOMNode(this.refs.industryTags2).value)[0].industry_id
    console.log([shopId, industryId])
    const rank = ReactDOM.findDOMNode(this.refs.rank).value 
    this.props.addToLastSeasonRank(shopId, industryId, rank)
  }

  render () {
    const { user, place={}, images=[] } = this.props
    let placeimages = this.state && this.state.placeimages || []
    let placeindustries = this.state && this.state.placeindustries || []
    if (!user.isAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>
        _id: {place._id} <br/>
        name: <input type='text' ref='name' /><br/>
        name_en: <input type='text' ref='name_en' /><br/>
        description: <input type='text' ref='description' /><br/>
        description_en: <input type='text' ref='description_en' /><br/>
        seoname: <input type='text' ref='seoname' /><br/>
        subname: <input type='text' ref='subname' /><br/>
        addr: <input type='text' ref='addr' /><br/>
        addr_en: <input type='text' ref='addr_en' /><br/>
        phone: <input type='text' ref='phone' /><br/>
        facebook: <input type='text' ref='facebook' /><br/>
        lon: <input type='text' ref='lon' />    lat: <input type='text' ref='lat' /><br/>
        website: <input type='text' ref='website' /> 
        <button className='btn btn-primary' onClick={this.editPlace.bind(this)}>save </button>
        <div className='row'>
        <div className='col-md-offset-6'>
          <IndustryTagsInput ref='industryTags' tags={placeindustries}/>
        </div>
        </div>
        <br/>

        daily start / end
        mon <br/>
        start <input type='text' ref='start1_1' /><br/>
        end <input type='text' ref='end1_1' /><br/>
        start <input type='text' ref='start1_2' /><br/>
        end <input type='text' ref='end1_2' /><br/>

        <hr/> tue <br/>
        start <input type='text' ref='start2_1' /><br/>
        end <input type='text' ref='end2_1' /><br/>
        start <input type='text' ref='start2_2' /><br/>
        end <input type='text' ref='end2_2' /><br/>

        <hr/> wed <br/>
        start <input type='text' ref='start3_1' /><br/>
        end <input type='text' ref='end3_1' /><br/>
        start <input type='text' ref='start3_2' /><br/>
        end <input type='text' ref='end3_2' /><br/>

        <hr/> thu <br/>
        start <input type='text' ref='start4_1' /><br/>
        end <input type='text' ref='end4_1' /><br/>
        start <input type='text' ref='start4_2' /><br/>
        end <input type='text' ref='end4_2' /><br/>

        <hr/> fri <br/>
        start <input type='text' ref='start5_1' /><br/>
        end <input type='text' ref='end5_1' /><br/>
        start <input type='text' ref='start5_2' /><br/>
        end <input type='text' ref='end5_2' /><br/>

        <hr/> sat <br/>
        start <input type='text' ref='start6_1' /><br/>
        end <input type='text' ref='end6_1' /><br/>
        start <input type='text' ref='start6_2' /><br/>
        end <input type='text' ref='end6_2' /><br/>

        <hr/> sun <br/>
        start <input type='text' ref='start7_1' /><br />
        end <input type='text' ref='end7_1' /><br />
        start <input type='text' ref='start7_2' /><br />
        end <input type='text' ref='end7_2' /><br />

        images: <br/>

        {placeimages.map((d, i) => {
          return <div>
            <img src={d.path} style={{width: '300px', height: '200px'}}/>
            <button onClick={this.deleteImage.bind(this, d.photo_id)}> X </button>
            message: <input ref={'placeimages_message' + d.photo_id} type='text' />            
            <button onClick={this.editPlaceImage.bind(this, d.photo_id)}> save </button>
          </div>
        })}

        <input type='text' ref='rank'/>
        <div style={{zIndex: 1, marginLeft: '200px'}}>
          add to ranking info: <br/>
          <button onClick={this.addToThisSeasonRank.bind(this)} >add to this season ranking yay</button>
          <button onClick={this.addToLastSeasonRank.bind(this)} >add to last season ranking yay</button>
          <IndustryTagsInput ref='industryTags2' />
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  industries: state.industries,
  place: state.place,
  images: state.placeimages.images
})
export default connect((mapStateToProps), {
  fetchProfile, getPlace, getPlaceImages, deleteImage, editPlace, editPlaceImage, addToLastSeasonRank, addToThisSeasonRank
})(AdminPlaceEditContainer)
