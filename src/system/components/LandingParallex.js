/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Landing from './../../system/components/Landing'
import IOSDownload from './../../system/components/IOSDownload'
import ParallaxComponent from './../../system/components/Parallax'
// import ParallaxComponent from 'react-parallax-component';

type Props = {
  
};

const random = (min, max) => Math.random() * (max - min) + min;

class LandingParallex extends React.Component<void, Props, void> {
  static propTypes = {
    message1: PropTypes.string,
    message2: PropTypes.string,
    src: PropTypes.string,
    ifSearch: PropTypes.bool,
  };

  render () {
    const wrap = {
      height: window.innerHeight * 6,
    };
    // var word = 'awesome react';
    // var images = ['http://images.indianexpress.com/2015/12/iphone-5s-big1.jpg'];
    var components = [{
      name: 'Landing',
      top: '0%',
      speed: 1,
      type: 1,
      bgColor: 'white',
      // src: 'https://i.stack.imgur.com/NOloQ.jpg'
    }, {
      name: 'Landing',
      top: '90%',
      speed: 1,
      bgColor: 'black',
      src: 'http://lushapp.co/static/img/bg/drinks.png'
    }, {
      name: 'Landing',
      top: '190%',
      speed: 1,
      bgColor: '#286F9E',
      src: 'http://lushapp.co/static/img/bg/design.png'
    }, {
      name: 'Landing',
      top: '290%',
      speed: 1,
      bgColor: '#58498F',
      src: 'http://lushapp.co/static/img/bg/logo.png'
    }, {
      name: 'Landing',
      top: '390%',
      speed: 1,
      bgColor: '#962F5C',
      src: 'http://lushapp.co/static/img/bg/ingredients.png'
    }, {
      name: 'Landing',
      top: '490%',
      speed: 1,
      bgColor: '#B03333',
      src: 'http://lushapp.co/static/img/bg/flavor.png'
    }]
    return (<div
      style={wrap}
    >
      {components.reverse().map((d, index) => {
        return <ParallaxComponent
          speed={d.speed}
          top={d.top}
          left={d.left}
          key={index}
        >
        {d.name === 'Landing' && <Landing {...d}/>}
        </ParallaxComponent>
      }
      )}
    </div>)
  }
}

const mapStateToProps = (state) => ({

})
export default connect((mapStateToProps), {

})(LandingParallex)