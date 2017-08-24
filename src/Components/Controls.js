import React, { Component } from 'react';
import moment from 'moment';

class Controls extends Component {

  constructor(props){
    super(props);
    this.state = {
      day: null,
      date: null,
      time: null
    };
    this.setTimes = this.setTimes.bind(this);
  }

  componentDidMount(){
    this.setTimes();
  }

  setTimes(){
    this.setState({
      day: moment().format("dddd"),
      date: moment().format("M-DD-YYYY"),
      time: moment().format("h:mm a")
    });
    setTimeout(this.setTimes, 3000);
  }

  render() {
    return (
        <tr>
          <td className="heading">
            <div id="day">{this.state.day}</div>
            <div id="date">{this.state.date}</div>
          </td>
          <td id='station-toggle'>
            <div id="north" onClick={() => this.props.toggleStation("North Station")} className={this.props.selectedStation === 'North Station' ? 'selected' : '' }>North Station</div>
            <div id="south" onClick={() => this.props.toggleStation("South Station")} className={this.props.selectedStation === 'South Station' ? 'selected' : '' }>South Station</div>
          </td>
          <td className="heading">
            <div>Current Time</div>
            <div id="time">{this.state.time}</div>
          </td>
        </tr>
    );
  }
}

export default Controls;
