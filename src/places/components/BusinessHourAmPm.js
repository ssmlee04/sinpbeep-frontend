/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from "moment"

type Props = {
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class BusinessHourAmPm extends React.Component<void, Props, void> {
  static propTypes = {
    hour: PropTypes.string,
  };

  render() {
    const {hour} = this.props
    let smallhour = hour
    let nextday
    let partialhour = hour % 1
    let mins = ("00" + parseInt(partialhour * 60 / 5, 10) * 5).slice(-2)

    if (hour > 24) {
      smallhour %= 24;
      nextday = <span> next day </span>
    }
    return (
      <div className='inline'>
        {nextday}{~~(smallhour - partialhour)}:{mins} 
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

})
export default connect((mapStateToProps), {

})(BusinessHourAmPm)
