/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login, fetchProfile } from '../../users/reducers/user'
import { getMyEntityAddUserRequests, confirmEntityAdduserRequest } from '../../entities/reducers/entityadduser'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class OwnerEntityAddUserRequestContainer extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    entityadduserrequests: PropTypes.array,
    getMyEntityAddUserRequests: PropTypes.func.isRequired,
    confirmEntityAdduserRequest: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired,
  }

  confirmEntityAdduserRequest (entityId) {
    this.props.confirmEntityAdduserRequest(entityId)
  }

  componentDidMount () {
    this.props.getMyEntityAddUserRequests()
  }

  render () {
    const { user, entityadduserrequests = [] } = this.props
    console.log({entityadduserrequests})
    return (
      <div className='quotefont site'>
        {entityadduserrequests.map((d) => {
          return <div>
            <button onClick={this.confirmEntityAdduserRequest.bind(this, d.entity_id)}>accept this entity</button>
          </div>
        })}
      </div>  
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  entityadduserrequests: state.entityadduser.entityadduserrequests
})
export default connect((mapStateToProps), {
  fetchProfile, getMyEntityAddUserRequests, confirmEntityAdduserRequest
})(OwnerEntityAddUserRequestContainer)
