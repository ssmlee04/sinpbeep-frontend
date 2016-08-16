/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login, fetchProfile } from '../../users/reducers/user'
import { getMyEntity } from '../../entities/reducers/entity'
import { createEvent, prepareCreateEvent, checkoutPreprocessCreateEvent, checkoutButNoPreprocessCreateEvent } from '../../events/reducers/event'
import ReactDOM from 'react-dom'
import CalendarComponent from './../../system/components/CalendarComponent'
import SearchAreaProduct from './../../system/components/SearchAreaProduct'
import { setProduct, getProducts } from '../../products/reducers/product'

type Props = {
  user: Object,
  entity: Object,
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class OwnerEventsCreateContainer extends React.Component<void, Props, void> {
  static propTypes = {
    prepareEventId: PropTypes.number,
    prepareDepositId: PropTypes.number,
    pid: PropTypes.number,
    params: PropTypes.object,
    user: PropTypes.object,
    entity: PropTypes.object,
    getMyEntity: PropTypes.func.isRequired,
    editMyEntityGroup: PropTypes.func.isRequired,
    // removeMyEntityGroupShop: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    checkoutPreprocessCreateEvent: PropTypes.func.isRequired,
    checkoutButNoPreprocessCreateEvent: PropTypes.func.isRequired,
    prepareCreateEvent: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
  };

  componentDidUpdate () {

  }

  componentDidMount () {
    const groupId = `${this.props.params.groupId}`
    // this.props.fetchEntityGroup({groupId})
    this.props.getMyEntity()
  }

  editGroup(groupId){
    const name = ReactDOM.findDOMNode(this.refs.name).value
    this.props.editMyEntityGroup({name, groupId})
  }

  prepareCreateEvent(){
    const name = ReactDOM.findDOMNode(this.refs.name).value
    const requirements = ReactDOM.findDOMNode(this.refs.requirements).value
    const description = ReactDOM.findDOMNode(this.refs.description).value
    const start = ReactDOM.findDOMNode(this.refs.start).value
    const end = ReactDOM.findDOMNode(this.refs.end).value
    const unit = ReactDOM.findDOMNode(this.refs.unit).value
    const product_id = ReactDOM.findDOMNode(this.refs.product_id).value
    const entitygroup_id = ReactDOM.findDOMNode(this.refs.entitygroup_id).value
    const price = ReactDOM.findDOMNode(this.refs.price).value
    const currency = ReactDOM.findDOMNode(this.refs.currency).value
    const provider = ReactDOM.findDOMNode(this.refs.provider).value

    this.props.prepareCreateEvent({name, description, requirements, unit, start, end, product_id, entitygroup_id, price, currency, provider})
  }

  checkoutCreateEvent(prepareEventId){
    const provider = ReactDOM.findDOMNode(this.refs.provider).value
    console.log(provider)
    console.log(provider)
    console.log(provider)
    if (provider === 'pay2go') {
      this.props.checkoutPreprocessCreateEvent(prepareEventId)
    } else if (provider === 'stripe') {
      this.props.checkoutButNoPreprocessCreateEvent(prepareEventId)
    }  else {
      console.log('something is wrong....')
    }
  }

  createEvent(){
    const name = ReactDOM.findDOMNode(this.refs.name).value
    const requirements = ReactDOM.findDOMNode(this.refs.requirements).value
    const description = ReactDOM.findDOMNode(this.refs.description).value
    const start = ReactDOM.findDOMNode(this.refs.start).value
    const end = ReactDOM.findDOMNode(this.refs.end).value
    const unit = ReactDOM.findDOMNode(this.refs.unit).value
    const product_id = ReactDOM.findDOMNode(this.refs.product_id).value
    const entitygroup_id = ReactDOM.findDOMNode(this.refs.entitygroup_id).value
    const price = ReactDOM.findDOMNode(this.refs.price).value
    const currency = ReactDOM.findDOMNode(this.refs.currency).value

    this.props.createEvent({name, description, requirements, unit, start, end, product_id, entitygroup_id, price, currency})
  }

  render () {
    const { user = {shops: []}, entity = {}, products=[], prepareEventId, prepareDepositId, pid } = this.props
    const { groups = [] } = entity
    const product = products.filter((d) => {
      return d.id && pid && d.id.toString() === pid.toString()
    })[0] || {}
    const productCurrency = product.currency
    return (
      <div className='quotefont' style={{marginTop: '58px'}}>
        <br/>
        entitygroup {user.entitygroup} <br/>
        prepareEventId : {prepareEventId} <br/>
        prepareDepositId : {prepareDepositId} <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        name: <input type='text' ref='name'/> <br/>
        description: <input type='text' ref='description'/> <br/>
        requirements: <input type='text' ref='requirements'/> <br/>
        currency: {productCurrency}

        <select className='hide' ref='currency' value={productCurrency}>
          <option value='twd'>TWD</option>
          <option value='usd'>USD</option>
        </select> <br/>

        price: <input type='text' ref='price'/> <br/>
        start: <CalendarComponent ref='start' /><br/>
        end: <CalendarComponent ref='end' /><br/>
        
        unit: <select ref='unit'>
          <option value='3'>3</option>
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
        </select> <br/>

        which way to pay: <select ref='provider'>
          <option value='pay2go'>pay2go</option>
          <option value='stripe'>stripe</option>
        </select>

        product_id: <SearchAreaProduct ref='product_id'/><br/>
        <input type='text' className='hide' ref='entitygroup_id' value={user.entitygroup}/> <br/>

        <button onClick={this.createEvent.bind(this)}>create event with money</button>
        <button onClick={this.prepareCreateEvent.bind(this)}>prepare event and deposit </button>
        {prepareDepositId && <a href={`/payments/${prepareDepositId}`} target='_blank'>go to payment page...</a>}

        {prepareEventId && <button onClick={this.checkoutCreateEvent.bind(this, prepareEventId)}>check deposit and create by pay2go</button>}
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  entity: state.entity.entity,
  pid: state.system.pid,
  prepareEventId: state.event.prepareEventId,
  prepareDepositId: state.event.prepareDepositId,
  products: state.product.products
})
export default connect((mapStateToProps), {
  fetchProfile, 
  getMyEntity, 
  createEvent, 
  prepareCreateEvent, 
  checkoutPreprocessCreateEvent, 
  checkoutButNoPreprocessCreateEvent,
  getProducts, 
  setProduct
})(OwnerEventsCreateContainer)
