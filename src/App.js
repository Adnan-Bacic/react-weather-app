import React from 'react';
import './App.css';
import Search from './components/weather/Search';
import Location from './components/weather/Location';
import Footer from './includes/Footer'

const App = () => {
    return (
      <>
        <Location></Location>
        <Search></Search>
        <Footer></Footer>
        </>
    );
}

export default App;