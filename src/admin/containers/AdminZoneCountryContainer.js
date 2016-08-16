/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getCountry, editCountry } from '../../zones/reducers/country'
import { getLanguages } from '../../languages/reducers/language'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminZoneCountryContainer extends React.Component<void, Props, void> {
  static propTypes = {
    params: PropTypes.object,
    country: PropTypes.object,
    user: PropTypes.object,
    languages: PropTypes.array,
    getCountry: PropTypes.func.isRequired,
    getLanguages: PropTypes.func.isRequired,
    editCountry: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  };

  componentDidMount () {
    const zid = `${this.props.params.zid}`
    this.props.fetchProfile()
    this.props.getCountry(zid)
    this.props.getLanguages()
  }

  componentDidUpdate () {
    const { user, languages, country } = this.props
    if (!user.isRootAdmin) {
      window.location.href = '/'
    }

    const { isLoaded2, isLoaded2Language } = this.state || {}
    if (country._id) {
      ReactDOM.findDOMNode(this.refs.zn).value = country.zn || ''
    }

    if (languages.length && country._id) {
      languages.map((d) => {
        ReactDOM.findDOMNode(this.refs['description_' + d.identifier]).value = country.zns_ && country.zns_[d.identifier] || ''
      })
    }
  }

  editCountry(){
    const { languages } = this.props
    const zid = `${this.props.params.zid}`
    const zn = ReactDOM.findDOMNode(this.refs.zn).value
    let zns_ = {};
    languages.map((d) => {
      zns_[d.identifier] = ReactDOM.findDOMNode(this.refs['description_' + d.identifier]).value
    })

    this.props.editCountry(zid, {zn, zns_})
  }

  render () {
    const { user, country, languages } = this.props
    if (!user.isAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>
        name: <input type='text' ref='zn' /><br/>

        {languages.map((d) => {
          return <div>{d.identifier} : <input type='text' ref={'description_' + d.identifier} /></div>
        })}

        <button className='btn btn-primary' onClick={this.editCountry.bind(this)}>save </button>
        <Link to={`/zadmin/zones/countries/${country.zid}/states`}>states....</Link> 
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  country: state.country.country,
  languages: state.language.languages,
})
export default connect((mapStateToProps), {
  fetchProfile, getCountry, getLanguages, editCountry
})(AdminZoneCountryContainer)
