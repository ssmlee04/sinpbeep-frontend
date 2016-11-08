import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import IOSDownload from './../../system/components/IOSDownload'
import AndroidDownload from './../../system/components/AndroidDownload'

type Props = {
};

class IOSAndroidDownload extends React.Component<void, Props, void> {
  static propTypes = {
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-offset-3 col-md-3 col-sm-12 col-xs-12'>
          <IOSDownload />
        </div>
        <div className='col-md-3 col-sm-12 col-xs-12' style={{marginTop: 1}}>
          <AndroidDownload />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // user: state.user
})
export default connect((mapStateToProps), {
  // fetchProfile
})(IOSAndroidDownload)
