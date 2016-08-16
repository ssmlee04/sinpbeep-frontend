/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getRankedShops } from '../../places/reducers/placerank'
import ReactDOM from 'react-dom'
import IndustryTagsInput from '../../admin/components/IndustryTagsInput'
import SearchAreaZone from './../../system/components/SearchAreaZone'
import SearchAreaIndustry from './../../system/components/SearchAreaIndustry'

type Props = {
  user: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminRanksContainer extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    shops: PropTypes.array,
    getRankedShops: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchProfile()
  }

  componentDidUpdate () {
    const { user } = this.props
    if (!user.isAdmin) {
      window.location.href = '/'
    }
  }

  getRankedShops () {
    const time = ReactDOM.findDOMNode(this.refs.time).value
    const zone = ReactDOM.findDOMNode(this.refs.zone).value
    const iid = ReactDOM.findDOMNode(this.refs.industry).value
    let ids1 = '[' + zone + ']';
    ids1 = JSON.parse(ids1)
    const zid = ids1[0];
    const sid = ids1[1];
    const cid = ids1[2];
    let ids2 = '[' + time + ']';
    ids2 = JSON.parse(ids2)
    const year = ids2[0];
    const season = ids2[1];
    this.props.getRankedShops({year, season, zid, sid, iid, cid})
  }

  render () {
    const { user, shops=[] } = this.props
    if (!user.isAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>

        iid <SearchAreaIndustry ifShow={'rank'} ref='industry' />
        zid, sid, cid <SearchAreaZone ref='zone' />
        year: <select ref='time'>
          <option value='2015,3'>2015 season 3 </option>
          <option value='2015,4'>2015 season 4 </option>
          <option value='2016,1'>2016 season 1 </option>
          <option value='2016,2'>2016 season 2 </option>
          <option value='2016,3'>2016 season 3 </option>
          <option value='2016,4'>2016 season 4 </option>
          <option value='2017,1'>2017 season 1 </option>
          <option value='2017,2'>2017 season 2 </option>
          <option value='2017,3'>2017 season 3 </option>
          <option value='2017,4'>2017 season 4 </option>
        </select><br/>

        <button onClick={this.getRankedShops.bind(this)}>search</button>

        {shops.map((d, i) => {
          return (<div>
            <Link to={`/places/${d.seoname}`} >{d.rank} => {d.name} </Link><br/>
          </div>)
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  shops: state.placerank.shops,
  user: state.user,
})
export default connect((mapStateToProps), {
  fetchProfile, getRankedShops
})(AdminRanksContainer)
