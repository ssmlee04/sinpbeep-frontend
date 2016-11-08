import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

type Props = {
};

class AndroidDownload extends React.Component<void, Props, void> {
  static propTypes = {
  }

  render() {
    return (
      <a href='https://play.google.com/store/apps/details?id=com.singlebeepandroid'>
        <img style={{width: 180, height: 50}} className='app_store' src='//assetcdn.500px.org/assets/home/google_play-3cb329188217feda8498cdbd01c0c130.svg'/>
      </a>
    )
  }
}

const mapStateToProps = (state) => ({
  // user: state.user
})
export default connect((mapStateToProps), {
  // fetchProfile
})(AndroidDownload)
