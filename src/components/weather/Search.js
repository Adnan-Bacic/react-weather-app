import React, { useState } from 'react';
import Spinner from '../spinner/Spinner'

const Search = () => {
  const [cityName, setCityName] = useState('')
  const [cityInfo, setCityInfo] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const searchCity = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if(cityName === ''){
        setCityInfo(null)
        throw new Error('You didnt search for a city')
      }
      const weatherApiUrl = `${process.env.REACT_APP_API_BASE}weather?q=${cityName}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`

      const res = await fetch(weatherApiUrl)

      if(!res.ok){
        setCityInfo(null)
        throw new Error(`Could not find city named ${cityName}`)
      }

      const data = await res.json()

      setCityInfo(data)
      setError(null)
    } catch (err) {
      setError(err)
    }
    setIsLoading(false)
  }

    return (
    <>
<div className="container mt-5">
<div className="row">
        <div className="col-12">
          <h1>Search2</h1>
            <form onSubmit={searchCity}>
                <div className="form-group">
                    <label htmlFor="city">Search for cityname</label>
                    <input onChange={(text) => {
                      setCityName(text.target.value)
                      }} value={cityName} name="cityName" type="text" className="form-control"></input>
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
        </div>
      
        {cityInfo && (
          <>
          <div className="col-12">
          <p>
                        {`${cityInfo.name} - ${cityInfo.sys.country}`}
                    </p>
                    <p>
                        {`The temperatrure feels like ${cityInfo.main.feels_like}°C and is ${cityInfo.main.temp}°C`}
                    </p>
                    <p>
                    {`Wind is ${cityInfo.wind.speed} m/s`}
                    </p>
          </div>
          </>
        )}
        {isLoading && (
<>
<div className="col-12">
                <Spinner></Spinner>
                </div>
                </>
        )}
                    {error && (
                <>
                <div className="col-12">
                    <p className="text-danger font-weight-bold">
                        {`${error.name}: ${error.message}`}
                    </p>
                </div>
                </>
            )}
        </div>
</div>
      </>
    );
}

export default Search;