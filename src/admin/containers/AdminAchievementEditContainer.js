/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getAchievement, editAchievement } from '../../achievements/reducers/achievement'
import { getLanguages } from '../../languages/reducers/language'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminAchievementEditContainer extends React.Component<void, Props, void> {
  static propTypes = {
    params: PropTypes.object,
    user: PropTypes.object,
    languages: PropTypes.array,
    achievement: PropTypes.object,
    editAchievement: PropTypes.func.isRequired,
    getAchievement: PropTypes.func.isRequired,
    getLanguages: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  }

  componentDidMount () {
    const achievementId = `${this.props.params.achievementId}`
    this.props.fetchProfile()
    this.props.getAchievement({achievementId})
    this.props.getLanguages()
  }

  componentDidUpdate () {
    const { user, languages, achievement } = this.props
    if (!user.isRootAdmin) {
      window.location.href = '/'
    }

    if (achievement._id) {
      ReactDOM.findDOMNode(this.refs.name).value = achievement.name || ''
      ReactDOM.findDOMNode(this.refs.n_friends).value = achievement.requirements && achievement.requirements.n_friends || 0
      ReactDOM.findDOMNode(this.refs.n_reviewlikes).value = achievement.requirements && achievement.requirements.n_reviewlikes || 0
      ReactDOM.findDOMNode(this.refs.n_imagelikes).value = achievement.requirements && achievement.requirements.n_imagelikes || 0
      ReactDOM.findDOMNode(this.refs.n_countries_visited).value = achievement.requirements && achievement.requirements.n_countries_visited || 0
      ReactDOM.findDOMNode(this.refs.n_cities_visited).value = achievement.requirements && achievement.requirements.n_cities_visited || 0
      ReactDOM.findDOMNode(this.refs.n_max_balance).value = achievement.requirements && achievement.requirements.n_max_balance || 0
      ReactDOM.findDOMNode(this.refs.n_verifiedshops).value = achievement.requirements && achievement.requirements.n_verifiedshops || 0
      ReactDOM.findDOMNode(this.refs.n_pendingshops).value = achievement.requirements && achievement.requirements.n_pendingshops || 0
      ReactDOM.findDOMNode(this.refs.n_reviews).value = achievement.requirements && achievement.requirements.n_reviews || 0
      ReactDOM.findDOMNode(this.refs.n_images).value = achievement.requirements && achievement.requirements.n_images || 0
      ReactDOM.findDOMNode(this.refs.n_checkin).value = achievement.requirements && achievement.requirements.n_checkin || 0
      ReactDOM.findDOMNode(this.refs.n_collect).value = achievement.requirements && achievement.requirements.n_collect || 0
      ReactDOM.findDOMNode(this.refs['reward' + achievement.reward]).checked = true
    }

    if (languages.length && achievement._id) {
      languages.map((d) => {
        ReactDOM.findDOMNode(this.refs['description_' + d.identifier]).value = achievement.description[d.identifier] || ''
      })
    }
  }

  editAchievement(){
    const { languages } = this.props
    const achievementId = `${this.props.params.achievementId}`
    const name = ReactDOM.findDOMNode(this.refs.name).value
    let description = {}
    let reward
    languages.map((d) => {
      description[d.identifier] = ReactDOM.findDOMNode(this.refs['description_' + d.identifier]).value
    })
    
    if (ReactDOM.findDOMNode(this.refs['reward1']).checked) {
      reward = 1
    }
    if (ReactDOM.findDOMNode(this.refs['reward2']).checked) {
      reward = 2
    }
    if (ReactDOM.findDOMNode(this.refs['reward3']).checked) {
      reward = 3
    }
    let requirements = {
      n_friends: ReactDOM.findDOMNode(this.refs.n_friends).value,
      n_reviewlikes: ReactDOM.findDOMNode(this.refs.n_reviewlikes).value,
      n_imagelikes: ReactDOM.findDOMNode(this.refs.n_imagelikes).value,
      n_countries_visited: ReactDOM.findDOMNode(this.refs.n_countries_visited).value,
      n_cities_visited: ReactDOM.findDOMNode(this.refs.n_cities_visited).value,
      n_max_balance: ReactDOM.findDOMNode(this.refs.n_max_balance).value,
      n_verifiedshops: ReactDOM.findDOMNode(this.refs.n_verifiedshops).value,
      n_pendingshops: ReactDOM.findDOMNode(this.refs.n_pendingshops).value,
      n_reviews: ReactDOM.findDOMNode(this.refs.n_reviews).value,
      n_images: ReactDOM.findDOMNode(this.refs.n_images).value,
      n_checkin: ReactDOM.findDOMNode(this.refs.n_checkin).value,
      n_collect: ReactDOM.findDOMNode(this.refs.n_collect).value,
    }

    this.props.editAchievement(achievementId, {name, requirements, description, reward})
  }

  render () {
    const { user, achievement, languages } = this.props
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
        n_friends <input type='text' ref='n_friends' /><br/>
        n_reviewlikes <input type='text' ref='n_reviewlikes' /><br/>
        n_imagelikes <input type='text' ref='n_imagelikes' /><br/>
        n_countries_visited <input type='text' ref='n_countries_visited' /><br/>
        n_cities_visited <input type='text' ref='n_cities_visited' /><br/>
        n_max_balance <input type='text' ref='n_max_balance' /><br/>
        n_verifiedshops <input type='text' ref='n_verifiedshops' /><br/>
        n_pendingshops <input type='text' ref='n_pendingshops' /><br/>
        n_reviews <input type='text' ref='n_reviews' /><br/>
        n_images <input type='text' ref='n_images' /><br/>
        n_checkin <input type='text' ref='n_checkin' /><br/>
        n_collect <input type='text' ref='n_collect' /><br/>
        <hr/>

        gold <input type='radio' name='validatedRadio' ref='reward3' value='3'/>
        silver <input type='radio' name='validatedRadio' ref='reward2' value='2'/>
        copper <input type='radio' name='validatedRadio' ref='reward1' value='1'/>

        <button className='btn btn-primary' onClick={this.editAchievement.bind(this)}>save </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  achievement: state.achievement.achievement,
  languages: state.language.languages,
})
export default connect((mapStateToProps), {
  fetchProfile, getAchievement, editAchievement, getLanguages
})(AdminAchievementEditContainer)
