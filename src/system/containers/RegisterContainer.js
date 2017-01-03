/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { register, fetchProfile } from '../../users/reducers/user'
import ReactDOM from 'react-dom'
// import CalendarComponent from './../../system/components/CalendarComponent'

type Props = {
  user: Object,
  register: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class RegisterContainer extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    register: PropTypes.func.isRequired
  };

  handleKeyup (e) {
    if (e.keyCode === 13) {
      this.localRegister.apply(this)
    }
  }

  localRegister () {
    const name = ReactDOM.findDOMNode(this.refs.name).value
    const sex1 = ReactDOM.findDOMNode(this.refs.sex1).checked
    const sex2 = ReactDOM.findDOMNode(this.refs.sex2).checked
    // const birthdate = ReactDOM.findDOMNode(this.refs.birthdate).value
    const email = ReactDOM.findDOMNode(this.refs.email).value
    const password = ReactDOM.findDOMNode(this.refs.password).value
    const confirmPassword = ReactDOM.findDOMNode(this.refs.confirmPassword).value
    const info = {
      name, email, password, confirmPassword,
      sex : sex1 && 1 || sex2 && 2
    }
    this.props.register(info)
  }

  render () {
    return (
      <div className='quotefont'> 
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className='container-fluid'>
          <div className='signin form-horizontal'>

            <div className='form-group'>
              <label className='col-md-3 control-label'></label>
              <div className='col-md-5'>
                <b>Register an account</b>
              </div>
            </div>
            <div className='form-group'>
              <label className='col-md-4 control-label'>
                E-mail
              </label>
              <div className='col-md-5'>
                <input onKeyUp={this.handleKeyup.bind(this)} id='email' type='email' ref='email' name='email' placeholder='email' className='form-control' />
              </div>
            </div>
            <div className='form-group'>
              <label className='col-md-4 control-label'>
                Name
              </label>
              <div className='col-md-5'>
                <input onKeyUp={this.handleKeyup.bind(this)} id='name' type='text' ref='name' name='name' placeholder='name' className='form-control' />
              </div>
            </div>
            <div className='form-group'>
              <label className='col-md-4 control-label'>
                Gender
              </label>
              <div className='col-md-5'> 
                <input type='radio' name='sex' ref='sex1' className='radio-inline' value='0'/> <span>&nbsp;
                  Male
                &nbsp;&nbsp;</span>
                <input type='radio' name='sex' ref='sex2' className='radio-inline' value='1'/> <span>&nbsp;
                  Female
                </span>
              </div>
            </div>
            <div className='form-group'>
              <div className='col-md-10 col-md-offset-1'>
                <hr/>
              </div>
            </div>
            <div className='form-group'>
              <label className='col-md-4 control-label'>
                Password
              </label>
              <div className='col-md-5'>
                <input onKeyUp={this.handleKeyup.bind(this)} id='password' type='password' name='password' ref='password' placeholder='password' className='form-control' />
              </div>
            </div>
            <div className='form-group'>
              <label className='col-md-4 control-label'>
                Confirm Password
              </label>
              <div className='col-md-5'>
                <input onKeyUp={this.handleKeyup.bind(this)} id='confirmPassword' type='password' name='confirmPassword' ref='confirmPassword' placeholder='password' className='form-control' />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-md-offset-4 col-md-5'>
                <button onClick={this.localRegister.bind(this)} className='btn btn-primary'>
                  Signup
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect((mapStateToProps), {
  fetchProfile, register
})(RegisterContainer)
