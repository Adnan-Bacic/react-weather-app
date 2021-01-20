import React, { Component, Fragment } from 'react';

const api = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: "5e63ade308cb1beca653a0e28b9d883a"
}

class Search extends Component {

  state = {
      cityName: "",
      feedback: ""
  }


  inputOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  formOnSubmit = (e) => {
    e.preventDefault();

    if(this.state.cityName.length > 0){
        this.searchCity(this.state.cityName);
        this.setState({ feedback: `Results for ${this.state.cityName}` });
        this.setState({ cityName: "" });
    } else {
        this.setState({ feedback: `Please enter a city name` })
        //this.searchOutput.innerHTML = "";
    }
  }

  searchCity = (cityName) => {
    const weatherApiUrl = `${api.base}weather?q=${this.state.cityName}&units=metric&APPID=${api.key}`
    fetch(weatherApiUrl)
      .then(res => res.json())
      .then(result => {
        //console.log(cityName)
        console.log(result)

        let searchOutput = document.querySelector("#searchOutput");
        if(result.cod === "404"){
          searchOutput.innerHTML = `<p>${cityName} is not a valid city name</p>`;
        }
        
        searchOutput.innerHTML = `<p>
        Your searched for ${result.name}, located in ${result.sys.country} <br>
        ${result.name} feels like ${result.main.feels_like}°C
        </p>`;
      })
      .catch(err => {
        console.log("Fetch error: " + err);
      });
      
      //date
      let dateOutputSearch = document.querySelector('#dateOutputSearch');

      let d = new Date();
      dateOutputSearch.innerHTML = `<p>
      Date: ${d.getDate()} / ${d.getMonth() + 1} / ${d.getFullYear()} <br>
      Time: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}
      </p>`;
  }

  render() {
    return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <h1>Search</h1>
            <form onSubmit={this.formOnSubmit}>
                <div className="form-group">
                    <label htmlFor="city">Search for cityname</label>
                    <input onChange={this.inputOnChange} value={this.state.cityName} name="cityName" type="text" className="form-control"></input>
                    <p className="text-info">{this.state.feedback}</p>
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div id="searchOutput"></div>
          <div id="dateOutputSearch"></div>
        </div>
      </div>
      </Fragment>
    );
  }
}

export default Search;