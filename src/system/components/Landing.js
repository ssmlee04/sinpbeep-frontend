/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile, login } from '../../users/reducers/user'
import IOSDownload from './../../system/components/IOSDownload'
import SearchAreaRedirect from './../../system/components/SearchAreaRedirect'
import './../../system/styles/Landing.scss'

type Props = {
  
};

const scrollHandler = function() {
  // After scrolling 100px from the top...
  if ($(window).scrollTop() > 100) {
    $('.registerbtn').css('background-color', 'green');
    $('.navbar-initial').css('transition', 'background-color 0.2s ease');
    $('.navbar-initial').css('border-color', '#FAFAF3');
    $('.navbar-initial').css('background-color', '#FDFDFD');
    $('.navbar-initial-text').css('color', 'black');
    $('.usermedal').css('color', 'gray');
  // Otherwise remove inline styles and thereby revert to original stying
  } else {
    $('.registerbtn').css('background-color', 'transparent');
    $('.navbar-initial').css('border-color', 'transparent');
    $('.navbar-initial').css('background-color', 'transparent');
    $('.navbar-initial-text').css('color', 'white');
    $('.usermedal').css('color', 'white');
  }
};

class Landing extends React.Component<void, Props, void> {
  static propTypes = {
    message1: PropTypes.string,
    message2: PropTypes.string,
    src: PropTypes.string,
    ifSearch: PropTypes.bool,
  };

  componentDidMount() {
    $('.navbar-initial').css('background-color', 'transparent');
    $('.registerbtn').css('background-color', 'transparent');
    $('.registerbtn').css('color', 'white');
    $('.navbar-initial').css('border-color', 'transparent');
    $('.usermessage').css('display', 'none');
    $('.navbar-initial-text').css('color', 'white');
    $(window).scroll(scrollHandler);
  }

  componentWillUnmount() {
    $('.registerbtn').css('background-color', 'green');
    $('.registerbtn').css('color', 'white');
    $('.navbar-initial').css('transition', 'background-color 0.2s ease');
    $('.navbar-initial').css('background-color', '#FDFDFD');
    $('.navbar-initial').css('border-color', '#FDFDFD');
    $('.navbar-initial-text').css('color', 'black');
    $('.usermedal').css('color', 'gray');
    $('.usermessage').css('display', 'block');
    $(window).off('scroll', scrollHandler);
  }

  render() {
    const { src, ifSearch } = this.props;
    let {message1, message2} = this.props;
    message1 = 'Singlebeep';
    message2 = 'Find someone who shares a common interest with you';
    let style = {};
    if (src) {
      style.background= `url(${src}) no-repeat center center`;
    }
    style.background= `url(${'//i.stack.imgur.com/bJzDb.jpg'}) no-repeat center center`;
    style.backgroundSize= 'cover';
    // style.marginBottom= -100

    return (
      <div className='intro-header' style={style}>
        <div className='container' style={{height: '770px'}}>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='intro-message'>
                <h1 style={{color: '#f8f8f8', fontFamily: 'Verdana'}}>{message1}</h1>
                <h3 className='quotefont' style={{color: '#f8f8f8'}}>{message2}</h3>
                <hr className='intro-divider'/>
                <IOSDownload />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // user: state.user
})
export default connect((mapStateToProps), {
  // login, fetchProfile
})(Landing)