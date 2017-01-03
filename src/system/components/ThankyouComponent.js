import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

type Props = {
};

class ThankyouComponent extends React.Component<void, Props, void> {
  static propTypes = {
  };

  render () {
    return (
      <div style={{textAlign: 'center'}} className='quotesfont'>
        <br/>
        <br/>
        <br/>
        <br/>
        <h3>Thank you for your registration. <br/>Please check your inbox and verify your email..</h3>
        <br/>
        <img src={'https://cbi-blog.s3.amazonaws.com/blog/wp-content/uploads/2015/03/Canada-Flag-City-View-cropped.png'} />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // user: state.user
})
export default connect((mapStateToProps), {
  // fetchProfile
})(ThankyouComponent)
