/* @flow */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchProfile, addTask, removeTask } from '../../users/reducers/user'
import { fetchHistoryOpenings, updateOpening, createOpening, deleteOpening } from '../../openings/reducers/opening'
import IOSDownload from './../../system/components/IOSDownload'
import './../../system/styles/Landing.scss'
import YouTube from 'react-youtube'

type Props = {

};
const routine1Id = '5818572750e0f6bb08733c3c'
const task1Id = '5818597b50e0f6bb08733c44'
const task2Id = '5818573250e0f6bb08733c3d'
const task3Id = '5818596150e0f6bb08733c43'

class Landing extends React.Component<void, Props, void> {

  constructor(props) {
    super(props);

    this.state = {}
  }

  static propTypes = {
    openings: PropTypes.object,
    user: PropTypes.object,
    type: PropTypes.number,
    message1: PropTypes.string,
    message2: PropTypes.string,
    bgColor: PropTypes.string,
    src: PropTypes.string,
    addTask: PropTypes.func.isRequired,
    updateOpening: PropTypes.func.isRequired,
    createOpening: PropTypes.func.isRequired,
    deleteOpening: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    fetchHistoryOpenings: PropTypes.func.isRequired,
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

  componentDidMount () {
    this.props.fetchHistoryOpenings()
  }

  deleteOpening(e) {
    var children = $(e.currentTarget).parent().parent().children()
    var id = children[0].children[0].value
    // var type = children[1].children[0].value
    // var quota = children[2].children[0].value
    // var quota_open_date = children[3].children[0].value
    // var quota_fill_date = children[4].children[0].value

    this.props.deleteOpening(id)
  }

  saveOpening(e) {
    var children = $(e.currentTarget).parent().parent().children()
    var id = children[0].children[0].value
    var type = children[1].children[0].value
    var quota = children[2].children[0].value
    var quota_open_date = children[3].children[0].value
    var quota_fill_date = children[4].children[0].value

    var info = {quota, type, quota_open_date}
    if (quota_fill_date) {
      info.quota_fill_date = quota_fill_date
    }
    this.props.updateOpening(id, info)
  }

  addOpening(e) {
    var children = $(e.currentTarget).parent().parent().children()
    var id = children[0].children[0].value
    var type = children[1].children[0].value
    var quota = children[2].children[0].value
    var quota_open_date = children[3].children[0].value
    var quota_fill_date = children[4].children[0].value

    var info = {quota, type, quota_open_date}
    if (quota_fill_date) {
      info.quota_fill_date = quota_fill_date
    }
    this.props.createOpening(info)
  }

  render() {
    const { src, bgColor, type, user, openings=[] } = this.props;
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
                  <div className='flag-bg' style={{display: 'inline-block', height: '260', width: '400'}}>
                  </div>
                  <div style={{display: 'inline-block', height: '260', width: '400'}}>
                    <YouTube
                      videoId={'9_L_0ln53PM'}                  // defaults -> null
                      // id={string}                       // defaults -> null
                      // className={string}                // defaults -> null
                      opts={{
                        height: '100%',
                        width: '100%',
                        playerVars: {
                          autoplay: 1
                        }
                      }}                        // defaults -> {}
                      // onReady={func}                    // defaults -> noop
                      // onPlay={func}                     // defaults -> noop
                      // onPause={func}                    // defaults -> noop
                      // onEnd={func}                      // defaults -> noop
                      // onError={func}                    // defaults -> noop
                      // onStateChange={func}              // defaults -> noop
                      // onPlaybackRateChange={func}       // defaults -> noop
                      // onPlaybackQualityChange={func}    // defaults -> noop
                    />
                  </div>
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

                  <h3>EE Historical openings: </h3><br/>

                  <table className='table table-striped'>
                    <thead>
                    <tr>
                      <td></td>
                      <td></td>
                      <td><b>EE Quota</b></td>
                      <td><b>Opening date</b></td>
                      <td><b>Approximate time for all openings filled</b></td>
                    </tr>
                    </thead>
                    <tbody>
                    {openings.filter((d) => {
                      return d.type === 1
                    }).map((d, i) => {
                      if ((user.roles || []).indexOf('admin') === -1) {
                        return <tr key={i}>
                          <td><span className='hide'>{d._id}</span></td>
                          <td><span className='hide'>{d.type}</span></td>
                          <td>{d.quota}</td>
                          <td>{d.quota_open_date && d.quota_open_date.slice(0, d.quota_open_date.indexOf('T')) || ''}</td>
                          <td>{d.fillminutes && (d.fillminutes + ' minutes') || ''}</td>
                        </tr>
                      } else {
                        return <tr key={i}>
                          <td><input className='hide' defaultValue={d._id} /></td>
                          <td><input className='hide' defaultValue={d.type} value={1}/></td>
                          <td><input defaultValue={d.quota} /></td>
                          <td><input defaultValue={d.quota_open_date || ''} /></td>
                          <td><input defaultValue={d.quota_fill_date || ''} /></td>
                          <td>{d.fillminutes && (d.fillminutes + ' minutes') || ''}</td>
                          <td><button onClick={this.saveOpening.bind(this)}>save</button></td>
                          <td><button onClick={this.deleteOpening.bind(this)}>x</button></td>
                        </tr>
                      }
                    })}

                    {(user && user.roles || []).indexOf('admin') > -1 &&
                      <tr>
                        <td><input className='hide' /></td>
                        <td><input className='hide' value={1}/></td>
                        <td><input /></td>
                        <td><input /></td>
                        <td><input /></td>
                        <td></td>
                        <td><button onClick={this.addOpening.bind(this)}>add</button></td>
                      </tr>
                    }

                    </tbody>
                  </table>

                  <h3>OID Historical openings: </h3><br/>

                  <table className='table table-striped'>
                    <thead>
                    <tr>
                      <td></td>
                      <td></td>
                      <td><b>OID Quota</b></td>
                      <td><b>Opening date</b></td>
                      <td><b>Approximate time for all openings filled</b></td>
                    </tr>
                    </thead>
                    <tbody>
                    {openings.filter((d) => {
                      return d.type === 2
                    }).map((d, i) => {
                      if ((user.roles || []).indexOf('admin') === -1) {
                        return <tr key={i}>
                          <td><span className='hide'>{d._id}</span></td>
                          <td><span className='hide'>{d.type}</span></td>
                          <td>{d.quota}</td>
                          <td>{d.quota_open_date && d.quota_open_date.slice(0, d.quota_open_date.indexOf('T')) || ''}</td>
                          <td>{d.fillminutes && (d.fillminutes + ' minutes') || ''}</td>
                        </tr>
                      } else {
                        return <tr key={i}>
                          <td><input className='hide' defaultValue={d._id} /></td>
                          <td><input className='hide' defaultValue={d.type} value={2}/></td>
                          <td><input defaultValue={d.quota} /></td>
                          <td><input defaultValue={d.quota_open_date || ''} /></td>
                          <td><input defaultValue={d.quota_fill_date || ''} /></td>
                          <td>{d.fillminutes && (d.fillminutes + ' minutes') || ''}</td>
                          <td><button onClick={this.saveOpening.bind(this)}>save</button></td>
                          <td><button onClick={this.deleteOpening.bind(this)}>x</button></td>
                        </tr>
                      }
                    })}

                    {(user && user.roles || []).indexOf('admin') > -1 &&
                      <tr>
                        <td><input className='hide' /></td>
                        <td><input className='hide' value={2}/></td>
                        <td><input /></td>
                        <td><input /></td>
                        <td><input /></td>
                        <td></td>
                        <td><button onClick={this.addOpening.bind(this)}>add</button></td>
                      </tr>
                    }

                    </tbody>
                  </table>
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
  user: state.user,
  openings: state.openings.openings
})
export default connect((mapStateToProps), {
  fetchProfile, addTask, removeTask, fetchHistoryOpenings, updateOpening, createOpening, deleteOpening
})(Landing)