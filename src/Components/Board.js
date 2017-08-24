import React, { Component } from 'react';
import Controls from './Controls';
import Train from './Train';
import axios from 'axios';
import moment from 'moment';

class Board extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedStation: "North Station",
      trains: null,
    };
    this.getTrains = this.getTrains.bind(this);
  }


  componentDidMount(){
    this.getTrains();
    this.interval = setInterval(() => this.getTrains(), 10000);
  }


  getTrains(){
    axios.get('https://depart-server.herokuapp.com')
    .then(response => {

      let filteredTrains = response.data.filter(train => train.Origin === this.state.selectedStation);

      this.setState({ trains: filteredTrains.map(train => ({
          time: moment.unix(parseInt(train.ScheduledTime, 10)).format("h:mm a"),
          destination: this.formatDestination(train.Destination),
          trip: train.Trip,
          track: this.formatTrack(train.Track),
          status: train.Status
          })
        )
      })

    })
    .catch(error => {
      console.log(error);
    })
    .then(() => {
      console.log("fetched...")
    });
  }


  formatDestination(destination){
    if(destination){
      return destination
    }else{
      return "N/A"
    }
  }

  formatTrack(track){
    if(track){
      return track;
    }else{
      return "TBD";
    }
  }


  toggleStation(clickedStation){
    if (clickedStation !== this.state.selectedStation){
      this.setState({selectedStation: this.state.selectedStation === "North Station" ? "South Station" : "North Station"})
      this.getTrains();
    }
  }


  render() {
    let trainComponents = null;

    if(this.state.trains != null){
        trainComponents = this.state.trains.map((train) => {
            return ( <Train
                         key={train.trip}
                         time={train.time}
                         destination={train.destination}
                         trip={train.trip}
                         track={train.track}
                         status={train.status}
                     /> );
      })
    }

    return (
      <div id="departure-board">
        <table id="controls">
          <thead>
              <Controls selectedStation={this.state.selectedStation} toggleStation={this.toggleStation.bind(this)}/>
          </thead>
        </table>
        <table id="departures">
          <thead>
            <tr>
              <th>Time</th>
              <th>Destination</th>
              <th>Train#</th>
              <th>Track#</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="schedule">
            {trainComponents}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
