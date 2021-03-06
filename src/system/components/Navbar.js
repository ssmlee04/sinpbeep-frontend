import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './../../system/styles/Navbar.scss'
import { fetchProfile, logout, login } from '../../users/reducers/user'
// import NavbarDropdown from './../../system/components/NavbarDropdown'
// import NavbarMoney from './../../system/components/NavbarMoney'

type Props = {
  user: Object,
  logout: Function,
  fetchProfile: Function,
};

class Navbar extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchProfile()
  }

  render () {
    const { user={} } = this.props

    return (
      <nav style={{position: 'fixed', top: 0, zIndex: 1}}>
        <a href="/">Home</a>
        {user && user._id && <a onClick={this.props.logout}>Logout</a> ||
        <div style={{display: 'inline'}}>
          <Link to='/auth/login'>Login</Link>
          <Link to='/auth/register'>Register</Link>
        </div>}
        <a href="https://www.facebook.com/singlebeepyay/?fref=ts"><img src='https://i.stack.imgur.com/9WuKm.png' style={{width: 20, height: 20, marginTop: -8}}/></a>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect((mapStateToProps), {
  fetchProfile, logout, login
})(Navbar)
