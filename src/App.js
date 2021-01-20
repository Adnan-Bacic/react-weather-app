import React, { Component } from 'react';
import Search from './components/weather/Search';
import Location from './components/weather/Location';

class App extends Component {
  
  render() {
    return (
      <div className="container mt-5">
        <Location></Location>
        <hr></hr>
        <Search></Search>
      </div>
    );
  }
}

export default App;