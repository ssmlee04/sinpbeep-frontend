/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getProduct, editProduct } from '../../products/reducers/product'
import { getLanguages } from '../../languages/reducers/language'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminProductEditContainer extends React.Component<void, Props, void> {
  static propTypes = {
    languages: PropTypes.array,
    product: PropTypes.object,
    params: PropTypes.object,
    user: PropTypes.object,
    editProduct: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    getLanguages: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  };

  componentDidMount () {
    const productId = `${this.props.params.productId}`
    this.props.fetchProfile()
    this.props.getProduct({productId})
    // this.props.getLanguages()
  }

  componentDidUpdate () {
    const { user, languages, product } = this.props
    if (!user.isRootAdmin) {
      window.location.href = '/'
    }

    const { isLoaded, isLoadedLanguage } = this.state || {}
    if (product.id) {
      ReactDOM.findDOMNode(this.refs.name).value = product.name || ''
      ReactDOM.findDOMNode(this.refs.description).value = product.description || ''
      // ReactDOM.findDOMNode(this.refs.price).value = product.price || ''
      // ReactDOM.findDOMNode(this.refs.currency).value = product.currency || ''
    }
  }

  editProduct(){
    const { languages } = this.props
    const productId = `${this.props.params.productId}`
    const name = ReactDOM.findDOMNode(this.refs.name).value
    const description = ReactDOM.findDOMNode(this.refs.description).value
    // const price = ReactDOM.findDOMNode(this.refs.price).value
    // const currency = ReactDOM.findDOMNode(this.refs.currency).value

    this.props.editProduct(productId, {name, description})
  }

  render () {
    const { user, product={}, languages } = this.props
    const { price, currency, subtract } = product
    if (!user.isRootAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>
        name: <input type='text' ref='name' /><br/>
        description: <input type='text' ref='description' /><br/>
        leaseprice: {price} <br/> (this is the price owner pose as deposit upfront per coupon)
        currency: {currency} <br/>
        subtract: {subtract && 'true' || 'false'} <br/>
        <hr/>

        <button className='btn btn-primary' onClick={this.editProduct.bind(this)}>save </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  product: state.product.product,
  languages: state.language.languages,
})
export default connect((mapStateToProps), {
  fetchProfile, getProduct, editProduct, getLanguages
})(AdminProductEditContainer)
