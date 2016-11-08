import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logout, fetchProfile } from '../../users/reducers/user'
import './../styles/NavbarDropdown.scss'

type Props = {
  fetchProfile: Function,
  logout: Function,
};

class NavbarDropdown extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    fetchProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }

  render () {
    const { user } = this.props
    let LoginArea
    const registerbtnStyle = {
      'marginTop': '11px',
      'backgroundColor': 'green',
      'borderWidth': '0px'
    }
    const loginbtnStyle = {
      'marginTop': '11px',
      'backgroundColor': 'transparent',
      'borderWidth': '0px',
      'color': 'black'
    }

    if (!user || !user.name) {
      LoginArea = (
        <ul className='nav navbar-nav navbar-right inline' style={{ marginTop: '-5px' }}>
          <li>
            <div>
              <Link to='/auth/login'>
                <button className='loginbtn btn btn-primary btn-sm navbar-initial-text' style={loginbtnStyle} >
                  <span>navbar.login</span>
                </button>
              </Link>
            </div>
          </li>
          <li>
            <div>
              <Link to='/auth/register'>
                <button className='registerbtn btn btn-primary btn-sm' style={registerbtnStyle}>
                  <span>navbar.register</span>
                </button>
              </Link>
            </div>
          </li>
        </ul>
      )
    } else {
      LoginArea = (
        <ul className='navbar-nav nav navbar-right' style={{display: 'inline', marginTop: '-5px'}}>
          <li className='dropdown mobileshiftup'>
            <a className='dropdown-toggle' data-toggle='dropdown'>
              {user.name} <b className='caret'></b>
            </a>
            <ul className='dropdown-menu pull-right'>
              <li>
                <Link to='/editinfo'>
                  <span>navbar.editinfo</span>
                </Link>
              </li>
              <li>
                <Link to='/editpassword'>
                  <span>navbar.editpassword</span>
                </Link>
              </li>
              <li>
                <a onClick={this.props.logout}>
                  <span>navbar.logout</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      )
    }
    return (
      <div>
        {LoginArea}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect((mapStateToProps), {
  fetchProfile, logout
})(NavbarDropdown)
