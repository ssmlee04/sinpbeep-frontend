import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import NavbarDropdown from './../../system/components/NavbarDropdown'
import NavbarMoney from './../../system/components/NavbarMoney'

type Props = {
  user: Object,
  fetchProfile: Function,
};

class Navbar extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    fetchProfile: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchProfile()
  }

  render () {
    const { user={} } = this.props

    return (
      <div>
        <nav className='navbar navbar-initial navbar-fixed-top topnav' role='navigation' style={{ height: '40px', minHeight: '40px' }}>
          <div className='container topnav'>
            <div className='navbar-header row' style={{ width: '100%' }}>
              <div className='col-md-3'>
                <Link className='navbar-brand topnav quotefont' to='/' style={{ marginTop: '-5px' }}>
                  Singlebeep
                </Link>
                {user.isAdmin && <Link className='navbar-brand topnav quotefont' to='/zadmin' style={{ marginTop: '-5px' }}>
                  Panel
                </Link>}
                {user.isOwner && <Link className='navbar-brand topnav quotefont' to='/console' style={{ marginTop: '-5px' }}>
                  Owner
                </Link>}
              </div>
              <div className='col-md-9'>
                <table className='pull-right' style={{ float: 'right' }}>
                  <tbody>
                    <tr>
                      <td>
                        <div className=''>
                        </div>
                      </td>
                      <td>
                        <div className=''>
                        </div>
                      </td>
                      <td>
                        <div className=''>
                          <NavbarMoney />
                        </div>
                      </td>
                      <td>
                        <div className=''>
                          <NavbarDropdown />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect((mapStateToProps), {
  fetchProfile
})(Navbar)
