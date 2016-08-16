/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
// import ReactDOM from 'react-dom'
import '../../admin/styles/TagsInput.scss'
import { WithContext as ReactTags } from 'react-tag-input'
// var ReactTags = require('react-tag-input').WithContext
import { getStats } from '../../stats/reducers/stats'

type Props = {
  user: Object
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class StatTagsInput extends React.Component<void, Props, void> {
  constructor(props) {
    super(props);
    this.state = {tags: []}
  }
  
  static propTypes = {
    tags: PropTypes.array,
    stats: PropTypes.array,
    params: PropTypes.object,
    // user: PropTypes.object,
    // getPlace: PropTypes.func.isRequired,
    getStats: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { stats } = this.props
    if (!stats || !stats.length) {
      this.props.getStats()
    }
  }

  componentDidUpdate () {
    const { stats, tags=[] } = this.props
    const { isLoadedTag, isLoadedSuggestion } = this.state || {}

    console.log({tags})
    if (tags.length && !isLoadedTag) {
      console.log("in position.... isLoadedTag")
      let actualTags = tags.map((d) => {
        stats.map((d1) => {
          if (d1._id === d.stat_id) {
            d.text = d1.name
            d._id = d1._id
            d.stat_id = d1._id
          }
        })
        return d
      }) || []
      this.setState({
        isLoadedTag: true,
        tags: actualTags,
      })
    } 

    if (stats.length && !isLoadedSuggestion) {
      console.log("in position.... isLoadedSuggestion")
      let names = stats.map((d) => {
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
    const { stats } = this.props
    let id
    stats.map((d) => {
      if (d.name === tag) {
        id = d._id
      }
    })
    tags.push({
      _id: id,
      stat_id: id,
      text: tag
    })
    this.setState({tags: tags})
  }

  render () {
    const { stats } = this.props
    var tags = this.state && this.state.tags || []
    var suggestions = this.state && this.state.suggestions || []

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
  stats: state.stats.stats
})
export default connect((mapStateToProps), {
  getStats
})(StatTagsInput)
