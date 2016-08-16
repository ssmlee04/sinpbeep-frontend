/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getUser, editUser, editUserRole, deleteUser } from '../../users/reducers/otheruser'
import { getLanguages } from '../../languages/reducers/language'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminUserEditContainer extends React.Component<void, Props, void> {
  static propTypes = {
    params: PropTypes.object,
    otheruser: PropTypes.object,
    user: PropTypes.object,
    editUser: PropTypes.func.isRequired,
    editUserRole: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  };

  componentDidMount () {
    const otheruserId = `${this.props.params.userId}`
    this.props.fetchProfile()
    this.props.getUser({otheruserId})
  }

  componentDidUpdate () {
    const { otheruser } = this.props
    const { isLoaded } = this.state || {}
    const { user } = this.props

    if (!user.isRootAdmin) {
      window.location.href = '/'
    }

    if (otheruser._id) {
      setTimeout(() => {
        ReactDOM.findDOMNode(this.refs.adminrole).checked = otheruser.roles && otheruser.roles.indexOf('admin') > -1
      }, 1000)
    }
  }

  // editUser(){
  //   const otheruserId = `${this.props.params.otheruserId}`

  //   this.props.editUser(otheruserId)
  // }

  editAdminRole () {
    const otheruserId = `${this.props.params.userId}`
    var hasAdminRole = ReactDOM.findDOMNode(this.refs.adminrole).checked && 1 || 0
    this.props.editUserRole(otheruserId, {role: 'admin', value: hasAdminRole})
  }

  deleteUser () {
    const otheruserId = `${this.props.params.userId}`
    this.props.deleteUser(otheruserId)
  }

  render () {
    const { user, otheruser } = this.props
    if (!user.isRootAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>
        _id: {otheruser._id}<br/>
        name: {otheruser.name}<br/>
        email: {otheruser.email}<br/>
        <input type='checkbox' name='roles' ref='adminrole' value='admin' /> I have a bike, and I am an admin<br/>
        <button onClick={this.editAdminRole.bind(this)}>save roles</button>
        <hr/>
        <button onClick={this.deleteUser.bind(this)}>nuke this guy</button>
        <hr/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  otheruser: state.otheruser.otheruser
})
export default connect((mapStateToProps), {
  fetchProfile, getUser, editUser, editUserRole, deleteUser
})(AdminUserEditContainer)
