/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getIndustries } from '../../industry/reducers/industry'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminIndustriesContainer extends React.Component<void, Props, void> {
  static propTypes = {
    industries: PropTypes.array,
    user: PropTypes.object,
    getIndustries: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchProfile()
    this.props.getIndustries()
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
    const { user, industries } = this.props
    if (!user.isAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>
        {industries.map((d, i) => {
          return <div>
            <Link to={`/zadmin/industries/${d._id}`}>{d.name}</Link> 
          </div>
        })}
        <Link to={`/zadmin/industries/create`}>create an industry</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  industries: state.industry.industries,
})
export default connect((mapStateToProps), {
  fetchProfile, getIndustries
})(AdminIndustriesContainer)
