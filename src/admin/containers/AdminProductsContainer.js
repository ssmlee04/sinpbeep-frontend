/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile } from '../../users/reducers/user'
import { getProducts } from '../../products/reducers/product'
import ReactDOM from 'react-dom'

type Props = {
  user: Object,
  // entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class AdminProductsContainer extends React.Component<void, Props, void> {
  static propTypes = {
    products: PropTypes.array,
    user: PropTypes.object,
    getProducts: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.fetchProfile()
    this.props.getProducts()
  }

  componentDidUpdate () {
    setTimeout(() => {
      const { user } = this.props
      if (!user.isRootAdmin) {
        window.location.href = '/'
      }
    }, 1000)
  }

  render () {
    const { user, products } = this.props
    if (!user.isAdmin) {
      return (
        <div>
          I wonder how did you get in here....
        </div>
      )
    }

    return (
      <div className='site'>
        {products.map((d, i) => {
          return <div>
            <Link to={`/zadmin/products/${d.id}`}>{d.name}</Link> 
          </div>
        })}
        <hr/>
        <Link to={`/zadmin/products/create`}>create an product</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  products: state.product.products,
})
export default connect((mapStateToProps), {
  fetchProfile, getProducts
})(AdminProductsContainer)
