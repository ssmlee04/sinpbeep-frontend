/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getCurrencies } from '../../currency/reducers/currency'
import { getStats } from '../../stats/reducers/stats'
import { fetchProfile } from '../../users/reducers/user'
import PlaceBasicPanel from '../../places/components/PlaceBasicPanel'
import BusinessHour from '../../places/components/BusinessHour'
import PlaceUserStatBarReview from '../../places/components/PlaceUserStatBarReview'
import PlaceUserStatReview from '../../places/components/PlaceUserStatReview'
import PlaceEventsArea from '../../places/components/PlaceEventsArea'

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlaceTopPanel extends React.Component<void, Props, void> {
  static propTypes = {
    currencies: PropTypes.array,
    stats: PropTypes.array,
    place: PropTypes.object,
    user: PropTypes.object,
    getStats: PropTypes.func.isRequired,
    getCurrencies: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired,
    // setCheckin: PropTypes.func.isRequired,
    // setCollect: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getCurrencies()
    this.props.getStats()
    // this.props.getStats()
    // this.context.executeAction(loadStats, {})
    // this.context.executeAction(loadCurrencies, {})
  }

  render() {
    const {place, user, currencies, stats} = this.props
    // const that = this
    const src = place.image || place.thumb || ''
    const business_hour = place.business_hour && place.business_hour.hour
    const business_month = place.business_hour && place.business_hour.month
    return (
      <div className='row' style={{backgroundColor: '#FFFFFF', marginTop: '15px'}}>
        <div className='col-md-6 col-md-offset-1 '>
          <img src={src} style={{width: '95%', marginLeft: '20px'}} className='img img-thumbnail '/>
        </div>
        <div className='col-md-4 col-xs-12 col-sm-12'>
          <div className='webonly-width-90-percent webonly'>
            <PlaceBasicPanel place={place} /> 
          </div>
          <br/>
          {place.description && <h6 className='quotefont'><i className='glyphicon glyphicon-cog'></i>: {place.description}</h6>}
          
          {(business_month || business_hour) && <h6 className='quotefont'><i className='glyphicon glyphicon-time'></i>
            place.businesshour
          </h6>}
          
          <div style={{marginTop: '-10px'}} className='mobile-margin-left-10'>
            <BusinessHour hours={business_hour} />
          </div>
          {(business_month || business_hour) && <hr/>}

          <v className='mobile-margin-left-10' >
            <PlaceUserStatReview place={place} placestats={place.statsinfo} stats={stats}/> 
          </v>
          <hr />
          <div>
            <PlaceUserStatBarReview place={place} user={user} currencies={currencies}/>
          </div>
          <div>
            <PlaceEventsArea events={place.events || []} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currency.currencies,
  stats: state.stats.stats,
  user: state.user,
})
export default connect((mapStateToProps), {
  getCurrencies, getStats, fetchProfile
  // getIndustries, fetchProfile, setCollect, setCheckin
})(PlaceTopPanel)