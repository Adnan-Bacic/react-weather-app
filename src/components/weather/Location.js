import React, { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner'

const Location = () => {
    const [geoip, setGeoip] = useState(null)
    const [weatherInfo, setWeatherInfo] = useState(null)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const getGeoipCity = async () => {
            try {
                const url = 'https://geoip-db.com/json/'
                const resGeo = await fetch(url)

                if(!resGeo.ok){
                    throw new Error('Could not get your location')
                }

                const dataGeo = await resGeo.json()

                    setGeoip(dataGeo)

                    const weatherApiUrl = `${process.env.REACT_APP_API_BASE}weather?q=${dataGeo.city}&weather&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;

                    const resWeather = await fetch(weatherApiUrl)

                    if(!resWeather.ok){
                        throw new Error('Could not get weather information')
                    }
    
                    const dataresWeather = await resWeather.json()

                    setWeatherInfo(dataresWeather)
                    setError(null)

                
            } catch (err) {
                setError(err)
            }
        }

        getGeoipCity()
    }, [])

    return (
        <>
        <div className="container mt-5">
        <div className="row">
            <div className="col-12">
                <h1>Your local weather</h1>
            </div>
            {geoip && weatherInfo ? (
                <>
                <div className="col-12">
                    <p>
                        {`${geoip.city} - ${geoip.country_name}(${geoip.country_code})`}
                    </p>
                    <p>
                        {`The temperatrure feels like ${weatherInfo.main.feels_like}°C and is ${weatherInfo.main.temp}°C`}
                    </p>
                    <p>
                    {`Wind is ${weatherInfo.wind.speed} m/s`}
                    </p>
                </div>
                </>
            ) : (
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

export default Location;