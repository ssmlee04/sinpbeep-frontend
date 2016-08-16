/* @flow */
import React, { PropTypes } from 'react'
// import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { setIndustry } from '../../system/reducers/system'
import { getIndustries } from '../../industry/reducers/industry'
import { resetPlacesSkip } from '../../places/reducers/places'
// import { fetchProfile, login } from '../../users/reducers/user'
// import DebounceInput from 'react-debounce-input'

type Props = {
  // user: Object,
};

class SearchAreaIndustry extends React.Component<void, Props, void> {
  static propTypes = {
    setIndustry: PropTypes.func.isRequired,
    getIndustries: PropTypes.func.isRequired,
    resetPlacesSkip: PropTypes.func.isRequired,
    ifShow: PropTypes.string, // rank, all, user
    iid: PropTypes.string,
    industries: PropTypes.array.isRequired
  }

  componentDidMount () { 
    this.props.getIndustries()
  }

  onChange (e) {
    let iid = e.target.value
    this.props.setIndustry({iid})
    this.props.resetPlacesSkip()
  }

  render () {
    const { iid, industries } = this.props
    let { ifShow='user' } = this.props

    return (
      <select ref='industry' value={iid} className='input-sm margin-left-3px' onChange={this.onChange.bind(this)} style={{width: '200px'}}>
        <option key={'industry-0'} value={''}></option>

        {(industries || []).map((d1) => {
          let queue = []
          let childqueue = []
          let cond1 = (ifShow === 'all' || d1.if_show && ifShow === 'user' || d1.if_rank && ifShow === 'rank')
          if (d1 && cond1 && !d1.ancestor) {
            queue.push(<option key={'industry-' + d1._id} value={d1._id}>{d1.name}</option>)
            d1.childs.map((d2) => {
              (industries || []).map((d3) => {
                let cond2 = (!ifShow || ifShow === 'all' || d3.if_show && ifShow === 'user' || d3.if_rank && ifShow === 'rank')
                if (d3 && cond2 && d3._id && d2.industry_id.toString() === d3._id.toString()) {
                  let emo = ''
                  if (d3._id === '550519c11ee64e020c568f36') emo = ' 🍜 '
                  else if (d3._id === '546c33d90ffe684d714e5294') emo = ' 🍔 '
                  else if (d3._id === '546c3051d3b78d2d6f9a6065') emo = ' 🍖 '
                  else if (d3._id === '546c33d90ffe684d714e52d3') emo = ' 🍣 '
                  else if (d3._id === '546c3051d3b78d2d6f9a6056') emo = ' 🐟 '
                  else if (d3._id === '546c33d90ffe684d714e536d') emo = ' 🍲 '
                  else if (d3._id === '54939ae9857d111422df162f') emo = ' 🍝 '
                  else if (d3._id === '551d557c5469ae341c8fe41d') emo = ' 🍵 '
                  else if (d3._id === '546c3051d3b78d2d6f9a6055') emo = ' 🍕 '
                  else if (d3._id === '5505266da63d817a07cb573a') emo = ' 🍦 '
                  else if (d3._id === '546c33d90ffe684d714e531c') emo = ' 🍩 '
                  else if (d3._id === '5504f24e6ac63b5e09362e93') emo = ' ☕ '
                  else if (d3._id === '546c2f577e923baa6e263427') emo = ' 🌵 '
                  if (emo) childqueue.push(<option key={'industry-' + d3._id} value={d3._id}>&nbsp;&nbsp;&nbsp;&nbsp;{emo + d3.name}</option>)
                  else childqueue.push(<option key={'industry-' + d3._id} value={d3._id}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{d3.name}</option>)
                }
              })
            })
            return [].concat(queue).concat(childqueue)
          }
        })}
      </select>
    )
  }
}

const mapStateToProps = (state) => ({
  iid: state.system.iid,
  industries: state.industry.industries
})
export default connect((mapStateToProps), {
  setIndustry, getIndustries, resetPlacesSkip
})(SearchAreaIndustry)
