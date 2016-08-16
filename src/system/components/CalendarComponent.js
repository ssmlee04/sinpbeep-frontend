import React, { PropTypes, Component } from 'react'
// import { register } from '../../users/actions/UserActionCreators'

import { connect } from 'react-redux'
// import ReactDOM from 'react-dom'
import Calendar from 'rc-calendar'
import DatePicker from 'rc-calendar/lib/Picker'
import DateTimeFormat from 'gregorian-calendar-format'
// import GregorianCalendar from 'gregorian-calendar'
import CalendarLocale from 'rc-calendar/lib/locale/en_US'
import './../styles/Calendar.scss'
// import { FormattedMessage }  from '../../utils/IntlComponents'

const CalendarLocale2 = Object.assign({}, CalendarLocale, {
  monthFormat: 'MMMM',
});

const calendar = (<Calendar locale={CalendarLocale2}
  style={{zIndex: 1000}}
  dateInputPlaceholder='Enter date'
  // disabledTime={state.showTime ? disabledTime : null}
  // timePicker={state.showTime ? timePickerElement : null}
  // defaultValue={this.props.defaultCalendarValue}
  showOk
  showDateInput={true}
  disabledDate={false}
/>);

const dateFormatter = new DateTimeFormat('yyyy-MM-dd');
const formatter = new DateTimeFormat('yyyy-MM-dd HH:mm:ss');

function getFormatter(showTime) {
  return showTime ? formatter : dateFormatter;
}

export class CalendarComponent extends React.Component<void, Props, void> {
  onChange(value) {
    this.setState({value});
  }

  componentDidMount() {
    // const placeholder = ReactDOM.findDOMNode(this.refs.placeholder).value;
    // const placeholder = this.refs.placeholder
    // this.setState({placeholder: placeholder.state.message});
  }

  render() {
    var value = this.state && this.state.value; 
    var placeholder = this.state && this.state.placeholder; 
    var datestring = value && (value.getYear() + '-' + (value.getMonth()+1) + '-' + value.getDayOfMonth())
    return (
        <div value={datestring}>
        <div className='hide'>
          global.choosebirthday
        </div>
        <DatePicker
          animation='slide-up'
          calendar={calendar}
          
          onChange={this.onChange.bind(this)}>
          {
            ({value}) => {
              return (
                <span>
                <input placeholder={'Enter a date'} style={{width: 250}} type='text'
                  className='form-control inline' name='birthdate' 
                  value={value && getFormatter(false).format(value)}/>
                </span>
              );
            }
          }
        </DatePicker>
        </div>
        );
  }
}

const mapStateToProps = (state) => ({
  // user: state.user
})
export default connect((mapStateToProps), {
  // fetchProfile, register
})(CalendarComponent)
