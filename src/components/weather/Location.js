import React, { Component } from 'react';

const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "5e63ade308cb1beca653a0e28b9d883a"
  }

class Location extends Component {

    state = {
        geoipCity: "",
    }
    
    componentDidMount(){
        const geoApiUrl = "https://geoip-db.com/json/";
        fetch(geoApiUrl)
        
        .then(res => res.json())
        .then(result => {
        console.log(result)

            this.setState({ geoipCity: result.city }, () => {
                //console.log(this.state);
                const weatherApiUrl = `${api.base}weather?q=${this.state.geoipCity}&weather&units=metric&APPID=${api.key}`;
                fetch(weatherApiUrl)
                
                .then(res => res.json())
                .then(result => {
                    console.log(result)

                    let locationOutput = document.querySelector("#locationOutput");
                    if(result.cod === "404"){
                        locationOutput.innerHTML = `${this.state.geoipCity} is not a valid city name`;
                    }

                    
                    locationOutput.innerHTML = `<p>
                    Your live in ${this.state.geoipCity} and it feels like ${result.main.feels_like}°C
                    </p>`;
                    
                })
                .catch(err => {
                    console.log("Fetch error: " + err);
                });
            });
        })
        .catch(err => {
            console.log("Fetch error: " + err);
        });

        //date
        let dateOutputLocation = document.querySelector('#dateOutputLocation');

        let d = new Date();
        dateOutputLocation.innerHTML = `<p>
        Date: ${d.getDate()} / ${d.getMonth() + 1} / ${d.getFullYear()} <br>
        Time: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}
        </p>`;
    }

  render() {
    return (
        <div className="row">
            <div className="col-12">
                <h1>Your local weather</h1>
                <div id="locationOutput"></div>
                <div id="dateOutputLocation"></div>
            </div>
        </div>
    );
  }
}

export default Location;