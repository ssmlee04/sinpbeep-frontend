/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile, addTask, removeTask } from '../../users/reducers/user'
import IOSDownload from './../../system/components/IOSDownload'
import './../../system/styles/Landing.scss'

type Props = {
  
};
const routine1Id = '5818572750e0f6bb08733c3c'
const task1Id = '5818597b50e0f6bb08733c44'
const task2Id = '5818573250e0f6bb08733c3d'
const task3Id = '5818596150e0f6bb08733c43'

class Landing extends React.Component<void, Props, void> {
  static propTypes = {
    user: PropTypes.object,
    type: PropTypes.number,
    message1: PropTypes.string,
    message2: PropTypes.string,
    bgColor: PropTypes.string,
    src: PropTypes.string,
    addTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
  };

  toggleTask1() {
    const { user } = this.props
    const userTasks = user.tasks || []
    if (userTasks.indexOf(task1Id) === -1) {
      this.props.addTask(routine1Id, task1Id)
    } else {
      this.props.removeTask(routine1Id, task1Id)
    }
  }

  toggleTask2() {
    const { user } = this.props
    const userTasks = user.tasks || []
    if (userTasks.indexOf(task2Id) === -1) {
      this.props.addTask(routine1Id, task2Id)
    } else {
      this.props.removeTask(routine1Id, task2Id)
    }
  }

  toggleTask3() {
    const { user } = this.props
    const userTasks = user.tasks || []
    if (userTasks.indexOf(task3Id) === -1) {
      this.props.addTask(routine1Id, task3Id)
    } else {
      this.props.removeTask(routine1Id, task3Id)
    }
  }

  render() {
    const { src, bgColor, type, user } = this.props;
    const userTasks = user.tasks || []
    let { message1, message2 } = this.props;
    message1 = 'i-SINP';
    message2 = 'Find someone who shares a common interest with you';
    let style = {};
    if (src) {
      style.background= `url(${src}) no-repeat center center`;
      style.backgroundAttachment= 'fixed';
      style.backgroundSize= '480px 480px';
    }
    style.backgroundColor = bgColor

    if (type === 1) {
      return (
        <div className='intro-header' style={style}>
          <div className='container' >
            <div className='row'>
              <div className='col-lg-12'>
                <div className='intro-message2'>
                  <img src='http://0.tqn.com/d/canadaonline/1/S/g/Q/national-flag-canada-lge2.jpg' style={{height: 140, width: 200}}/>
                  <div style={{height: 50}} />
                  <nav><b style={{fontSize: 36, fontWeight: 'bold'}}>{message1}</b></nav>
                  <nav><a style={{color: 'crimson'}}>Select the category you would like to receive an E-mail notification. <br/> The notification will be sent to you 5 times once the category is open. </a></nav>
                  <div style={{height: 20}} />
                  <div>
                  <nav><input type='checkbox'
                    checked={userTasks.indexOf(task1Id) > -1}
                    onChange={this.toggleTask1.bind(this)} /><a onClick={this.toggleTask1.bind(this)}> Employment Offer &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </a></nav>
                  <nav><input type='checkbox'
                    checked={userTasks.indexOf(task2Id) > -1}
                    onChange={this.toggleTask2.bind(this)} /><a onClick={this.toggleTask2.bind(this)}> Saskatchewan Express Entry </a></nav>
                  <nav><input type='checkbox'
                    checked={userTasks.indexOf(task3Id) > -1}
                    onChange={this.toggleTask3.bind(this)} /><a onClick={this.toggleTask3.bind(this)}> Occupations In-Demand &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </a></nav>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='intro-header' style={style}>
          <div className='container' style={{height: '770px'}}>
            <div className='row'>
              <div style={{margin: '15% 0% 0 55%'}}>
                <div className='intro-message'>
                  <nav><b style={{fontSize: 40, color: 'white'}} className='shadow'>{message1}</b></nav>
                  <nav><b style={{fontSize: 22, color: 'white'}} className='shadow'>{message2}</b></nav>
                  {type === 2 && <div style={{marginTop: 20}}><IOSDownload /></div> || null}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})
export default connect((mapStateToProps), {
  fetchProfile, addTask, removeTask
})(Landing)