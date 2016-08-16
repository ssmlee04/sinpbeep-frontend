/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PlacesGooglemap from "../../places/components/PlacesGooglemap";

type Props = {
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PlaceBasicPanel extends React.Component<void, Props, void> {
  static propTypes = {
    place: PropTypes.object,
  };

  render() {
    const {place} = this.props;
    return (
      <div style={{height: "150px"}}>
        <PlacesGooglemap places={[place]}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})
export default connect((mapStateToProps), {

})(PlaceBasicPanel)