import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { pushPopupMessage } from '../../system/reducers/popup'

// import { readMessage } from '../../system/actions/GlobalActionCreators';

var ReactToastr = require('react-toastr')
var {ToastContainer} = ReactToastr
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation)

type Props = {
  user: Object,
  pushPopupMessage: Function,
};

class Popups extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    popups: PropTypes.array,
    pushPopupMessage: PropTypes.func.isRequired
  };

  addAlert ({message, type}) {
    // if (!d.messages || !d.messages.length) {
    //   return;
    // }
    // const lastmessage = d.messages[d.messages.length - 1];
    // const { message, read, timeout, ifIntl, messageId, ifPersistent } = lastmessage;
    // let { type } = lastmessage;
    // const that = this

    let options = {
      timeOut: 3000,
      // timeOut: timeout || 3000,
      extendedTimeOut: 3000
      // extendedTimeOut: timeout || 3000
    };
    // if (ifPersistent) {
    //   options.handleOnClick = function(){
    //     // that.context.executeAction(readMessage, {messageId})
    //   }
    //   type = 'info'
    // }
    if (['success', 'error', 'info', 'wanring'].indexOf(type) === -1) {
      return
    }

    this.refs.container[type](
      message,
      type, options
    )
  }

  // componentDidMount () {
  //   const that = this
  //   // let { messages } = [{type: "error", messsage: "123"}, {type: "error", messsage: "2342"}]
  //   // setTimeout(function(){
  //     that.addAlert({message: "123", type: "success"})
  //     // that.context.getStore('MessageStore').addChangeListener(that.addAlert.bind(that));
  //   // }, 500)
  // }

  componentDidUpdate() {
    const { popups } = this.props
    if (popups && popups.length) this.addAlert(popups[0])
  }

  render () {
    const { popups } = this.props

    return (
      <div className='quotefont'>
        <ToastContainer ref='container'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-left' />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  popups: state.popup.popups
})
export default connect((mapStateToProps), {
  pushPopupMessage
})(Popups)
