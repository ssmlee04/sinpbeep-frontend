import React, { PropTypes } from 'react';

type Props = {
  place: Object,
};

/*
This component renders SVG instead of the classic HTML elements.
 */
export default class ImageNotFound extends React.Component<void, Props, void> {
  static propTypes = {
    width: PropTypes.object,
    height: PropTypes.object,
  }

  render() {
    let {width, height} = this.props;
    width = width || 80;
    height = height || 80;
    return (
      <img src='//0.s3.envato.com/files/65864710/May2013_032.jpg' style={{'objectFit': 'contain', height: '100%', width: '100%'}}/>
    );
  }
}
