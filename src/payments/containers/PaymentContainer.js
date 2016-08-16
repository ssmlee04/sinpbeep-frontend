/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login, fetchProfile } from '../../users/reducers/user'
import { getPayment, submitStripePayment } from '../../payments/reducers/payment'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PaymentContainer extends React.Component<void, Props, void> {
  static propTypes = {
    params: PropTypes.object,
    user: PropTypes.object,
    payment: PropTypes.object,
    // verifyPayment: PropTypes.func.isRequired,
    submitStripePayment: PropTypes.func.isRequired,
    getPayment: PropTypes.func.isRequired,
  }

  componentDidUpdate () {
    const { payment = {} } = this.props
    console.log(payment)
    ReactDOM.findDOMNode(this.refs.email).value = payment.email || '' 
    // ReactDOM.findDOMNode(this.refs.itemdesc).value = payment.itemdesc || ''
  }

  componentDidMount () {
    const paymentId = `${this.props.params.paymentId}`
    const { user = {}, payment = {} } = this.props
    // ReactDOM.findDOMNode(this.refs.email).value = payment.email
    // ReactDOM.findDOMNode(this.refs.itemdesc).value = payment.itemdesc
    this.props.getPayment({paymentId})
  }

  // verifyPayment(){
  //   const paymentId = `${this.props.params.paymentId}`
  //   this.props.verifyPayment({paymentId})
  // }

  processStripe () {
    const paymentId = `${this.props.params.paymentId}`
    const number = ReactDOM.findDOMNode(this.refs.credit).value
    const cvc = ReactDOM.findDOMNode(this.refs.cvc).value
    const exp_month = ReactDOM.findDOMNode(this.refs.month).value
    const exp_year = ReactDOM.findDOMNode(this.refs.year).value
    console.log({
      number: number,
      cvc: cvc,
      exp_month: exp_month,
      exp_year: exp_year
    })
    Stripe.setPublishableKey('pk_test_06N95Wo70ezRkpZsCHwkXD9h');
    Stripe.card.createToken({
      number: number,
      cvc: cvc,
      exp_month: exp_month,
      exp_year: exp_year
    }, (status, d) => {
      if (status !== 200) {
        console.log(status)
        return
      }
      this.props.submitStripePayment({token: d.id, paymentId})
    });
  }

  render () {
    const { user = {shops: []}, payment = {pay2go: {}, paypal: {}, wechat: {}, alipay: {}, stripe: {}} } = this.props
    console.log(payment)
    console.log({payment})

    return (
      <div className='quotefont site' >
        <form target="_blank" action='https://capi.pay2go.com/MPG/mpg_gateway' method="POST">
          Amt: {payment.amount} <input type='text' className='hide' name='Amt' value={payment.amount}/><br/>
          email: <input type='text' ref='email' name='Email' /><br/>
          itemdesc {payment.itemdesc} <input type='text' className='hide' ref='itemdesc' name='ItemDesc' value={payment.itemdesc}/><br/>

          {payment.pay2go && <div>
            <input type='text' className='hide' name='CheckValue' value={payment.pay2go.checkValue}/>
            <input type='text' className='hide' name='MerchantID' value={payment.pay2go.merchantID}/>
            <input type='text' className='hide' name='TimeStamp' value={payment.pay2go.ts}/>
            <input type='text' className='hide' name='MerchantOrderNo' value={payment.pay2go.orderno}/>
            TradeLimit <input type='text' name='TradeLimit' value={600}/>
            <input type='text' className='hide' name='Version' value='1.2'/>
            <input type='text' className='hide' name='RespondType' value='JSON'/>
            <input type='text' className='hide' name='LoginType' value='0'/>
            <input type='text' className='hide' name='WEBATM' value='0'/>
            {(payment.status === 1 || payment.status === 0) && <input type='submit' value='submit' />}
          </div>}
        </form>
          
          {payment.stripe && <div>
            credit card: <input name='credit' ref='credit' value={'4242424242424242'}/><br/>
            month: <input name='month' ref='month' value={'12'}/><br/>
            year: <input name='year' ref='year' value={'17'}/><br/>
            cvc: <input name='cvc' ref='cvc' value={'123'}/><br/>
            {(payment.status === 1 || payment.status === 0) && <button onClick={this.processStripe.bind(this)}>fill out your credit card and pay the proceeds</button>}
          </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  payment: state.payment.payment
})
export default connect((mapStateToProps), {
  fetchProfile, getPayment, submitStripePayment
})(PaymentContainer)
