/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile, loginFB } from '../../users/reducers/user'

type Props = {
  user: Object,
  login: Function
};

export class LoginComponentFacebook extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    fetchProfile: PropTypes.func.isRequired,
    loginFB: PropTypes.func.isRequired
  };

  statusChangeCallback(response) {
    var that = this;
    /*eslint-disable */
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === "connected") {
      // Logged into your app and Facebook.
      // this.testAPI();

      var access_token = response.authResponse.accessToken;
      that.props.loginFB({access_token: access_token});

    } else if (response.status === "not_authorized") {

      Promise.resolve().delay(2000).then(function(){
        return that.checkLoginState()
      });
      // The person is logged into Facebook, but not your app.
      // document.getElementById("status").innerHTML = "Please log " +
        // "into this app.";
    } else {
      
      Promise.resolve().delay(2000).then(function(){
        return that.checkLoginState()
      });

      // The person is not logged into Facebook, so we"re not sure if
      // they are logged into this app or not.
      // document.getElementById("status").innerHTML = "Please log " +
      // "into Facebook.";
    }
    /*eslint-enable */
  }

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  componentDidMount() {
    /*eslint-disable */
    window.fbAsyncInit = function() {
      let appId = "1474296272850216" // local
      // if (config.apiRoot.indexOf("clearstreet") > -1) appId = "280842252115639"; // actual server
      if (process.env.NODE_ENV === 'production') appId = "280842252115639"; // actual server
      FB.init({
        appId      : appId, 
        cookie     : true,  // enable cookies to allow the server to access the session
        xfbml      : true,  // parse social plugins on this page
        version    : "v2.1" // use version 2.1
      });

      // Now that we"ve initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ("connected")
      // 2. Logged into Facebook, but not your app ("not_authorized")
      // 3. Not logged into Facebook and can"t tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.
      // FB.getLoginStatus(function(response) {
      //   this.statusChangeCallback(response);
      // }.bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, "script", "facebook-jssdk"));
    /*eslint-enable */
  }

  fbLogin() {
    FB.login(this.checkLoginState());
  }

  render() {
    return (
      <div style={{float: 'left', marginLeft: '5px'}}>
        <div style={{width: '40px', height: '40px'}}>
          <a onClick={this.fbLogin.bind(this)} >
          <img style={{height: '100%', width: '100%', objectFit: 'contain'}} 
            src='https://cdn4.iconfinder.com/data/icons/windev-contacts-2/512/facebook-128.png'/>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect((mapStateToProps), {
  fetchProfile, loginFB
})(LoginComponentFacebook)