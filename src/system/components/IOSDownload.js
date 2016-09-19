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
            <div style={{marginTop: 230}}>
              <a href='https://itunes.apple.com/us/app/singlebeep/id1138627485?ls=1&mt=8'>
                <img style={{width: 250, height: 70, marginTop: -350}} className='app_store' src='//assetcdn.500px.org/assets/home/app_store-0c2d78dd77a27471f67ec6371573965d.svg'/>
              </a>
              <a href='https://play.google.com/store/apps/details?id=com.singlebeepandroid'>
                <img style={{width: 250, height: 70, marginTop: -350, marginLeft: 5}} className='app_store' src='//assetcdn.500px.org/assets/home/google_play-3cb329188217feda8498cdbd01c0c130.svg'/>
              </a>
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
