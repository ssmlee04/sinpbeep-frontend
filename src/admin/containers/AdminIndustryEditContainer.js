/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getIndustry, editIndustry } from '../../industry/reducers/industry'
import { getLanguages } from '../../languages/reducers/language'
import ReactDOM from 'react-dom'
import StatTagsInput from '../../admin/components/StatTagsInput'
import IndustryTagsInput from '../../admin/components/IndustryTagsInput'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminIndustryEditContainer extends React.Component<void, Props, void> {
  static propTypes = {
    params: PropTypes.object,
    industry: PropTypes.object,
    languages: PropTypes.array,
    user: PropTypes.object,
    editIndustry: PropTypes.func.isRequired,
    getIndustry: PropTypes.func.isRequired,
    getLanguages: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  }

  componentDidMount () {
    const industryId = `${this.props.params.industryId}`
    this.props.fetchProfile()
    this.props.getIndustry({industryId})
    this.props.getLanguages()
  }

  componentDidUpdate () {
    const { user, languages, industry } = this.props
    if (!user.isRootAdmin) {
      window.location.href = '/'
    }

    const { isLoaded, isLoadedLanguage } = this.state || {}
    if (industry._id && !isLoaded) {
      ReactDOM.findDOMNode(this.refs.name).value = industry.name || ''
      ReactDOM.findDOMNode(this.refs.if_rank).value = industry.if_rank
      ReactDOM.findDOMNode(this.refs.if_show).value = industry.if_show
      ReactDOM.findDOMNode(this.refs.price_multi).value = industry.price_multi
      ReactDOM.findDOMNode(this.refs.time_multi).value = industry.time_multi
      // ReactDOM.findDOMNode(this.refs.ancestor).value = industry.ancestor
      
      this.setState({
        isLoaded: true,
        industryancestor: [{industry_id: industry.ancestor}] || [],
        industryownstats: industry.ownstats || [],
        industryparentstats: industry.ancestorstats || [],
      })
    }

    if (languages.length && !isLoadedLanguage && industry._id) {
      languages.map((d) => {
        ReactDOM.findDOMNode(this.refs['description_' + d.identifier]).value = industry.description[d.identifier] || ''
      })
    }
  }

  editIndustry(){
    const { languages } = this.props
    const industryId = `${this.props.params.industryId}`
    const name = ReactDOM.findDOMNode(this.refs.name).value
    const if_rank = ReactDOM.findDOMNode(this.refs.if_rank).value
    const if_show = ReactDOM.findDOMNode(this.refs.if_show).value
    console.log("ownstats")
    console.log(ReactDOM.findDOMNode(this.refs.industryTags).value)
    console.log(ReactDOM.findDOMNode(this.refs.statTags).value)
    const ownstats = JSON.parse(ReactDOM.findDOMNode(this.refs.statTags).value || '[]')
    console.log(ownstats)
    const ancestor = JSON.parse(ReactDOM.findDOMNode(this.refs.industryTags).value  || '[]')[0].industry_id
    console.log(ancestor)
    const price_multi = ReactDOM.findDOMNode(this.refs.price_multi).value
    const time_multi = ReactDOM.findDOMNode(this.refs.time_multi).value
    // const ancestor = ReactDOM.findDOMNode(this.refs.ancestor).value
    let description = {}
    languages.map((d) => {
      description[d.identifier] = ReactDOM.findDOMNode(this.refs['description_' + d.identifier]).value
    })

    console.log({name, description, ancestor, if_rank, if_show, time_multi, price_multi, ownstats})
    this.props.editIndustry(industryId, {name, description, ancestor, if_rank, if_show, time_multi, price_multi, ownstats})
  }

  render () {
    const { user, industry, languages } = this.props
    let industryancestor = this.state && this.state.industryancestor || []
    let industryownstats = this.state && this.state.industryownstats || []
    let industryparentstats = this.state && this.state.industryparentstats || []

    if (!user.isRootAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>
        name: <input type='text' ref='name' /><br/>
        <hr/>
        {languages.map((d) => {
          return <div>{d.identifier} : <input type='text' ref={'description_' + d.identifier} /></div>
        })}
        <hr/>
        if_rank <input type='text' ref='if_rank' /><br/>
        if_show <input type='text' ref='if_show' /><br/>
        time_multi <input type='text' ref='time_multi' /><br/>
        price_multi <input type='text' ref='price_multi' /><br/>
        <hr/>

        ancestor <IndustryTagsInput ref='industryTags' tags={industryancestor}/>
        ownstats <StatTagsInput ref='statTags' tags={industryownstats}/>
        <div className='parentstats'>
          parentsstats <StatTagsInput tags={industryparentstats}/>
        </div>

        <button className='btn btn-primary' onClick={this.editIndustry.bind(this)}>save </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  industry: state.industry.industry,
  languages: state.language.languages,
})
export default connect((mapStateToProps), {
  fetchProfile, getIndustry, editIndustry, getLanguages
})(AdminIndustryEditContainer)
