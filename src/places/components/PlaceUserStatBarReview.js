/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
// import { getCurrencies } from '../../currency/reducers/currency'
// import { getStats } from '../../stats/reducers/stats'
// import { fetchProfile } from '../../users/reducers/user'
import RatingBar from '../../places/components/RatingBar'
import { setPlaceTime, setPlacePrice } from '../../places/reducers/placevote'
// import { votePlaceTime, votePlacePrice } from '../../places/actions/PlaceActionCreators';
import ReactTooltip from 'react-tooltip'

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlaceUserStatBarReview extends React.Component<void, Props, void> {
  static propTypes = {
    place: PropTypes.object,
    user: PropTypes.object,
    currencies: PropTypes.array,
    // place: PropTypes.object,
    // user: PropTypes.object,
    // getStats: PropTypes.func.isRequired,
    // getCurrencies: PropTypes.func.isRequired,
    setPlaceTime: PropTypes.func.isRequired,
    setPlacePrice: PropTypes.func.isRequired,
  };

  submitTime(shopId) {
    const value = ReactDOM.findDOMNode(this.refs.time).value;
    const time = {
      low: value,
      high: value
    };
    this.props.setPlaceTime({shopId, time})
  }

  submitPrice(shopId) {
    const {user} = this.props;
    const value = ReactDOM.findDOMNode(this.refs.price).value;
    const price = {
      low: value,
      high: value,
      currency: user.currency
    };
    this.props.setPlacePrice({shopId, price})
  }

  render() {
    const {place, user, currencies} = this.props;
    var shopId = place && place._id;
    const avgtime_high = place.otherstats && place.otherstats.avgtime_high || 0;
    const avgtime_low = place.otherstats && place.otherstats.avgtime_low || 0;
    const avgspending_high = place.otherstats && place.otherstats.avgspending_high || 0;
    const avgspending_low = place.otherstats && place.otherstats.avgspending_low || 0;
    const r_time = place.r_time && place.r_time.low || 0;
    const r_price = place.r_price && place.r_price.low || 0;

    var currencyMax = 50;
    var currencyRate = 1;
    var currency = 'USD';
    
    currencies.map(function(d){
      if (user && place && place.r_price && d.name === place.r_price.currency) {
        currencyMax = 50 * d.rate;
        currencyRate = d.rate;
        currency = d.name;
      } else if (user && d.name === user.currency) {
        currencyMax = 50 * d.rate;
        currencyRate = d.rate;
        currency = d.name;
      }
    });

    let ifTime, ifPrice;
    (place.industries || []).map(function(d) {
      if (d.industry_id === '55051a1b1ee64e020c568f37') {
        ifTime = true;
      }
      if (d.industry_id === '540682ffd5c5d9c5d47091ee') {
        ifPrice = true;
      }
    })

    let MinsArea;
    if (avgtime_high && avgtime_low) {
      MinsArea = <h6 className='inline'>({avgtime_low.toFixed(0)} - {avgtime_high.toFixed(0)} mins)</h6>
    } else {
      MinsArea = <h6 className='inline'>(??? mins)</h6>
    }
    let MoneyArea;
    if (avgspending_high && avgspending_low) {
      MoneyArea = <h6 className='inline'>({(avgspending_low*currencyRate).toFixed(2)} - {(avgspending_high*currencyRate).toFixed(2)} {currency})</h6>
    } else {
      MoneyArea = <h6 className='inline'>(??? {currency})</h6>
    }

    return (
      <div className='quotefont'>
        <ReactTooltip />
        {ifTime && <div>
          <div className='row ' >
            <div className='col-md-11' >
              <h6><div className='inline' data-tip='please rate the avg time you spend here' data-place='top' data-type='dark'>
                place.avgtime {MinsArea}
              </div></h6>
              <RatingBar ref='time' min={0} max={300} avglow={avgtime_low.toFixed(0)} avghigh={avgtime_high.toFixed(0)} score={r_time} onMouseUp={this.submitTime.bind(this, shopId)}/>
            </div>
            <div className='col-md-1'></div>
          </div>
        </div>}
        {ifPrice && <div style={{marginTop: '-10px'}}>
          <div className='row'>
            <div className='col-md-11' >
              <h6><div className='inline' data-tip='please rate the avg money you spend here' data-place='top' data-type='dark'>
                place.avgprice {MoneyArea}
              </div></h6>
              <RatingBar ref='price' min={0} max={currencyMax} avglow={(avgspending_low*currencyRate).toFixed(1)} avghigh={(avgspending_high*currencyRate).toFixed(1)} score={r_price} onMouseUp={this.submitPrice.bind(this, shopId)}/>
            </div>
            <div className='col-md-1'></div>
          </div>
        </div>}
        <hr/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})
export default connect((mapStateToProps), {
  setPlaceTime, setPlacePrice
})(PlaceUserStatBarReview)