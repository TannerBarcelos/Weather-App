import React, {Component} from 'react';

// component imports
import SearchBar from './SearchBar';
import Canvas from './Canvas';

import env from 'dotenv';
env.config ();

/**
 * API KEY
 * process.env.REACT_APP_API_KEY
 */

class App extends Component {
  state = {
    searchQuery: '',
  };

  onSearchSuccess = searchQuery => {
    this.setState ({
      searchQuery,
    });
  };

  render () {
    return (
      <div className="container" style={{marginTop: '3em'}}>
        <SearchBar onSearchSuccess={this.onSearchSuccess} />
        <Canvas data={this.state.searchQuery} />
      </div>
    );
  }
}

export default App;
