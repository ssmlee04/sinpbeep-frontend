/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

type Props = {
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlaceBusinessHour extends React.Component<void, Props, void> {
  static propTypes = {
  };

  display(vote) {
    this.setState({ifDisplay: vote})
  }

  render() {
    let { hours } = this.props;
    const { ifDisplay } = this.state || {};
    hours = hours || {};
    const whichDay = moment().format("ddd").toLowerCase();
    const thishour = moment().format("HH");

    const displayHour = function(hrs) {
      return (hrs || []).map(function(d, i) { 
        if (i===hrs.length - 1) {
          return (
            <div className="inline" key={i+"uselessbusinesshourstring"}><AmPm hour={d.start}/> ~ <AmPm hour={d.end}/></div>
          );
        } else {
          return (
            <div className="inline" key={i+"uselessbusinesshourstring"}><AmPm hour={d.start}/> ~ <AmPm hour={d.end}/>, </div>
          )
        }
      })
    }

    const totalDisplay = function(){
      return (<div className="h6 quotefont inline" >
        {(hours.mon || []).length>0 && <div className="inline"><br/><FormattedMessage message="global.monday" /></div>} {displayHour(hours.mon)} 
        {(hours.tue || []).length>0 && <div className="inline"><br/><FormattedMessage message="global.tuesday" /></div>} {displayHour(hours.tue)}
        {(hours.wed || []).length>0 && <div className="inline"><br/><FormattedMessage message="global.wednesday" /></div>} {displayHour(hours.wed)}
        {(hours.thu || []).length>0 && <div className="inline"><br/><FormattedMessage message="global.thursday" /></div>} {displayHour(hours.thu)}
        {(hours.fri || []).length>0 && <div className="inline"><br/><FormattedMessage message="global.friday" /></div>} {displayHour(hours.fri)}
        {(hours.sat || []).length>0 && <div className="inline"><br/><FormattedMessage message="global.saturday" /></div>} {displayHour(hours.sat)}
        {(hours.sun || []).length>0 && <div className="inline"><br/><FormattedMessage message="global.sunday" /></div>} {displayHour(hours.sun)}
      </div>);
    }

    let OpenClose;
    if (hours[whichDay] && hours[whichDay][0]) {
      if (hours[whichDay][0].start>=0 && hours[whichDay][0].end>=0) {
        if ((hours[whichDay][0] && hours[whichDay][0].start < thishour && thishour < hours[whichDay][0].end) || 
            (hours[whichDay][1] && hours[whichDay][1].start < thishour && thishour < hours[whichDay][1].end)){
          OpenClose = <div className="inline quotefont h6"><h6 className="inline green"><b>opens today </b></h6>
          {displayHour(hours[whichDay])}
          </div>
        } else {
          OpenClose = <div className="inline"><h6 className="inline crimson"><b>closed </b></h6>
          </div>
        }
      } 
    } else if (hours.mon || hours.tue ||hours.wed ||hours.thu ||hours.fri ||hours.sat ||hours.sun) {
      OpenClose = <div className="inline"><h6 className="inline crimson"><b>closed today </b></h6></div>
    } else {
      // OpenClose = <div className="inline"><h6 className="inline crimson"><b>closed today </b></h6></div>
    }

    return (
      <div className="quotefont">   
        {OpenClose}
        {OpenClose && <h6 className="quotefont gray inline pointer" onClick={this.display.bind(this, !ifDisplay)}>(...details)</h6>}
        {ifDisplay && totalDisplay()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})
export default connect((mapStateToProps), {
})(PlaceBusinessHour)