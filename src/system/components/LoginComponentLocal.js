/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile, login } from '../../users/reducers/user'

type Props = {
  user: Object,
  login: Function
};

export class LoginComponentLocal extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    fetchProfile: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
  };

  localLogin () {
    const email = ReactDOM.findDOMNode(this.refs.email).value
    const password = ReactDOM.findDOMNode(this.refs.password).value
    const info = {
      email: email,
      password: password
    }
    this.props.login(info)
  }

  handleKeyup (e) {
    if (e.keyCode === 13) {
      this.localLogin()
    }
  }

  render () {
    return (
      <div className='container-fluid'>
        <div className='signin form-horizontal'>
          <div className='form-group'>
            <label className='col-md-4 control-label'>
              <span>login.email</span>
            </label>
            <div className='col-md-6'>
              <input onKeyUp={this.handleKeyup.bind(this)} required ref='email' id='email' type='email' name='email' placeholder='Email' className='form-control'/>
            </div>
          </div>
          <div className='form-group'>
            <label className='col-md-4 control-label'>
              <span>login.password</span>
            </label>
            <div className='col-md-6'>
              <input onKeyUp={this.handleKeyup.bind(this)} required ref='password' id='password' type='password' name='password' placeholder='Password' className='form-control'/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-offset-4 col-md-8'>
              <button onClick={this.localLogin.bind(this)} className='btn btn-success btn-sm'>
                <span>login.login</span>
              </button>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-offset-4 col-md-8'>
              <a className='inline'><h6 className='inline'>
                <span>login.forgotpassword</span>
              </h6></a> &nbsp; | &nbsp;&nbsp;
              <a className='inline' href='/auth/register'><h6 className='inline'>
                <span>login.register</span>
              </h6></a> 
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect((mapStateToProps), {
  login, fetchProfile
})(LoginComponentLocal);
