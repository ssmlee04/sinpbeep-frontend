import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

type Props = {
};

class IOSDownload extends React.Component<void, Props, void> {
  static propTypes = {
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-offset-3 col-md-3 col-sm-12 col-xs-12'>
          <a href='https://itunes.apple.com/us/app/singlebeep/id1138627485?ls=1&mt=8'>
            <img style={{width: 250, height: 70}} className='app_store' src='//assetcdn.500px.org/assets/home/app_store-0c2d78dd77a27471f67ec6371573965d.svg'/>
          </a>
        </div>
        <div className='col-md-3 col-sm-12 col-xs-12' style={{marginTop: 1}}>
          <a href='https://play.google.com/store/apps/details?id=com.singlebeepandroid'>
            <img style={{width: 250, height: 70}} className='app_store' src='//assetcdn.500px.org/assets/home/google_play-3cb329188217feda8498cdbd01c0c130.svg'/>
          </a>
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
})(IOSDownload)
