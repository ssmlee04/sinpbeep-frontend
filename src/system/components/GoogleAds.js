import React, { Component, PropTypes } from 'react'

type Props = {
  place: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class GoogleAds extends React.Component<void, Props, void> {

  static propTypes = {
  }

  componentDidMount() {
    if (window.adsbygoogle) {
      (adsbygoogle = window.adsbygoogle || []).push({})
    }
  }

  render() {
    return (
      <div className='row'>
      <div className='col-md-offset-1 col-md-10'>
      <ins className='adsbygoogle'
        style={{display:'inline-block', width:'300px', height:'200px'}}
        data-ad-client='ca-pub-2816260844707006'
        data-ad-slot='5942363979'></ins>
      </div>
      </div>
    )
  }
}

export default GoogleAds
