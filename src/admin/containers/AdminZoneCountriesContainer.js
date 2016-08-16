/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getCountries } from '../../zones/reducers/country'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminZoneCountriesContainer extends React.Component<void, Props, void> {
  static propTypes = {
    countries: PropTypes.array,
    user: PropTypes.object,
    getCountries: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.fetchProfile()
    this.props.getCountries()
  }

  componentDidUpdate () {
    // setTimeout(() => {
      const { user } = this.props
      if (!user.isRootAdmin) {
        window.location.href = '/'
      }
    // }, 5000)
  }

  render () {
    const { user, countries } = this.props
    console.log(countries)
    if (!user.isAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>
        {countries.map((d, i) => {
          return <div>
            <Link to={`/zadmin/zones/countries/${d.zid}`}>{d.zn}</Link> 
          </div>
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  countries: state.country.countries,
})
export default connect((mapStateToProps), {
  fetchProfile, getCountries
})(AdminZoneCountriesContainer)
