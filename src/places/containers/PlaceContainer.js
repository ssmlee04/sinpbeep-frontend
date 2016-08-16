/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getPlace } from '../../places/reducers/place'
import PlaceBreadCrumb from '../../places/components/PlaceBreadCrumb'
import PlaceHeaderPanel from '../../places/components/PlaceHeaderPanel'
import PlaceMenu from '../../places/components/PlaceMenu'
// import PlaceMenuContent from '../../places/components/PlaceMenuContent'
import PlaceTopPanel from '../../places/components/PlaceTopPanel'
import DocumentTitle from 'react-document-title'
import DocMeta from 'react-doc-meta'

type Props = {
  place: Object,
};

const generateTags = function (place) {
  let tags = []
  if (place && place.name) {
    tags.push({itemProp: 'name', content: place.name + ' ' + place.subname})
  }
  if (place && place.description) {
    tags.push({itemProp: 'description', content: place.description})
  }
  if (place && place.seoname) {
    tags.push({itemProp: 'url', content: 'https://www.clearstreet.io/places/' + place.seoname})
  }
  if (place && place.image) {
    tags.push({itemProp: 'image', content: place.image})
  }
  if (place && place.addr) {
    tags.push({itemProp: 'address', content: place.addr})
  }
  if (place && place.addr_en) {
    tags.push({itemProp: 'address-en', content: place.addr_en})
  }
  if (place && place.phone) {
    tags.push({itemProp: 'phone', content: place.phone})
  }
  if (place && place.name) {
    tags.push({property: 'og:title', content: place.name + ' ' + place.subname})
  }
  if (place && place.otherstats && place.otherstats.avgspending_low) {
    tags.push({property: 'og:price:amount', content: place.otherstats.avgspending_low + ' to ' + place.otherstats.avgspending_high})
  }
  if (place && place.otherstats && place.otherstats.avgspending_low) {
    tags.push({property: 'og:price:currency', content: 'USD'})
  }
  if (place && place.image) {
    tags.push({property: 'og:price:image', content: place.image})
  }
  if (place && place.otherstats && place.otherstats.avgspending_low) {
    tags.push({property: 'og:site_name', content: 'www.clearstreet.io'})
  }
  if (place && place.keywords) {
    let tempStr = ''
    place.keywords.map(function(d) {
      tempStr += d + ', '
    })
    tags.push({property: 'og:industries', content: tempStr})
  }
  if (true) {
    tags.push({property: 'og:facebook', content: 'https://www.facebook.com/clearstreet/?ref=aymt_homepage_panel'})
  }
  return tags
}

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlaceContainer extends React.Component<void, Props, void> {
  static propTypes = {
    place: PropTypes.object,
    params: PropTypes.object,
    getPlace: PropTypes.func.isRequired,
  }

  componentDidMount() {
    let placeId = `${this.props.params.placeId}`
    console.log(placeId)
    this.props.getPlace(placeId)
  }

  render() {
    const { place } = this.props
    const name = place && place.name || 'Clearstreet Taipei'
    const tags = generateTags(place)

    return (
      <div className='container-fluid mobile-margin-top--30 web-margin-top--20 ' style={{marginTop: '48px'}}>
        <DocumentTitle title={name} />
        <DocMeta tags={tags} />
        <div className='row no-gutter'>
          <div className='col-md-12'>
            <PlaceBreadCrumb place={place} />
          </div>
          <div className='col-md-12'>
            <PlaceHeaderPanel place={place} />
          </div>
          <div className='col-md-12'>
            <PlaceTopPanel place={place} />
          </div>
          <div className='col-md-12 mobile-margin-left-10'>
            <br/>
            <PlaceMenu place={place} {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  place: state.place
})
export default connect((mapStateToProps), {
  getPlace
})(PlaceContainer)
