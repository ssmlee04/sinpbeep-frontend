import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

type Props = {
};

class Footer extends React.Component<void, Props, void> {
  static propTypes = {
  }

  render() {
    const imgStyle = {
      width: '50%', 
      marginTop : '20px',
      paddingTop: '30px'
    }

    return (
      <section className='footer quotefont mobilemarginfooter'>
        <div className='row'>
          <div className='col-md-2'>
            <div className='pull-right'><img src='//assetcdn.500px.org/assets/home/logo_footer@2x-551a0439d6a391f7a12848f37a1c269d.png' style={imgStyle}/></div>
          </div>
          <div className='col-md-3'><h4>About</h4><p className='description'>Clearstreet is a community for discovering, sharing and participating in the great businesses in your neighborhood.</p>
          <p className='cute'>You will shape what your neightbood looks like tomorrow, starting today.</p>
          </div>
          <div className='col-md-4'>
          <div className='row'>
          <div className='col-md-4 webonly'><h4><span message='footer.about' /></h4><ul className='links'>
            <li><Link to='/about'>footer.aboutus</Link></li>
            <li><Link to='/terms'>footer.terms</Link></li>
            <li><Link to='/privacy'>footer.privacy</Link></li>
            <li><Link to='/events'>footer.events</Link></li>
            <li><Link to='/coupons'>footer.coupons</Link></li>
          </ul>
          </div>
          <div className='col-md-4'><h4><span message='footer.social' /></h4><ul className='links'>
            <li><a className='facebook' href='https://www.facebook.com/singlebeep?ref=aymt_homepage_panel' target='_blank'>Facebook</a></li>
            <li><a className='twitter' href='https://twitter.com/singlebeepcom' target='_blank'>Twitter</a></li>
            <li><a className='google' href='https://plus.google.com/109028130650294712454/posts' target='_blank'>Google+</a></li>
            <li><a className='youtube' href='http://www.youtube.com' target='_blank'>YouTube</a></li>
          </ul>
          </div>
          <div className='col-md-4'><h4><span message='footer.misc' /></h4><ul className='links'>
            <li><Link to='/contact'>footer.contact</Link></li>
            <li><Link to='/career'>footer.career</Link></li>
            <li><Link to='/auth/login-owner'>footer.owner</Link></li>
            <li><Link to='/auth/register-owner'>footer.register</Link></li>
          </ul>
          </div>
          </div>
          </div>
          <div className='col-md-3'><h4>Downloads</h4>
          <div className='row'>
          <div className='col-md-12'>
            <a >
            <img className='app_store' src='//assetcdn.500px.org/assets/home/app_store-0c2d78dd77a27471f67ec6371573965d.svg'/>
            </a>
          </div>
          <div className='col-md-12'></div>
          <div className='col-md-12'>
            <a >
            <img className='app_store' src='//assetcdn.500px.org/assets/home/google_play-f30aa5752895b7050ee60c2b057c7217.svg' style={{width: '46%'}}/>
            </a>
          </div>
          </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  // user: state.user
})
export default connect((mapStateToProps), {
  // fetchProfile
})(Footer)
