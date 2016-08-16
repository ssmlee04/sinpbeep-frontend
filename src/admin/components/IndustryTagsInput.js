/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import ReactDOM from 'react-dom'
import '../../admin/styles/TagsInput.scss'
import { getPlace } from '../../places/reducers/place'
// var ReactTags = require('react-tag-input').WithContext
import { WithContext as ReactTags } from 'react-tag-input'
import { getIndustries } from '../../industry/reducers/industry'

type Props = {
  user: Object
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class IndustryTagsInput extends React.Component<void, Props, void> {
  constructor(props) {
    super(props);
    this.state = {tags: []}
  }

  static propTypes = {
    tags: PropTypes.array,
    industries: PropTypes.array,
    params: PropTypes.object,
    user: PropTypes.object,
    getPlace: PropTypes.func.isRequired,
    getIndustries: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { industries } = this.props
    if (!industries || !industries.length) {
      this.props.getIndustries()
    }

    console.log("componentDidUpdate")
    const { tags=[] } = this.props
    const { isLoadedTag, isLoadedSuggestion } = this.state || {}

    if (tags.length && !isLoadedTag) {
      console.log("in position.... isLoadedTag")
      let actualTags = tags.map((d) => {
        industries.map((d1) => {
          if (d1._id === d.industry_id) {
            d.text = d1.name
            d._id = d1._id
            d.industry_id = d1._id
          }
        })
        return d
      })
      this.setState({
        isLoadedTag: true,
        tags: actualTags,
      })
    } 

    if (industries.length && !isLoadedSuggestion) {
      console.log("in position.... isLoadedSuggestion")
      let names = industries.map((d) => {
        return d.name
      })
      this.setState({
        isLoadedSuggestion: true,
        suggestions: names,
      })
    } 
  }
  
  componentDidUpdate () {
    console.log("componentDidUpdate")
    const { industries, tags=[] } = this.props
    const { isLoadedTag, isLoadedSuggestion } = this.state || {}

    if (tags.length && !isLoadedTag) {
      console.log("in position.... isLoadedTag")
      let actualTags = tags.map((d) => {
        industries.map((d1) => {
          if (d1._id === d.industry_id) {
            d.text = d1.name
            d._id = d1._id
            d.industry_id = d1._id
          }
        })
        return d
      })
      this.setState({
        isLoadedTag: true,
        tags: actualTags,
      })
    } 

    if (industries.length && !isLoadedSuggestion) {
      console.log("in position.... isLoadedSuggestion")
      let names = industries.map((d) => {
        return d.name
      })
      this.setState({
        isLoadedSuggestion: true,
        suggestions: names,
      })
    } 
  }

  handleDelete (i) {
    var tags = this.state.tags
    tags.splice(i, 1)
    this.setState({tags: tags})
  }
  handleAddition (tag) {
    var tags = this.state.tags
    const { industries } = this.props
    let id
    industries.map((d) => {
      if (d.name === tag) {
        id = d._id
      }
    })
    tags.push({
      _id: id,
      industry_id: id,
      text: tag
    })
    this.setState({tags: tags})
  }

  render () {
    const { industries } = this.props
    console.log(industries)
    console.log(industries)
    console.log(industries)
    var tags = this.state && this.state.tags || []
    var suggestions = this.state && this.state.suggestions || []
    console.log({suggestions})
    console.log({tags})
    console.log("JSON.stringify(tags)")
    console.log("JSON.stringify(tags)")
    console.log("JSON.stringify(tags)")
    console.log("JSON.stringify(tags)")
    console.log(JSON.stringify(tags))
    return (
        <div value={JSON.stringify(tags)}>
          <ReactTags tags={tags}
            suggestions={suggestions}
            handleDelete={this.handleDelete.bind(this)}
            handleAddition={this.handleAddition.bind(this)}
          />
        </div>
        )
  }
}

const mapStateToProps = (state) => ({
  industries: state.industry.industries
})
export default connect((mapStateToProps), {
  getIndustries
})(IndustryTagsInput)
