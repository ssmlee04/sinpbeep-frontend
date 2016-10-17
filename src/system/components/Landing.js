/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import IOSDownload from './../../system/components/IOSDownload'
import './../../system/styles/Landing.scss'

type Props = {
  
};

class Landing extends React.Component<void, Props, void> {
  static propTypes = {
    message1: PropTypes.string,
    message2: PropTypes.string,
    bgColor: PropTypes.string,
    src: PropTypes.string,
  };

  render() {
    const { src, bgColor, type } = this.props;
    let { message1, message2 } = this.props;
    message1 = 'Singlebeep';
    message2 = 'Find someone who shares a common interest with you';
    let style = {};
    if (src) {
      style.background= `url(${src}) no-repeat center center`;
      style.backgroundAttachment= 'fixed';
      style.backgroundSize= '480px 480px';
    }
    style.backgroundColor = bgColor

    if (type === 1) {
      return (
        <div className='intro-header' style={style}>
          <div className='container' >
            <div className='row'>
              <div className='col-lg-12'>
                <div className='intro-message2'>
                  <img src='https://i.stack.imgur.com/MYvmf.png' style={{height: 200, width: 200}}/>
                  <nav><a style={{fontSize: 20, fontWeight: 'bold'}}>{message1}</a></nav>
                  <nav><a style={{fontSize: 14}}>{message2}</a></nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
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
}

const mapStateToProps = (state) => ({
  // user: state.user
})
export default connect((mapStateToProps), {
  // login, fetchProfile
})(Landing)