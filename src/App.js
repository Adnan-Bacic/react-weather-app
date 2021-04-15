import React from 'react';
import './App.css';
import Search from './components/weather/Search';
import Location from './components/weather/Location';

const App = () => {
  
    return (
      <>
        <Location></Location>
        <Search></Search>
        </>
    );
  
}

export default App;