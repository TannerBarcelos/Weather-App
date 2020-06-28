import React, {Component, Fragment} from 'react';

import moment from 'moment'; // for nice date/time formatting
import '../styles/temperature.css';

export default class Canvas extends Component {
  constructor (props) {
    super (props);

    this.state = {
      weather: '',
    };
  }

  // state changes for any new search query, so, check against the old props to the new props (new search being passed in) and fethc new data if nexessary
  // this also works for the initial render when props === empty string
  componentDidUpdate (prevProps) {
    if (prevProps.data !== this.props.data) {
      this.gatherData ();
    }
  }

  // make the network request here
  gatherData = async () => {
    // perform the request with the data received from search bar
    const res = await fetch (
      `http://api.openweathermap.org/data/2.5/weather?q=${this.props.data}&appid=${'40bc193cc017bb3e03b54eaf63c7ca11'}`
    );
    const weather = await res.json ();
    this.setState ({
      weather,
    });
    //console.log (this.state);
  };

  /**
   * probably extract all this logic and code to another component
   */

  // render the whole 'canvas' : we need to check against undefined/null state as initially before
  renderData = () => {
    /**
     * Use destructuring to pull out all the relevant data we want for this app
     */
    const {name, weather, coord, main} = this.state.weather;

    let fahrenheitTemperature;
    let descriptionOfWeather;
    let longitude;
    let latitude;
    let time;
    let gauge;

    if (
      weather !== undefined ||
      main !== undefined ||
      coord !== undefined ||
      name !== undefined
    ) {
      longitude = `lon: + ${coord.lon}`;
      latitude = `lat: ${coord.lat}`;
      descriptionOfWeather = weather[0].description;
      gauge = <i className="fas fa-thermometer-half" />;
      fahrenheitTemperature = `${Math.floor (main.temp * 9 / 5 - 459.67)}`;
      time = this.getTimeOfDay ();
    }

    return (
      <div
        style={{backgroundImage: `${this.determineBGImage ()}`}}
        className={'temperature-container'}
      >
        <h1>{name}</h1>
        <h3>{descriptionOfWeather}</h3>
        <div>
          <p>{longitude}</p>
          <p>{latitude}</p>
        </div>
        <h2>
          {gauge} {fahrenheitTemperature}
        </h2>
        <h3>{time}</h3>
      </div>
    );
  };

  // get time of day to determine background image for temperature card
  getTimeOfDay = () => {
    return moment ().format ('h:mm a');
  };

  // determine the range of time for which the background should be dynamic
  determineBGImage = () => {
    const d = new Date ();
    const time = d.getHours ();
    if (time >= 19 || time <= 5) {
      return 'url(https://images.unsplash.com/photo-1427501482951-3da9b725be23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)';
    } else if (time > 5 || time < 19) {
      return 'url(https://images.unsplash.com/photo-1500534623283-312aade485b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)';
    }
  };

  render () {
    return (
      <Fragment>
        {this.renderData ()}
      </Fragment>
    );
  }
}
