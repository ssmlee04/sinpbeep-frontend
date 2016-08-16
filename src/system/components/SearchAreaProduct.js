/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { setProduct } from '../../system/reducers/system'
import { getProducts } from '../../products/reducers/product'

type Props = {
  // user: Object,
};

class SearchAreaProduct extends React.Component<void, Props, void> {
  static propTypes = {
    pid: PropTypes.number,
    setProduct: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
  }

  componentDidMount () { 
    this.props.getProducts()
  }

  onChange (e) {
    let pid = e.target.value
    this.props.setProduct({pid})
  }

  render () {
    const { pid, products } = this.props
    return (
      <select ref='product' value={pid} className='input-sm margin-left-3px' onChange={this.onChange.bind(this)}>
        <option></option>
        {(products || []).map((d) => {
          return <option key={d.id} value={d.id}>{d.name}</option>
        })}
      </select>
    )
  }
}

const mapStateToProps = (state) => ({
  pid: state.system.pid,
  products: state.product.products
})
export default connect((mapStateToProps), {
  setProduct, getProducts
})(SearchAreaProduct)
