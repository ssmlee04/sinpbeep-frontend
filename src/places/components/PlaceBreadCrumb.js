/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
// import { getPlace } from '../../places/reducers/place'

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// this we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlaceBreadCrumb extends React.Component<void, Props, void> {
  static propTypes = {
    place: PropTypes.object
  }

  onClick (zid, sid, cid) {
    console.log([zid, sid, cid])
    console.log([zid, sid, cid])
    console.log([zid, sid, cid])
    // this.context.executeAction(setGlobal, {zid, sid, cid})
  }

  render () {
    const {place} = this.props
    const {zid, sid, cid, zn, sn, cn, name, seoname} = place || {}

    const znLink = () => {
      if (zn && zid) {
        return (<h5 style={{display: 'inline'}}>
          <Link to='/places'>
            <span onClick={this.onClick.bind(this, zid, null, null)}>{zn}</span>
          </Link> >
        </h5>)
      }
    }
    const snLink = () => {
      if (sn && sid) {
        return (<h5 style={{display: 'inline'}}><Link to='/places'><span onClick={this.onClick.bind(this, zid, sid, null)}>{sn}</span></Link> > </h5>)
      }
    }
    const cnLink = () => {
      if (cn && cid) {
        return (<h5 style={{display: 'inline'}}><Link to='/places'><span onClick={this.onClick.bind(this, zid, sid, cid)}>{cn}</span></Link> > </h5>)
      }
    }
    const shopLink = () => {
      return (<h5 style={{display: 'inline'}}><Link to={'/places/' + seoname}>{name}</Link></h5>)
    }
    return (
      <div className='row quotefont' style={{backgroundColor: '#FBFAFC', border: 'solid 1px #F2F2F2'}}>
        <div className='col-md-10 col-md-offset-1'>
          <Link to='/'><h5 style={{display: 'inline'}}>Home</h5></Link><h5 style={{display: 'inline'}}> > </h5>
          {znLink()}
          {snLink()}
          {cnLink()}
          {shopLink()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // place: state.place
})
export default connect((mapStateToProps), {
  // getPlace
})(PlaceBreadCrumb)