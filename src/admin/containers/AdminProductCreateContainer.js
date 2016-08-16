/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { createProduct } from '../../products/reducers/product'
import { getLanguages } from '../../languages/reducers/language'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminProductCreateContainer extends React.Component<void, Props, void> {
  static propTypes = {
    params: PropTypes.object,
    user: PropTypes.object,
    createProduct: PropTypes.func.isRequired,
    getLanguages: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.fetchProfile()
    // this.props.getLanguages()
  }

  componentDidUpdate () {
    const { user } = this.props
    if (!user.isRootAdmin) {
      window.location.href = '/'
    }
  }

  createProduct () {
    // const { languages } = this.props
    const name = ReactDOM.findDOMNode(this.refs.name).value
    const description = ReactDOM.findDOMNode(this.refs.description).value
    const price = ReactDOM.findDOMNode(this.refs.price).value
    const currency = ReactDOM.findDOMNode(this.refs.currency).value
    const subtract = ReactDOM.findDOMNode(this.refs.subtract).checked

    this.props.createProduct({name, description, price, currency, subtract})
  }

  render () {
    const { user } = this.props
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
        price: <input type='text' ref='price' /><br/>
        currency: <input type='text' ref='currency' /><br/>
        subtract: <input type='checkbox' ref='subtract' /><br/>
       
        <button className='btn btn-primary' onClick={this.createProduct.bind(this)}>save </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  languages: state.language.languages,
})
export default connect((mapStateToProps), {
  fetchProfile, createProduct, getLanguages
})(AdminProductCreateContainer)
