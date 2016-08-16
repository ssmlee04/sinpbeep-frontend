/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { resetPlacesSkip } from '../../places/reducers/places'
import { setZone } from '../../system/reducers/system'
import { getZones } from '../../zones/reducers/zone'

type Props = {
  // user: Object,
};

class SearchAreaZone extends React.Component<void, Props, void> {
  static propTypes = {
    setZone: PropTypes.func.isRequired,
    getZones: PropTypes.func.isRequired,
    resetPlacesSkip: PropTypes.func.isRequired,
    zones: PropTypes.array,
    zid: PropTypes.string,
    sid: PropTypes.string,
    cid: PropTypes.string,
  }

  componentDidMount () { 
    this.props.getZones();
  }

  onChange(e) {
    let ids = '[' + e.target.value + ']';
    ids = JSON.parse(ids)
    const zid = ids[0];
    const sid = ids[1];
    const cid = -1;
    this.props.setZone({zid, sid, cid})
    this.props.resetPlacesSkip()
  }

  render() {
    const { zones, zid, sid, cid } = this.props;
    const zoneStr = [zid || 0, sid || 0, cid || 0].toString();

    return (
      <select ref='zone' value={zoneStr} className='input-sm margin-left-3px' required onChange={this.onChange.bind(this)} style={{width: '200px'}}>
        <option key={[-1,-1,-1].toString()} value={[-1,-1,-1].toString()}></option>
        {zones.map(function(d1) {
          let queue = [];
          queue.push(<option key={[d1.zid, -1, -1].toString()} value={[d1.zid, -1, -1].toString()}>{d1.zn}</option>);
          d1.childs.map(function(d2) {
            queue.push(<option key={[d1.zid, d2.sid, -1].toString()} value={[d1.zid, d2.sid, -1].toString()}>&nbsp;&nbsp;&nbsp;&nbsp;{d2.sn}</option>);
          });
          return queue;
        })}
      </select>
    );
  }
}

const mapStateToProps = (state) => ({
  zid: state.system.zid,
  sid: state.system.sid,
  cid: state.system.cid,
  zones: state.zone.zones,
})
export default connect((mapStateToProps), {
  setZone, getZones, resetPlacesSkip
})(SearchAreaZone)
