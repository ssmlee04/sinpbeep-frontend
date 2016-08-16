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
      <div className='col-md-offset-3'>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        thank you. please verify your email..
        <br/>
        <br/>
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
