import React, {Component} from 'react';

import '../styles/app.css';

export default class SearchBar extends Component {
  state = {
    city: '',
  };

  /**
     * no need for binding event handlers as we used arrow functions to auto bind to 'this'
     */

  // get the search query and send that data back up
  onHandleChange = () => {
    this.props.onSearchSuccess (this.state.city);
  };

  // change state for every key press
  onChange = e => {
    this.setState ({
      [e.target.name]: e.target.value,
    });
  };

  render () {
    return (
      <form onSubmit={e => e.preventDefault ()}>
        <div className="form-group">
          <label htmlFor="city">City</label>
          {/**controlled component: notice value is changed when the event is hit with every key press */}
          <input
            type="text"
            className="form-control"
            id="city"
            aria-describedby="cityInput"
            onChange={this.onChange}
            name="city"
            value={this.state.city}
          />
          <small id="cityHelp" className="form-text text-muted">
            City search will display weather data.
          </small>
        </div>
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={this.onHandleChange}
        >
          Submit
        </button>
      </form>
    );
  }
}
