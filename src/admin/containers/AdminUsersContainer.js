/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getUsers } from '../../users/reducers/otheruser'
import ReactDOM from 'react-dom'
// import UserListCell from '../../admin/components/UserListCell'

type Props = {
  user: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminUsersContainer extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    otherusers: PropTypes.array,
    getUsers: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.fetchProfile()
  }

  componentDidUpdate () {
    const { user } = this.props
    if (!user.isAdmin) {
      window.location.href = '/'
    }
  }

  getUsers () {
    const role = ReactDOM.findDOMNode(this.refs.role).value
    const skip = ReactDOM.findDOMNode(this.refs.skip).value
    const email = ReactDOM.findDOMNode(this.refs.email).value
    this.props.getUsers({role, skip, email})
  }

  render () {
    const { user, otherusers=[] } = this.props
    if (!user.isAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>
        status: <select ref='role'>
          <option value=''></option>
          <option value='user'>user</option>
          <option value='admin'>admin</option>
          <option value='owner'>owner</option>
          <option value='blogger'>blogger</option>
        </select><br/>

        skip: <input type='text' ref='skip'/>
        email: <input type='text' ref='email'/>

        <button onClick={this.getUsers.bind(this)}>search</button>

        {otherusers.map((d, i) => {
          return (<div>
            _id: {d._id} <br/>
            email: {d.email} <br/>
            roles: {(d.roles || []).join(' ')} <br/>
            <Link to={`/zadmin/users/${d._id}`}>{d.name}</Link> 
          </div>)
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  otherusers: state.otheruser.otherusers,
  user: state.user,
})
export default connect((mapStateToProps), {
  fetchProfile, getUsers
})(AdminUsersContainer)
