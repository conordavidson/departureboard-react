import React, { Component } from 'react';

class Train extends Component {
  render() {
    return (
      <tr>
        <td className='time'>{this.props.time}</td>
        <td className='destination'>{this.props.destination}</td>
        <td className='trip'>{this.props.trip}</td>
        <td className='track'>{this.props.track}</td>
        <td className='status'>{this.props.status}</td>
      </tr>
    );
  }
}

export default Train;
